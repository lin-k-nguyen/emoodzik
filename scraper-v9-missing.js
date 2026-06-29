// EmoodziK Scraper v9 — 106 missing slugs
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = ["2pac","50-cent","abba","ac-dc","allman-brothers-band","alt-j","alter-bridge","andy-james","andy-timmons","anthrax","arctic-monkeys","at-the-drive-in","babyface","babymetal","benny-the-butcher","bryan-adams","buffalo-springfield","the-byrds","ceelo-green","chad-hugo","_chic","clipse","cold-chisel","coldplay","conway-the-machine","creed","crosby-stills-nash-young","cunninglynguists","the-cure","_hole","madonna","melle-mel","_mgmt","michael-jackson","michael-kiske","milli-vanilli","motorhead","muse","nas","neil-young","nile-rodgers","nili-brosh","nirvana","nita-strauss","the-notorious-big","nwa","oasis","obie-trice","ozzy-osbourne","parliament","pete-townshend","pharrell-williams","_pink","the-police","portishead","pulp","_ratm","robert-fripp","the-rolling-stones","_rush","sade","santana","seal","sia","slash","the-smashing-pumpkins","stephen-stills","stevie-ray-vaughan","the-stooges","the-strokes","__sza","tech-n9ne","ted-nugent","thin-lizzy","tlc","toni-braxton","tony-macalpine","_tool","_toto","tricky","tyler-the-creator","___u2","ufo","unisonic","usher","van-halen","velvet-revolver","the-verve","vince-staples","_wasp","the-weeknd","westside-gunn","willow","wu-tang-clan","x-japan","the-yardbirds","behind-the-drums-ep-8-vinnie-colaiuta","behind-the-drums-ep-9-tommy-aldridge","behind-the-drums-ep-10-bernard-purdie","behind-the-drums-ep-11-jim-keltner","behind-the-drums-ep-12-travis-barker","behind-the-drums-ep-13-mike-mangini","behind-the-drums-ep-14-gregg-bissonette","free-flow-ep-6-rap-cover","free-flow-ep-7-pop","free-flow-ep-8-one-chord"]

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
    .replace(/^free-flow-ep-.*/,'').replace(/^behind-the-drums-ep-.*/,'')
    .replace(/^freeflow-ep-.*/,'').replace(/^album-hay-\d+$/,'')
    .replace(/^50-year-hip-hop.*/,'').replace(/^top-\d+.*/,'')
  if (!cleanSlug || cleanSlug.length < 2) return null
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

    let categorySlug = 'quen-quen'
    document.querySelectorAll('a[href*="/categories/"]').forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
    })

    const rce = document.querySelector('[data-rce-version]')
    if (!rce) return { title, excerpt, imageUrl, publishedAt, author: 'kink', categorySlug, blocks: [] }

    const allParas = Array.from(rce.querySelectorAll('p'))
    const lastParas = allParas.slice(-5).map(p => p.innerText?.trim()).filter(t => t)
    let author = 'kink'
    for (const line of [...lastParas].reverse()) {
      if (/^kroon$/i.test(line)) { author = 'kroon'; break }
      if (/^kcid$/i.test(line)) { author = 'kcid'; break }
      if (/^kai$/i.test(line)) { author = 'kai'; break }
      if (/^kunt$/i.test(line)) { author = 'kunt'; break }
      if (/^kink$/i.test(line) || /kink$/i.test(line)) { author = 'kink'; break }
      if (/kroon/i.test(line) && line.length < 30) { author = 'kroon'; break }
      if (/kcid/i.test(line) && line.length < 30) { author = 'kcid'; break }
      if (/\bkai\b/i.test(line) && line.length < 30) { author = 'kai'; break }
      if (/kunt/i.test(line) && line.length < 30) { author = 'kunt'; break }
    }

    const rcvBlocks = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => { const h = el.getAttribute('data-hook') || ''; return h !== 'rcv-block-first' && h !== 'rcv-block-last' })
      .sort((a, b) => {
        const na = parseInt(a.getAttribute('data-hook').replace('rcv-block','')) || 0
        const nb = parseInt(b.getAttribute('data-hook').replace('rcv-block','')) || 0
        return na - nb
      })

    const videoPlayers = Array.from(rce.querySelectorAll('[data-hook="video-player"]'))
    const allImgs = Array.from(rce.querySelectorAll('img')).filter(img => {
      const src = img.src || img.getAttribute('data-src') || ''
      if (!src.includes('wixstatic')) return false
      if (navIds.some(id => src.includes(id))) return false
      const wMatch = src.match(/[,?&]w_(\d+)/)
      if (wMatch && parseInt(wMatch[1]) < 200) return false
      return true
    })

    const finalBlocks = []
    let keyIdx = 0, videoPlayerIdx = 0, imgIdx = 0

    rcvBlocks.forEach(rcvBlock => {
      const type = rcvBlock.getAttribute('type') || ''
      if (type === 'empty-line') return

      if (type === 'video') {
        if (videoPlayerIdx < videoPlayers.length) {
          const player = videoPlayers[videoPlayerIdx++]
          const btn = player.querySelector('button.react-player__preview')
          const style = btn?.getAttribute('style') || ''
          const m = style.match(/ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\//)
          if (m) finalBlocks.push({ _type: 'youtube', _key: `yt${keyIdx++}`, url: `https://www.youtube.com/watch?v=${m[1]}` })
        }
        return
      }

      if (type === 'image') {
        if (imgIdx < allImgs.length) {
          const img = allImgs[imgIdx++]
          const src = img.src || img.getAttribute('data-src') || ''
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          finalBlocks.push({ _type: 'image', _key: `img${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: img.getAttribute('alt') || '' })
        }
        return
      }

      if (type === 'paragraph' || type === 'heading1' || type === 'heading2' || type === 'heading3') {
        let el = rcvBlock.nextElementSibling
        let found = null, steps = 0
        while (el && steps < 5) {
          const tag = el.tagName?.toLowerCase()
          if (tag === 'p' || tag === 'h2' || tag === 'h3' || tag === 'h1' || tag === 'blockquote') { found = el; break }
          const child = el.querySelector('p, h1, h2, h3, blockquote')
          if (child) { found = child; break }
          el = el.nextElementSibling
          steps++
        }
        if (!found) return
        const text = found.innerText?.trim()
        if (!text || text.length < 2) return
        const tag = found.tagName?.toLowerCase()
        const style = tag === 'h2' ? 'h2' : tag === 'h3' ? 'h3' : tag === 'blockquote' ? 'blockquote' : 'normal'
        const children = []
        found.childNodes.forEach(node => {
          if (node.nodeType === 3) { const t = node.textContent; if (t && t.trim()) children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks: [] }) }
          else if (node.nodeType === 1) {
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
        finalBlocks.push({ _type: 'block', _key: `b${keyIdx++}`, style, markDefs: [], children })
      }
    })

    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: finalBlocks.filter(Boolean) }
  }, NAV_IDS)
}

async function main() {
  console.log('Fetching Sanity artists...')
  const sanityArtists = await fetchSanityArtists()
  console.log(`Loaded ${sanityArtists.length} artists\n`)

  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v9-missing.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-v9-missing.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  console.log(`🎵 EmoodziK Scraper v9 MISSING — ${slugs.length} slugs\n`)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--lang=vi-VN'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8' })

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}...`)
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
      title: data.title, slug: { _type: 'slug', current: cleanSlug },
      excerpt: data.excerpt.substring(0, 300), publishedAt: data.publishedAt,
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
    console.log(` ✅ "${data.title.substring(0,28)}" | ${imgCount}img ${ytCount}YT | ${data.author} | ${data.publishedAt.substring(0,10)}`)
    await new Promise(r => setTimeout(r, 800))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))
  console.log(`\n✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-v9-missing.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
