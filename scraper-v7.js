// EmoodziK Scraper v7 — dùng rcv-block để reconstruct đúng thứ tự content
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston","lynyrd-skynyrd"]

const NAV_IDS = ['4b037027','e316f544','8d689333','83804c07']

async function fetchSanityArtists() {
  const https = require('https')
  return new Promise((resolve) => {
    const url = 'https://22wk7h4m.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22artist%22%5D%7B_id%2Cname%2Cslug%7D'
    https.get(url, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => { try { resolve(JSON.parse(data).result || []) } catch { resolve([]) } })
    }).on('error', () => resolve([]))
  })
}

function norm(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,' ').replace(/\s+/g,' ').trim()
}

function findArtist(slug, artists) {
  const cleanSlug = decodeURIComponent(slug).replace(/^_+/,'')
    .replace(/-pt[-–]?\d+$/,'').replace(/-best$/,'').replace(/-emoodzik$/,'')
    .replace(/^free-flow-ep-\d+[-–]?/,'').replace(/^behind-the-drums-ep-\d+[-–]?/,'')
    .replace(/^freeflow-ep-\d+[-–]?/,'')
  const normSlug = norm(cleanSlug)
  return artists.find(a => norm(a.slug?.current || '') === normSlug || norm(a.name || '') === normSlug.replace(/-/g,' ')) || null
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0
      const timer = setInterval(() => {
        window.scrollBy(0, 300)
        totalHeight += 300
        if (totalHeight >= document.body.scrollHeight) { clearInterval(timer); window.scrollTo(0,0); resolve() }
      }, 150)
    })
  })
  await new Promise(r => setTimeout(r, 2000))
}

