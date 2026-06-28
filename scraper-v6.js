// EmoodziK Scraper v6 — parse markdown-style content từ Wix
// Wix trả về nội dung dạng markdown khi fetch với Accept: text/plain
const https = require('https')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston"]

const catMap = {
  'ch%C3%A9m-gi%C3%B3': 'category-quen-quen', 'chém-gió': 'category-quen-quen',
  'nghe-ng%C3%B3ng': 'category-la-la', 'nghe-ngóng': 'category-la-la',
  'ngh%E1%BB%8Dch-ngu': 'category-an-bum', 'nghịch-ngu': 'category-an-bum',
  '%C4%83n-view': 'category-an-view', 'ăn-view': 'category-an-view',
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

// Extract Wix image URL — get the base media URL
function getWixImageUrl(url) {
  // Clean up to get full res: replace small fill params with larger ones
  const base = url.split('/fill/')[0]
  return base + '/fill/w_1200,h_675,al_c,q_85/'  + url.split('/').pop().split('~')[0] + '~mv2.' + (url.includes('.jpg') || url.includes('.jpeg') ? 'jpg' : url.includes('.png') ? 'png' : 'jpg')
}

function fetchPage(slug) {
  return new Promise((resolve) => {
    const url = `https://www.emoodzik.com/post/${slug}`
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
        'Accept-Encoding': 'identity',
        'Cache-Control': 'no-cache',
      }
    }, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve({ slug, html: data, status: res.statusCode }))
    })
    req.on('error', () => resolve({ slug, html: '', status: 0 }))
    req.setTimeout(30000, () => { req.destroy(); resolve({ slug, html: '', status: 408 }) })
  })
}

const skipLines = [
  'Music Blog', 'Nghệ Sĩ', 'Bọn Này', 'TẤT TẦN TẬT', 'QUEN QUEN', 'LẠ LẠ',
  'ĂN BUM', 'ĂN VIEW', 'Facebook', 'Instagram', 'Pinterest', 'Log In',
  'Every Thursday', 'top of page', 'bottom of page', 'Recent Posts', 'See All',
  'Use tab', 'wixstatic.com/media/57e354_4b', // banner image
  'gallerySizeType', 'pgMeasures', 'getElementById', 'pro-gallery',
]

