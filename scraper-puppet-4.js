// EmoodziK Scraper Puppeteer — Batch 4
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

// Try multiple slug variations for each missing artist
const slugs = [
  // Simple slugs (may work directly)
  "abba","ac-dc","alice-cooper","allman-brothers-band","alt-j",
  "alter-bridge","andy-james","andy-timmons","anthrax","arctic-monkeys",
  "at-the-drive-in","babyface","babymetal","benny-the-butcher","beyonce",
  "bon-jovi","bryan-adams","buffalo-springfield","the-byrds","ceelo-green",
  "chad-hugo","clipse","cold-chisel","coldplay","conway-the-machine","creed",
  "crosby-stills-nash-young","cunninglynguists","the-cure","guns-n-roses",
  "jay-z","madonna","massive-attack","melle-mel","michael-jackson",
  "michael-kiske","milli-vanilli","motorhead","muse","nas","neil-young",
  "nile-rodgers","nili-brosh","nirvana","nita-strauss","the-notorious-big",
  "nwa","oasis","obie-trice","ozzy-osbourne","paramore","parliament",
  "pete-townshend","pharrell-williams","the-police","portishead","pulp",
  "queen","radiohead","rage-against-the-machine","randy-rhoads","raye",
  "rem","robert-fripp","the-rolling-stones","sade","santana","seal","sia",
  "slash","the-smashing-pumpkins","stephen-stills","stevie-ray-vaughan",
  "stevie-wonder","the-stooges","the-strokes","system-of-a-down","tech-n9ne",
  "ted-nugent","thin-lizzy","tlc","toni-braxton","tony-macalpine","tricky",
  "tyler-the-creator","ufo","unisonic","usher","van-halen","velvet-revolver",
  "the-velvet-underground","the-verve","vince-staples","the-weeknd",
  "westside-gunn","the-white-stripes","the-who","willow","wu-tang-clan",
  "x-japan","the-yardbirds","2pac","50-cent","ringo-starr","myles-kennedy",
  "mark-tremonti",
  // Series with different slug patterns
  "behind-the-drums-ep-8","behind-the-drums-ep-9","behind-the-drums-ep-10",
  "behind-the-drums-ep-11","behind-the-drums-ep-12","behind-the-drums-ep-13",
  "behind-the-drums-ep-14",
  "free-flow-ep-6","free-flow-ep-7","free-flow-ep-8",
  // Alt slug patterns
  "2pac-tupac","50-cent-get-rich-or-die-tryin",
  "ac-dc-highway-to-hell","abba-dancing-queen",
  "nirvana-nevermind","the-rolling-stones-sticky-fingers",
  "the-who-tommy","queen-bohemian-rhapsody",
  "radiohead-ok-computer","stevie-wonder-songs-in-the-key-of-life",
  "michael-jackson-thriller","nas-illmatic","jay-z-blueprint",
  "madonna-like-a-virgin","oasis-definitely-maybe",
  "the-smashing-pumpkins-siamese-dream","system-of-a-down-toxicity",
  "rage-against-the-machine-bombtrack","the-police-every-breath",
  "the-cure-disintegration","the-strokes-is-this-it",
  "portishead-dummy","massive-attack-blue-lines",
  "van-halen-eruption","stevie-ray-vaughan-texas-flood",
  "thin-lizzy-boys-are-back","motorhead-ace-of-spades",
  "muse-origin-of-symmetry","coldplay-yellow",
  "the-notorious-big-ready-to-die","nas-one-love",
  "wu-tang-clan-enter-the-36-chambers",
  "the-white-stripes-seven-nation-army",
  "the-velvet-underground-lou-reed",
  "guns-n-roses-appetite-for-destruction",
  "behind-the-drums-ep-8-vinnie-colaiuta",
  "behind-the-drums-ep-9-tommy-aldridge",
  "behind-the-drums-ep-10-bernard-purdie",
  "behind-the-drums-ep-11-jim-keltner",
  "behind-the-drums-ep-12-travis-barker",
  "behind-the-drums-ep-13-mike-mangini",
  "behind-the-drums-ep-14-gregg-bissonette",
  "free-flow-ep-6-rap-no-cover","free-flow-ep-6-chu-nhac-rap-no-cover",
  "free-flow-ep-7-nhac-pop","free-flow-ep-8-mot-hop-am",
]

const catMap = {
  'chém-gió': 'category-quen-quen',
  'nghe-ngóng': 'category-la-la',
  'nghịch-ngu': 'category-an-bum',
  'ăn-view': 'category-an-view',
}

