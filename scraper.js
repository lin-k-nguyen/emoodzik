// EmoodziK Wix Scraper
// Chạy: node scraper.js
// Output: emoodzik-posts.ndjson

const https = require('https')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston"]

// Author mapping từ chữ ký cuối bài
const authorMap = { kink: 'author-kink', kroon: 'author-kroon', kcid: 'author-kcid', kai: 'author-kai', kunt: 'author-kunt' }

// Category mapping từ URL Wix
const catMap = {
  'ch%C3%A9m-gi%C3%B3': 'category-quen-quen',
  'ch\u00e9m-gi\u00f3': 'category-quen-quen',
  'nghe-ng\u00f3ng': 'category-la-la',
  'nghe-ng%C3%B3ng': 'category-la-la',
  'ngh\u1ecbch-ngu': 'category-an-bum',
  'ngh%E1%BB%8Dch-ngu': 'category-an-bum',
  '\u0103n-view': 'category-an-view',
  '%C4%83n-view': 'category-an-view',
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
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
      }
    }, (res) => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve({ slug, html: data, status: res.statusCode }))
    })
    req.on('error', (e) => resolve({ slug, html: '', status: 0, error: e.message }))
    req.setTimeout(15000, () => { req.destroy(); resolve({ slug, html: '', status: 408 }) })
  })
}

function parsePost(slug, html) {
  if (!html || html.length < 500) return null

  // Title
  const titleMatch = html.match(/og:title.*?content="([^"]+)"/) ||
                     html.match(/title:\s*(.+)/) ||
                     html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
  const title = titleMatch ? titleMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim() : ''
  if (!title) return null

  // Excerpt
  const excerptMatch = html.match(/og:description.*?content="([^"]+)"/) ||
                       html.match(/meta-og:description:\s*(.+)/)
  const excerpt = excerptMatch ? excerptMatch[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim().substring(0, 300) : ''

  // Image
  const imageMatch = html.match(/meta-og:image:\s*(https:\/\/[^\s]+)/) ||
                     html.match(/og:image.*?content="(https:\/\/[^"]+)"/)
  const imageUrl = imageMatch ? imageMatch[1].trim() : ''

  // Date
  const dateMatch = html.match(/meta-article:published_time:\s*([^\s\n]+)/) ||
                    html.match(/published_time.*?content="([^"]+)"/)
  const publishedAt = dateMatch ? dateMatch[1].trim() : new Date().toISOString()

  // Author from signature
  let authorId = 'author-kink'
  const authorSig = html.match(/\*\*\*(Kink|Kroon|Kcid|Kai|Kunt)\*\*\*/i) ||
                    html.match(/—\s*(Kink|Kroon|Kcid|Kai|Kunt)\s*\n/i) ||
                    html.match(/K\.K\.N\./i)
  if (authorSig) {
    const n = (authorSig[1] || 'kroon').toLowerCase()
    if (n.includes('kroon') || authorSig[0].includes('K.K.N')) authorId = 'author-kroon'
    else if (n.includes('kcid')) authorId = 'author-kcid'
    else if (n.includes('kai')) authorId = 'author-kai'
    else if (n.includes('kunt')) authorId = 'author-kunt'
    else if (n.includes('kink')) authorId = 'author-kink'
  }

  // Category from Wix category URL
  let categoryId = 'category-quen-quen'
  for (const [key, val] of Object.entries(catMap)) {
    if (html.includes(key)) { categoryId = val; break }
  }

  // Series
  let seriesId = null
  const lowerSlug = slug.toLowerCase()
  if (lowerSlug.includes('free-flow') || lowerSlug.includes('freeflow') || html.includes('Tản mạn')) {
    seriesId = 'series-tan-man'
  } else if (lowerSlug.includes('behind-the-drums') || html.includes('Ẩn sau giàn trống')) {
    seriesId = 'series-an-sau-gian-trong'
  }

  // Extract body text — paragraphs between title and Recent Posts/footer
  const bodyParas = []
  // Find content after the h1/title area
  const startIdx = html.indexOf('min read')
  const endIdx = html.indexOf('Recent Posts')
  const bodySection = endIdx > startIdx && startIdx > 0
    ? html.substring(startIdx, endIdx)
    : html.substring(Math.max(0, startIdx))

  // Extract text from markdown-style content
  const lines = bodySection.split('\n')
  for (const line of lines) {
    // Clean markdown
    let text = line
      .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\([^)]+\)/g, '$1')
      .replace(/!\[.*?\]\([^)]+\)/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/---/g, '')
      .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .trim()

    if (text.length > 40 && !text.startsWith('http') && !text.includes('wixstatic') &&
        !text.includes('canonical') && !text.includes('meta-') &&
        !text.includes('Music Blog') && !text.includes('Nghệ Sĩ') &&
        !text.includes('Bọn Này') && !text.includes('TẤT TẦN TẬT') &&
        !text.includes('Facebook') && !text.includes('Instagram')) {
      bodyParas.push(text)
    }
  }

  const cleanSlug = decodeURIComponent(slug).replace(/^_+/, '')

  return {
    _type: 'post',
    _id: `post-${toSlug(cleanSlug)}`,
    title,
    slug: { _type: 'slug', current: cleanSlug },
    excerpt,
    publishedAt,
    author: { _type: 'reference', _ref: authorId },
    category: { _type: 'reference', _ref: categoryId },
    ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
    ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
    body: bodyParas.slice(0, 40).map((text, i) => ({
      _type: 'block', _key: `b${i}`, style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }]
    }))
  }
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts.ndjson')
  const stream = fs.createWriteStream(outputFile)
  let success = 0, failed = 0

  console.log(`🎵 EmoodziK Scraper — ${slugs.length} bài viết`)
  console.log(`📁 Output: ${outputFile}\n`)

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] Fetching: ${slug}...`)

    const { html, status } = await fetchPage(slug)

    if (status === 200 && html) {
      const post = parsePost(slug, html)
      if (post) {
        stream.write(JSON.stringify(post) + '\n')
        success++
        console.log(` ✅ "${post.title.substring(0,40)}"`)
      } else {
        failed++
        console.log(` ⚠️  Parse failed`)
      }
    } else {
      failed++
      console.log(` ❌ HTTP ${status}`)
    }

    // Rate limit — 1 giây giữa mỗi request
    await new Promise(r => setTimeout(r, 1000))
  }

  stream.end()
  console.log(`\n✅ Done! ${success} thành công, ${failed} thất bại`)
  console.log(`📄 File: ${outputFile}`)
  console.log(`\n📦 Import vào Sanity:`)
  console.log(`npx sanity dataset import emoodzik-posts.ndjson production --project-id 22wk7h4m --dataset production`)
}

main().catch(console.error)