function parseMarkdownToBlocks(markdown, slug) {
  const lines = markdown.split('\n')
  const blocks = []
  let key = 0

  // Find content start (after "min read") and end (before "Recent Posts")
  let startIdx = lines.findIndex(l => l.includes('min read'))
  let endIdx = lines.findIndex(l => l.includes('Recent Posts'))
  if (startIdx < 0) startIdx = 0
  if (endIdx < 0) endIdx = lines.length

  const contentLines = lines.slice(startIdx + 1, endIdx)

  for (let i = 0; i < contentLines.length; i++) {
    const raw = contentLines[i].trim()
    if (!raw) continue
    if (skipLines.some(s => raw.includes(s))) continue

    // Image: ![alt](url)
    const imgMatch = raw.match(/^!\[([^\]]*)\]\((https:\/\/[^)]+)\)$/)
    if (imgMatch) {
      const imgUrl = imgMatch[2]
      // Skip nav/banner images
      if (imgUrl.includes('4b037027') || imgUrl.includes('e316f544') || imgUrl.includes('8d689333') || imgUrl.includes('83804c07')) continue
      // Skip tiny blur placeholder images
      if (imgUrl.includes('blur_2') || imgUrl.includes('w_39,') || imgUrl.includes('w_49,') || imgUrl.includes('w_147,')) continue

      // Get clean image URL
      const cleanUrl = imgUrl.split('/v1/')[0] + '~mv2.' + (imgUrl.includes('.png') ? 'png' : 'jpg')
      blocks.push({
        _type: 'image', _key: `img${key++}`,
        asset: { _type: 'reference', url: cleanUrl },
        caption: imgMatch[1] || '',
      })
      continue
    }

    // YouTube embed: look for youtube links
    const ytMatch = raw.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (ytMatch) {
      blocks.push({
        _type: 'youtube', _key: `yt${key++}`,
        url: `https://www.youtube.com/watch?v=${ytMatch[1]}`
      })
      continue
    }

    // Heading h2: ## text
    const h2Match = raw.match(/^#{2}\s+(.+)$/)
    if (h2Match) {
      const text = h2Match[1].replace(/\*\*/g,'').trim()
      if (text.length > 2 && !skipLines.some(s => text.includes(s))) {
        blocks.push({
          _type: 'block', _key: `h${key++}`, style: 'h2', markDefs: [],
          children: [{ _type: 'span', _key: `s${key++}`, text, marks: [] }]
        })
      }
      continue
    }

    // Blockquote: > text or lines starting with "
    if (raw.startsWith('> ') || (raw.startsWith('"') && raw.length > 60)) {
      const text = raw.replace(/^>\s*/, '').replace(/\*\*/g,'').replace(/\*/g,'').trim()
      if (text.length > 20) {
        blocks.push({
          _type: 'block', _key: `bq${key++}`, style: 'blockquote', markDefs: [],
          children: [{ _type: 'span', _key: `s${key++}`, text, marks: [] }]
        })
      }
      continue
    }

    // Separator --- skip
    if (/^---+$/.test(raw) || /^\*\*\*+$/.test(raw)) continue

    // Regular paragraph — parse inline marks
    // Skip pure nav/UI lines
    if (raw.length < 20) continue
    if (/^\[.*\]\(.*\)$/.test(raw) && raw.length < 80) continue // pure link lines (nav)

    const children = []
    let remaining = raw
    let ckey = 0

    // Parse inline: **bold**, *italic*, links [text](url)
    const inlineRe = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((https?:\/\/[^)]+)\))/g
    let lastIndex = 0
    let match

    while ((match = inlineRe.exec(remaining)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        const before = remaining.slice(lastIndex, match.index)
        if (before) children.push({ _type: 'span', _key: `c${key++}`, text: before, marks: [] })
      }

      if (match[2]) { // ***bold+italic***
        children.push({ _type: 'span', _key: `c${key++}`, text: match[2], marks: ['strong', 'em'] })
      } else if (match[3]) { // **bold**
        children.push({ _type: 'span', _key: `c${key++}`, text: match[3], marks: ['strong'] })
      } else if (match[4]) { // *italic*
        children.push({ _type: 'span', _key: `c${key++}`, text: match[4], marks: ['em'] })
      } else if (match[5]) { // [text](url)
        const href = match[6]
        const markKey = `link${key++}`
        children.push({ _type: 'span', _key: `c${key++}`, text: match[5], marks: [markKey] })
        // We'll add markDef below
      }
      lastIndex = match.index + match[0].length
    }

    // Remaining text after last match
    if (lastIndex < remaining.length) {
      const after = remaining.slice(lastIndex)
      if (after) children.push({ _type: 'span', _key: `c${key++}`, text: after, marks: [] })
    }

    if (children.length === 0) {
      // Plain text
      const text = raw.replace(/\*\*/g,'').replace(/\*/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').trim()
      if (text.length < 20) continue
      children.push({ _type: 'span', _key: `c${key++}`, text, marks: [] })
    }

    // Combine all text for length check
    const fullText = children.map(c => c.text || '').join('')
    if (fullText.length < 20) continue
    if (skipLines.some(s => fullText.includes(s))) continue

    blocks.push({
      _type: 'block', _key: `p${key++}`, style: 'normal', markDefs: [],
      children
    })
  }

  return blocks
}

