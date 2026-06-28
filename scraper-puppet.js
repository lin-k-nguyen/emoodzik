// EmoodziK Scraper — Puppeteer version
// Chạy: node scraper-puppet.js
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston"]

const catMap = {
  'chém-gió': 'category-quen-quen',
  'nghe-ngóng': 'category-la-la',
  'nghịch-ngu': 'category-an-bum',
  'ăn-view': 'category-an-view',
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

function getYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

async function scrapePage(page, slug) {
  const url = `https://www.emoodzik.com/post/${slug}`
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    // Wait for article content to render
    await page.waitForSelector('[data-rce-version]', { timeout: 10000 }).catch(() => {})
    await new Promise(r => setTimeout(r, 1000))
  } catch (e) {
    return null
  }

  return await page.evaluate(() => {
    // Meta info
    const getMeta = (prop) => {
      const el = document.querySelector(`meta[property="${prop}"]`) ||
                 document.querySelector(`meta[name="${prop}"]`)
      return el ? el.getAttribute('content') : ''
    }

    const title = getMeta('og:title') || document.title || ''
    const excerpt = getMeta('og:description') || ''
    const imageUrl = getMeta('og:image') || ''
    const publishedAt = getMeta('article:published_time') || new Date().toISOString()

    // Category from nav links
    let categorySlug = 'quen-quen'
    const catLinks = document.querySelectorAll('a[href*="/categories/"]')
    catLinks.forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
      else if (href.includes('ch') && href.includes('gi')) categorySlug = 'chém-gió'
    })

    // Author from signature at end of article
    const bodyText = document.body.innerText || ''
    let author = 'kink'
    if (/\bKroon\b/.test(bodyText)) author = 'kroon'
    else if (/\bKcid\b/.test(bodyText)) author = 'kcid'
    else if (/\bKai\b/.test(bodyText) && !/Kai Hansen|Kai Powell/i.test(bodyText)) author = 'kai'
    else if (/\bKunt\b/.test(bodyText)) author = 'kunt'
    else if (/\bKink\b/.test(bodyText)) author = 'kink'

    // Also check article:author meta
    const authorMeta = (getMeta('article:author') || '').toLowerCase()
    if (authorMeta.includes('kroon') || authorMeta.includes('k.k.n')) author = 'kroon'
    else if (authorMeta.includes('kcid')) author = 'kcid'
    else if (authorMeta.includes('kai')) author = 'kai'
    else if (authorMeta.includes('kunt')) author = 'kunt'
    else if (authorMeta.includes('kink')) author = 'kink'

    // Extract rich content blocks from Wix RCE
    const rceContainer = document.querySelector('[data-rce-version]')
    if (!rceContainer) return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: [] }

    const blocks = []
    let keyIdx = 0

    // Walk through all child elements of the RCE container
    const walker = (el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : ''

      // Paragraph / text block
      if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3') {
        const text = el.innerText?.trim()
        if (!text || text.length < 2) return

        // Determine style
        let style = 'normal'
        if (tag === 'h2' || tag === 'h3') style = tag

        // Build children with marks
        const children = []
        let ckey = 0
        const childNodes = el.childNodes

        childNodes.forEach(node => {
          if (node.nodeType === 3) { // text node
            const t = node.textContent
            if (t && t.trim()) children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks: [] })
          } else if (node.nodeType === 1) { // element
            const ct = node.tagName?.toLowerCase()
            const t = node.innerText || node.textContent || ''
            if (!t.trim()) return
            const marks = []
            if (ct === 'strong' || ct === 'b') marks.push('strong')
            if (ct === 'em' || ct === 'i') marks.push('em')
            if (ct === 'a') {
              const href = node.getAttribute('href')
              if (href) {
                const markKey = `link${keyIdx}`
                marks.push(markKey)
                // We'll handle markDefs separately
              }
            }
            // Handle nested bold/italic inside links etc
            if (node.querySelector('strong,b')) marks.push('strong')
            if (node.querySelector('em,i')) marks.push('em')
            children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks })
          }
        })

        if (children.length === 0) {
          children.push({ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] })
        }

        blocks.push({ _type: 'block', _key: `b${keyIdx++}`, style, markDefs: [], children })
        return
      }

      // Blockquote
      if (tag === 'blockquote') {
        const text = el.innerText?.trim()
        if (text && text.length > 10) {
          blocks.push({
            _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [],
            children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }]
          })
        }
        return
      }

      // Images
      if (tag === 'img') {
        const src = el.getAttribute('src') || el.getAttribute('data-src') || ''
        if (src && src.includes('wixstatic') && !src.includes('w_39,') && !src.includes('4b037027')) {
          // Get clean URL
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          const caption = el.getAttribute('alt') || ''
          blocks.push({
            _type: 'image', _key: `img${keyIdx++}`,
            asset: { _type: 'reference', url: cleanSrc },
            caption
          })
        }
        return
      }

      // YouTube iframes
      if (tag === 'iframe') {
        const src = el.getAttribute('src') || ''
        const ytMatch = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
        if (ytMatch) {
          blocks.push({
            _type: 'youtube', _key: `yt${keyIdx++}`,
            url: `https://www.youtube.com/watch?v=${ytMatch[1]}`
          })
        }
        return
      }

      // Recurse into children (skip script, style, nav, header, footer)
      if (['script', 'style', 'nav', 'header', 'footer', 'button', 'svg'].includes(tag)) return
      el.childNodes?.forEach(child => {
        if (child.nodeType === 1) walker(child)
      })
    }

    walker(rceContainer)

    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks }
  })
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-puppet.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-puppet.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  console.log(`🎵 EmoodziK Puppeteer Scraper — ${slugs.length} slugs\n`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=vi-VN']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8' })

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}...`)

    const data = await scrapePage(page, slug)

    if (!data || !data.title || data.blocks.length === 0) {
      failed.push(slug)
      console.log(` ⚠️  ${data ? `title=${!!data.title}, blocks=${data?.blocks?.length}` : 'null'}`)
      continue
    }

    const cleanSlug = decodeURIComponent(slug).replace(/^_+/, '')
    const categoryId = Object.entries(catMap).find(([k]) => data.categorySlug.includes(k.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g,'a').replace(/[éèẻẽẹêếềểễệ]/g,'e')))?.[1] || 'category-quen-quen'

    // More robust category mapping
    let catId = 'category-quen-quen'
    if (data.categorySlug.includes('ngóng') || data.categorySlug.includes('ngong')) catId = 'category-la-la'
    else if (data.categorySlug.includes('ngu')) catId = 'category-an-bum'
    else if (data.categorySlug.includes('view')) catId = 'category-an-view'

    let seriesId = null
    const ls = slug.toLowerCase()
    if (ls.includes('free-flow') || ls.includes('freeflow')) seriesId = 'series-tan-man'
    else if (ls.includes('behind-the-drums')) seriesId = 'series-an-sau-gian-trong'

    // Clean image URL
    const imageUrl = data.imageUrl ? data.imageUrl.split('/v1/')[0] + '~mv2.' + (data.imageUrl.includes('.png') ? 'png' : 'jpg') : ''

    const doc = {
      _type: 'post',
      _id: `post-${toSlug(cleanSlug)}`,
      title: data.title,
      slug: { _type: 'slug', current: cleanSlug },
      excerpt: data.excerpt.substring(0, 300),
      publishedAt: data.publishedAt,
      author: { _type: 'reference', _ref: `author-${data.author}` },
      category: { _type: 'reference', _ref: catId },
      ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
      ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
      body: data.blocks
    }

    stream.write(JSON.stringify(doc) + '\n')
    success++

    const imgCount = data.blocks.filter(b => b._type === 'image').length
    const ytCount = data.blocks.filter(b => b._type === 'youtube').length
    console.log(` ✅ "${data.title.substring(0,35)}" — ${data.blocks.length} blocks, ${imgCount} ảnh, ${ytCount} YT`)

    // Small delay between pages
    await new Promise(r => setTimeout(r, 500))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\n📦 Import:`)
  console.log(`npx sanity dataset import emoodzik-posts-puppet.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