function toSlug(s) {
  return decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

async function scrapePage(page, slug) {
  const url = `https://www.emoodzik.com/post/${slug}`
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 })
    await page.waitForSelector('[data-rce-version]', { timeout: 8000 }).catch(() => {})
    await new Promise(r => setTimeout(r, 800))
  } catch (e) { return null }

  return await page.evaluate(() => {
    const getMeta = (prop) => {
      const el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`)
      return el ? el.getAttribute('content') : ''
    }
    const title = getMeta('og:title') || document.title || ''
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

    const bodyText = document.body.innerText || ''
    let author = 'kink'
    const authorMeta = (getMeta('article:author') || '').toLowerCase()
    if (authorMeta.includes('kroon') || authorMeta.includes('k.k.n') || /\bKroon\b/.test(bodyText)) author = 'kroon'
    else if (authorMeta.includes('kcid') || /\bKcid\b/.test(bodyText)) author = 'kcid'
    else if (authorMeta.includes('kai') || (/\bKai\b/.test(bodyText) && !/Kai Hansen|Kai Powell/i.test(bodyText))) author = 'kai'
    else if (authorMeta.includes('kunt') || /\bKunt\b/.test(bodyText)) author = 'kunt'
    else if (authorMeta.includes('kink') || /\bKink\b/.test(bodyText)) author = 'kink'

    const rceContainer = document.querySelector('[data-rce-version]')
    if (!rceContainer) return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: [] }

    const blocks = []
    let keyIdx = 0
    const walker = (el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : ''
      if (tag === 'p' || tag === 'h2' || tag === 'h3') {
        const text = el.innerText?.trim()
        if (!text || text.length < 2) return
        const style = (tag === 'h2' || tag === 'h3') ? tag : 'normal'
        const children = []
        el.childNodes.forEach(node => {
          if (node.nodeType === 3) { const t = node.textContent; if (t && t.trim()) children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks: [] }) }
          else if (node.nodeType === 1) {
            const ct = node.tagName?.toLowerCase(); const t = node.innerText || node.textContent || ''
            if (!t.trim()) return
            const marks = []
            if (ct === 'strong' || ct === 'b' || node.querySelector('strong,b')) marks.push('strong')
            if (ct === 'em' || ct === 'i' || node.querySelector('em,i')) marks.push('em')
            children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks })
          }
        })
        if (children.length === 0) children.push({ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] })
        blocks.push({ _type: 'block', _key: `b${keyIdx++}`, style, markDefs: [], children })
        return
      }
      if (tag === 'blockquote') { const text = el.innerText?.trim(); if (text && text.length > 10) blocks.push({ _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }] }); return }
      if (tag === 'img') {
        const src = el.getAttribute('src') || ''
        if (src && src.includes('wixstatic') && !src.includes('w_39,') && !src.includes('4b037027')) {
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          blocks.push({ _type: 'image', _key: `img${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: el.getAttribute('alt') || '' })
        }
        return
      }
      if (tag === 'iframe') { const src = el.getAttribute('src') || ''; const ytMatch = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/); if (ytMatch) blocks.push({ _type: 'youtube', _key: `yt${keyIdx++}`, url: `https://www.youtube.com/watch?v=${ytMatch[1]}` }); return }
      if (['script','style','nav','header','footer','button','svg'].includes(tag)) return
      el.childNodes?.forEach(child => { if (child.nodeType === 1) walker(child) })
    }
    walker(rceContainer)
    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks }
  })
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-puppet-4.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-4.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = [], found = []
  let success = 0

  const unique = [...new Set(slugs)]
  console.log(`🎵 EmoodziK Scraper Batch 4 — ${unique.length} slugs\n`)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--lang=vi-VN'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8' })

  for (let i = 0; i < unique.length; i++) {
    const slug = unique[i]
    process.stdout.write(`[${i+1}/${unique.length}] ${slug}...`)
    const data = await scrapePage(page, slug)
    if (!data || !data.title || data.blocks.length === 0) {
      failed.push(slug)
      console.log(` ❌`)
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
    const imageUrl = data.imageUrl ? data.imageUrl.split('/v1/')[0] + '~mv2.' + (data.imageUrl.includes('.png') ? 'png' : 'jpg') : ''
    const doc = {
      _type: 'post', _id: `post-${toSlug(cleanSlug)}`,
      title: data.title, slug: { _type: 'slug', current: cleanSlug },
      excerpt: data.excerpt.substring(0, 300), publishedAt: data.publishedAt,
      author: { _type: 'reference', _ref: `author-${data.author}` },
      category: { _type: 'reference', _ref: catId },
      ...(seriesId ? { series: { _type: 'reference', _ref: seriesId } } : {}),
      ...(imageUrl ? { mainImageUrl: imageUrl } : {}),
      body: data.blocks
    }
    stream.write(JSON.stringify(doc) + '\n')
    found.push(slug)
    success++
    const imgCount = data.blocks.filter(b => b._type === 'image').length
    const ytCount = data.blocks.filter(b => b._type === 'youtube').length
    console.log(` ✅ "${data.title.substring(0,35)}" — ${data.blocks.length} blocks, ${imgCount} img, ${ytCount} YT`)
    await new Promise(r => setTimeout(r, 500))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))
  console.log(`\n✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-puppet-4.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