function parsePost(slug, html) {
  if (!html || html.length < 5000) return null

  // Try markdown-style meta first (from tool fetch format)
  let title = ''
  const titleMd = html.match(/meta-og:title:\s*(.+)/)
  const titleOg = html.match(/property="og:title"\s+content="([^"]+)"/) ||
                  html.match(/content="([^"]+)"\s+property="og:title"/)
  title = titleMd ? titleMd[1] : (titleOg ? titleOg[1] : '')
  title = title.replace(/&quot;/g,'"').replace(/&amp;/g,'&').trim()
  if (!title || title.includes('EmoodziK | Music Blog')) return null

  const excerptMd = html.match(/meta-og:description:\s*(.+)/)
  const excerptOg = html.match(/property="og:description"\s+content="([^"]+)"/)
  const excerptRaw = excerptMd ? excerptMd[1] : (excerptOg ? excerptOg[1] : '')
  const excerpt = excerptRaw.replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').trim().substring(0,300)

  const imageMd = html.match(/meta-og:image:\s*(https:\/\/[^\s]+)/)
  const imageOg = html.match(/property="og:image"\s+content="(https:\/\/[^"]+)"/)
  const imageRaw = imageMd ? imageMd[1].trim() : (imageOg ? imageOg[1] : '')
  // Get clean base URL for cover image
  const imageUrl = imageRaw ? imageRaw.split('/v1/')[0] + '~mv2.' + (imageRaw.includes('.png') ? 'png' : 'jpg') : ''

  const dateMd = html.match(/meta-article:published_time:\s*([^\s\n]+)/)
  const dateOg = html.match(/property="article:published_time"\s+content="([^"]+)"/)
  const publishedAt = dateMd ? dateMd[1].trim() : (dateOg ? dateOg[1] : new Date().toISOString())

  // Author
  let authorId = 'author-kink'
  if (/Kroon|K\.K\.N\./i.test(html)) authorId = 'author-kroon'
  else if (/\bKcid\b/i.test(html)) authorId = 'author-kcid'
  else if (/\bKai\b/.test(html) && !/Kai Hansen|Kai Powell|Kai Wachi/i.test(html)) authorId = 'author-kai'
  else if (/\bKunt\b/i.test(html)) authorId = 'author-kunt'
  else if (/\bKink\b/i.test(html)) authorId = 'author-kink'

  let categoryId = 'category-quen-quen'
  for (const [key, val] of Object.entries(catMap)) {
    if (html.includes(key)) { categoryId = val; break }
  }

  let seriesId = null
  const ls = slug.toLowerCase()
  if (ls.includes('free-flow') || ls.includes('freeflow')) seriesId = 'series-tan-man'
  else if (ls.includes('behind-the-drums')) seriesId = 'series-an-sau-gian-trong'

  const body = parseMarkdownToBlocks(html, slug)
  if (body.length === 0) return null

  const cleanSlug = decodeURIComponent(slug).replace(/^_+/,'')
  return {
    _type: 'post', _id: `post-${toSlug(cleanSlug)}`,
    title, slug: { _type: 'slug', current: cleanSlug },
    excerpt, publishedAt,
    author: { _type: 'reference', _ref: authorId },
    category: { _type: 'reference', _ref: categoryId },
    ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
    ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
    body
  }
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v6.ndjson')
  const stream = fs.createWriteStream(outputFile)
  let success = 0, failed = 0

  console.log(`🎵 EmoodziK Scraper v6 — ${slugs.length} slugs\n`)

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}...`)
    const { html, status } = await fetchPage(slug)

    if (status === 200 && html) {
      const post = parsePost(slug, html)
      if (post && post.body.length > 0) {
        stream.write(JSON.stringify(post) + '\n')
        success++
        const imgCount = post.body.filter((b) => b._type === 'image').length
        const ytCount = post.body.filter((b) => b._type === 'youtube').length
        console.log(` ✅ "${post.title.substring(0,35)}" — ${post.body.length} blocks, ${imgCount} ảnh, ${ytCount} YT`)
      } else {
        failed++
        console.log(` ⚠️  parse fail`)
      }
    } else {
      failed++
      console.log(` ❌ HTTP ${status}`)
    }
    await new Promise(r => setTimeout(r, 1000))
  }

  stream.end()
  console.log(`\n✅ ${success} thành công, ❌ ${failed} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-v6.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