async function scrapePage(page, slug) {
  const url = `https://www.emoodzik.com/post/${slug}`
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await page.waitForSelector('[data-rce-version]', { timeout: 10000 }).catch(() => {})
    await new Promise(r => setTimeout(r, 1500))
    await autoScroll(page)
  } catch (e) { return null }

  return await page.evaluate((navIds) => {
    const getMeta = p => {
      const el = document.querySelector(`meta[property="${p}"]`) || document.querySelector(`meta[name="${p}"]`)
      return el ? el.getAttribute('content') : ''
    }

    const title = getMeta('og:title') || ''
    const excerpt = getMeta('og:description') || ''
    const imageUrl = getMeta('og:image') || ''
    const publishedAt = getMeta('article:published_time') || new Date().toISOString()
    if (!title || title.includes('EmoodziK | Music Blog') || title === 'EmoodziK') return null

    // Category
    let categorySlug = 'quen-quen'
    document.querySelectorAll('a[href*="/categories/"]').forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
    })

    // Author
    let author = 'kink'
    const authorMeta = (getMeta('article:author') || '').toLowerCase()
    const bodyText = document.body.innerText || ''
    if (authorMeta.includes('kroon') || authorMeta.includes('k.k.n') || /\bKroon\b/.test(bodyText)) author = 'kroon'
    else if (authorMeta.includes('kcid') || /\bKcid\b/.test(bodyText)) author = 'kcid'
    else if (authorMeta.includes('kai') || (/\bKai\b/.test(bodyText) && !/Kai Hansen|Kai Powell/i.test(bodyText))) author = 'kai'
    else if (authorMeta.includes('kunt') || /\bKunt\b/.test(bodyText)) author = 'kunt'
    else if (authorMeta.includes('kink') || /\bKink\b/.test(bodyText)) author = 'kink'

    const rce = document.querySelector('[data-rce-version]')
    if (!rce) return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: [] }

    // === Build blocks using rcv-block order ===
    // First, collect video players and their YouTube IDs in order
    const videoPlayers = Array.from(rce.querySelectorAll('[data-hook="video-player"]'))
    const ytQueue = []
    videoPlayers.forEach(player => {
      const btn = player.querySelector('button.react-player__preview')
      const style = btn?.getAttribute('style') || ''
      const m = style.match(/ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\//)
      if (m) ytQueue.push(m[1])
    })

    // Collect images in order
    const allImgs = Array.from(rce.querySelectorAll('img')).filter(img => {
      const src = img.src || img.getAttribute('data-src') || ''
      if (!src.includes('wixstatic')) return false
      if (navIds.some(id => src.includes(id))) return false
      const wMatch = src.match(/[,?&]w_(\d+)/)
      if (wMatch && parseInt(wMatch[1]) < 200) return false
      return true
    })

    // Now walk rcv-blocks in order to reconstruct content
    const blocks = []
    let keyIdx = 0
    let videoIdx = 0
    let imgIdx = 0

    // Get all rcv-blocks sorted by number
    const rcvBlocks = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => {
        const hook = el.getAttribute('data-hook') || ''
        return hook !== 'rcv-block-first' && hook !== 'rcv-block-last'
      })
      .sort((a, b) => {
        const numA = parseInt(a.getAttribute('data-hook').replace('rcv-block', '')) || 0
        const numB = parseInt(b.getAttribute('data-hook').replace('rcv-block', '')) || 0
        return numA - numB
      })

    rcvBlocks.forEach(rcvBlock => {
      const type = rcvBlock.getAttribute('type') || ''

      if (type === 'video') {
        if (videoIdx < ytQueue.length) {
          blocks.push({ _type: 'youtube', _key: `yt${keyIdx++}`, url: `https://www.youtube.com/watch?v=${ytQueue[videoIdx++]}` })
        }
        return
      }

      if (type === 'image') {
        if (imgIdx < allImgs.length) {
          const img = allImgs[imgIdx++]
          const src = img.src || img.getAttribute('data-src') || ''
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          blocks.push({ _type: 'image', _key: `img${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: img.getAttribute('alt') || '' })
        }
        return
      }

      if (type === 'paragraph' || type === 'heading1' || type === 'heading2' || type === 'heading3') {
        // Find the actual rendered element near this rcv-block
        // The rcv-block is a marker; actual text is in sibling/nearby elements
        // Walk the real DOM p/h2/h3 elements in order
        return // handled separately below
      }
    })

    // For text blocks, walk the actual rendered DOM elements
    // These are p, h1, h2, h3, blockquote elements in order
    const textBlocks = []
    const walker = (el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : ''

      if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3') {
        const text = el.innerText?.trim()
        if (!text || text.length < 2) return
        const style = tag === 'h2' ? 'h2' : tag === 'h3' ? 'h3' : 'normal'
        const children = []
        el.childNodes.forEach(node => {
          if (node.nodeType === 3) {
            const t = node.textContent
            if (t && t.trim()) children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks: [] })
          } else if (node.nodeType === 1) {
            const ct = node.tagName?.toLowerCase()
            const t = node.innerText || node.textContent || ''
            if (!t.trim()) return
            const marks = []
            if (ct === 'strong' || ct === 'b' || node.querySelector('strong,b')) marks.push('strong')
            if (ct === 'em' || ct === 'i' || node.querySelector('em,i')) marks.push('em')
            children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks })
          }
        })
        if (children.length === 0) children.push({ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] })
        textBlocks.push({ _type: 'block', _key: `p${keyIdx++}`, style, markDefs: [], children })
        return
      }

      if (tag === 'blockquote') {
        const text = el.innerText?.trim()
        if (text && text.length > 10) {
          textBlocks.push({ _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }] })
        }
        return
      }

      if (['script','style','nav','header','footer','button','svg'].includes(tag)) return
      el.childNodes?.forEach(child => { if (child.nodeType === 1) walker(child) })
    }
    walker(rce)

    // Now interleave text blocks with video/image blocks using rcv-block order
    const finalBlocks = []
    let textIdx = 0
    let videoIdx2 = 0
    let imgIdx2 = 0

    rcvBlocks.forEach(rcvBlock => {
      const type = rcvBlock.getAttribute('type') || ''
      if (type === 'paragraph' || type === 'heading1' || type === 'heading2' || type === 'heading3') {
        if (textIdx < textBlocks.length) finalBlocks.push(textBlocks[textIdx++])
      } else if (type === 'video') {
        if (videoIdx2 < ytQueue.length) {
          finalBlocks.push({ _type: 'youtube', _key: `ytf${keyIdx++}`, url: `https://www.youtube.com/watch?v=${ytQueue[videoIdx2++]}` })
        }
      } else if (type === 'image') {
        if (imgIdx2 < allImgs.length) {
          const img = allImgs[imgIdx2++]
          const src = img.src || img.getAttribute('data-src') || ''
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          finalBlocks.push({ _type: 'image', _key: `imgf${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: img.getAttribute('alt') || '' })
        }
      }
      // skip empty-line, first, last
    })

    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: finalBlocks.filter(b => b) }
  }, NAV_IDS)
}

async function main() {
  console.log('Fetching Sanity artists...')
  const sanityArtists = await fetchSanityArtists()
  console.log(`Loaded ${sanityArtists.length} artists\n`)

  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v7.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-v7.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  const unique = [...new Set(slugs)]
  console.log(`🎵 EmoodziK Scraper v7 — ${unique.length} slugs\n`)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--lang=vi-VN'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8' })

  for (let i = 0; i < unique.length; i++) {
    const slug = unique[i]
    process.stdout.write(`[${i+1}/${unique.length}] ${slug}...`)

    const data = await scrapePage(page, slug)

    if (!data || !data.title || data.blocks.length === 0) {
      failed.push(slug)
      console.log(` ❌ ${data ? `blocks=${data?.blocks?.length}` : '404'}`)
      continue
    }

    const cleanSlug = decodeURIComponent(slug).replace(/^_+/, '')
    let catId = 'category-quen-quen'
    if (data.categorySlug.includes('ngóng')) catId = 'category-la-la'
    else if (data.categorySlug.includes('ngu')) catId = 'category-an-bum'
    else if (data.categorySlug.includes('view')) catId = 'category-an-view'

    let seriesId = null
    const ls = slug.toLowerCase()
    if (ls.includes('free-flow') || ls.includes('freeflow')) seriesId = 'series-tan-man'
    else if (ls.includes('behind-the-drums')) seriesId = 'series-an-sau-gian-trong'

    const matchedArtist = findArtist(cleanSlug, sanityArtists)
    const artistsField = matchedArtist ? [{ _type: 'reference', _ref: matchedArtist._id, _key: 'art0' }] : []

    const imageUrl = data.imageUrl ? data.imageUrl.split('/v1/')[0] + '~mv2.' + (data.imageUrl.includes('.png') ? 'png' : 'jpg') : ''

    const doc = {
      _type: 'post', _id: `post-${toSlug(cleanSlug)}`,
      title: data.title,
      slug: { _type: 'slug', current: cleanSlug },
      excerpt: data.excerpt.substring(0, 300),
      publishedAt: data.publishedAt,
      author: { _type: 'reference', _ref: `author-${data.author}` },
      category: { _type: 'reference', _ref: catId },
      ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
      ...(artistsField.length > 0 ? { artists: artistsField } : {}),
      ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
      body: data.blocks
    }

    stream.write(JSON.stringify(doc) + '\n')
    success++
    const imgCount = data.blocks.filter(b => b._type === 'image').length
    const ytCount = data.blocks.filter(b => b._type === 'youtube').length
    console.log(` ✅ "${data.title.substring(0,30)}" | ${imgCount}img ${ytCount}YT | artist:${matchedArtist?.name || 'none'} | ${data.publishedAt.substring(0,10)}`)

    await new Promise(r => setTimeout(r, 800))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))
  console.log(`\n✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-v7.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
