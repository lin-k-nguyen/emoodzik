// EmoodziK Scraper v5 — parse HTML content directly
const https = require('https')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston"]

const catMap = {
  'ch%C3%A9m-gi%C3%B3': 'category-quen-quen', 'ch\u00e9m-gi\u00f3': 'category-quen-quen',
  'nghe-ng%C3%B3ng': 'category-la-la', 'nghe-ng\u00f3ng': 'category-la-la',
  'ngh%E1%BB%8Dch-ngu': 'category-an-bum', 'ngh\u1ecbch-ngu': 'category-an-bum',
  '%C4%83n-view': 'category-an-view', '\u0103n-view': 'category-an-view',
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

function fetchPage(slug) {
  return new Promise((resolve) => {
    const url = `https://www.emoodzik.com/post/${slug}`
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'identity',
        'Connection': 'keep-alive',
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

function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim()
}

const skipPhrases = [
  'Music Blog', 'Nghệ Sĩ', 'Bọn Này', 'TẤT TẦN TẬT', 'QUEN QUEN', 'LẠ LẠ',
  'ĂN BUM', 'ĂN VIEW', 'Facebook', 'Instagram', 'Pinterest', 'Log In',
  'Every Thursday', 'top of page', 'bottom of page', '© 20', 'Recent Posts',
  'See All', 'Use tab', 'wixstatic', 'gallerySizeType', 'pgMeasures',
  'getElementById', 'querySelector', 'var ele', 'var options', 'isIOS',
  'pro-gallery', 'layout-fixer', 'Upgrade-Insecure', 'navigator',
]

function isGoodPara(text) {
  if (!text || text.length < 80) return false
  if (skipPhrases.some(p => text.includes(p))) return false
  // Reject if still has lots of code-like content
  if ((text.match(/[{}();]/g) || []).length > 5) return false
  return true
}

function parsePost(slug, html) {
  if (!html || html.length < 10000) return null

  // Get meta info from og tags in HTML
  const titleMatch = html.match(/property="og:title"\s+content="([^"]+)"/) ||
                     html.match(/content="([^"]+)"\s+property="og:title"/)
  const title = titleMatch ? titleMatch[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').trim() : ''
  if (!title || title.includes('EmoodziK | Music Blog')) return null

  const excerptMatch = html.match(/property="og:description"\s+content="([^"]+)"/) ||
                       html.match(/content="([^"]+)"\s+property="og:description"/)
  const excerpt = excerptMatch ? excerptMatch[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').trim().substring(0,300) : ''

  const imageMatch = html.match(/property="og:image"\s+content="(https:\/\/[^"]+)"/) ||
                     html.match(/content="(https:\/\/[^"]+)"\s+property="og:image"/)
  const imageUrl = imageMatch ? imageMatch[1] : ''

  const dateMatch = html.match(/property="article:published_time"\s+content="([^"]+)"/) ||
                    html.match(/content="([^"]+)"\s+property="article:published_time"/)
  const publishedAt = dateMatch ? dateMatch[1] : new Date().toISOString()

  // Author from signature patterns in full HTML
  let authorId = 'author-kink'
  if (/Kroon<\/|>Kroon<|K\.K\.N\.|article:author.*K\.K\.N/i.test(html)) authorId = 'author-kroon'
  else if (/Kcid<\/|>Kcid</i.test(html)) authorId = 'author-kcid'
  else if (/\bKai<\/|>Kai\b/i.test(html) && !/Kai Hansen|Kai Powell/i.test(html)) authorId = 'author-kai'
  else if (/Kunt<\/|>Kunt</i.test(html)) authorId = 'author-kunt'
  else if (/Kink<\/|>Kink</i.test(html)) authorId = 'author-kink'
  // Also check article:author meta
  const authorMeta = html.match(/article:author.*?content="([^"]+)"/) ||
                     html.match(/content="([^"]+)".*?article:author/)
  if (authorMeta) {
    const a = authorMeta[1].toLowerCase()
    if (a.includes('kroon') || a.includes('k.k.n')) authorId = 'author-kroon'
    else if (a.includes('kcid')) authorId = 'author-kcid'
    else if (a.includes('kai')) authorId = 'author-kai'
    else if (a.includes('kunt')) authorId = 'author-kunt'
    else if (a.includes('kink')) authorId = 'author-kink'
  }

  let categoryId = 'category-quen-quen'
  for (const [key, val] of Object.entries(catMap)) {
    if (html.includes(key)) { categoryId = val; break }
  }

  let seriesId = null
  const ls = slug.toLowerCase()
  if (ls.includes('free-flow') || ls.includes('freeflow')) seriesId = 'series-tan-man'
  else if (ls.includes('behind-the-drums')) seriesId = 'series-an-sau-gian-trong'

  // Extract body: find all <p> tags in the article area
  // Look for content between the article header and footer
  const articleStart = html.indexOf('<h1')
  const articleEnd = html.lastIndexOf('Recent Posts')
  if (articleStart < 0) return null

  const articleHtml = html.substring(articleStart, articleEnd > articleStart ? articleEnd : html.length * 0.9)

  // Extract all paragraph-like content
  const paras = []
  const pMatches = articleHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)
  for (const m of pMatches) {
    const raw = m[1]
    // Skip if it's mostly tags (images, etc)
    const textOnly = stripHtml(raw)
    if (isGoodPara(textOnly)) {
      paras.push(textOnly)
    }
  }

  // Also try div/span with substantial text if paragraphs are sparse
  if (paras.length < 3) {
    const spanMatches = articleHtml.matchAll(/<(?:div|span)[^>]*class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/(?:div|span)>/gi)
    for (const m of spanMatches) {
      const textOnly = stripHtml(m[1])
      if (isGoodPara(textOnly) && !paras.includes(textOnly)) {
        paras.push(textOnly)
      }
    }
  }

  if (paras.length === 0) return null

  const cleanSlug = decodeURIComponent(slug).replace(/^_+/,'')
  return {
    _type: 'post', _id: `post-${toSlug(cleanSlug)}`,
    title, slug: { _type: 'slug', current: cleanSlug }, excerpt, publishedAt,
    author: { _type: 'reference', _ref: authorId },
    category: { _type: 'reference', _ref: categoryId },
    ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
    ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
    body: paras.slice(0,50).map((text,i) => ({
      _type:'block', _key:`b${i}`, style:'normal', markDefs:[],
      children:[{ _type:'span', _key:`s${i}`, text, marks:[] }]
    }))
  }
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v5.ndjson')
  const stream = fs.createWriteStream(outputFile)
  let success = 0, failed = 0

  console.log(`🎵 EmoodziK Scraper v5 — ${slugs.length} slugs\n`)

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}...`)
    const { html, status } = await fetchPage(slug)

    if (status === 200 && html) {
      const post = parsePost(slug, html)
      if (post && post.body.length > 0) {
        stream.write(JSON.stringify(post) + '\n')
        success++
        console.log(` ✅ "${post.title.substring(0,40)}" (${post.body.length} đoạn)`)
      } else {
        failed++
        // Debug: show first p tag found
        const firstP = html.match(/<p[^>]*>([\s\S]{20,200}?)<\/p>/i)
        console.log(` ⚠️  0 đoạn | first <p>: ${firstP ? firstP[1].substring(0,80) : 'none'}`)
      }
    } else {
      failed++
      console.log(` ❌ HTTP ${status}`)
    }
    await new Promise(r => setTimeout(r, 1000))
  }

  stream.end()
  console.log(`\n✅ ${success} thành công, ❌ ${failed} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-v5.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
