// EmoodziK Scraper Puppeteer — Batch 3 (corrected slugs)
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = [
  // Corrected slugs found via search
  "metallica",
  "led-zeppelin",
  "queen-pt-2",
  "guns-n-roses-pt-1",
  "guns-n-roses-pt-2", 
  "guns-n-roses-pt-3",
  "free-flow-ep-1-the-bridge",
  "pearl-jam",
  "chris-cornell",
  "top-5-death",
  "album-hay-2024",
  // Series eps with correct slugs
  "behind-the-drums-ep-1-ringo-starr",
  "behind-the-drums-ep-2-jeff-porcaro",
  "behind-the-drums-ep-3-taylor-hawkins",
  "behind-the-drums-ep-4-alex-van-halen",
  // Other likely correct slugs to try
  "eminem","eminem-pt-2","eminem-pt-3",
  "radiohead","queen","queen-pt-1",
  "led-zeppelin-pt-2",
  "iron-maiden","iron-maiden-pt-2",
  "rolling-stones","rolling-stones-pt-2",
  "michael-jackson","michael-jackson-pt-2",
  "the-who","the-who-pt-2",
  "the-weeknd","the-weeknd-pt-2",
  "stevie-wonder","stevie-wonder-pt-1",
  "jay-z","jay-z-pt-2",
  "kanye-west","kanye-west-pt-2",
  "kendrick-lamar","kendrick-lamar-pt-2",
  "nas","nas-pt-2",
  "jessie-ware-pt1",
  "marilyn-manson-pt-2",
  "bon-jovi","bon-jovi-pt-2",
  "guns-n-roses",
  "wu-tang-clan-gza-odb",
  "wu-tang-clan-ghostface-raekwon",
  "wu-tang-clan-method-man-rza",
  "wu-tang-gza-odb",
  "wu-tang-ghostface-raekwon",
  "wu-tang-method-man-rza",
  "free-flow-ep-2-ozzy","free-flow-ep-3-woodstock-1969",
  "free-flow-ep-4-woodstock-1994",
  "free-flow-ep-5-shape-of-my-heart",
  "free-flow-ep-6-rap-cover",
  "free-flow-ep-7-pop",
  "free-flow-ep-8-one-chord",
  "free-flow-ep-18-wrecking-crew",
  "free-flow-ep-19-one-man-band",
  "free-flow-ep-20-csny",
  "free-flow-ep-21-trip-hop",
  "behind-the-drums-ep-10",
  "behind-the-drums-ep-11",
  "behind-the-drums-ep-12",
  "behind-the-drums-ep-13",
  "behind-the-drums-ep-14",
  "2pac-me-against-the-world",
  "50-cent-get-rich",
  "allman-brothers",
  "alt-j-relaxer",
  "alter-bridge-myles-kennedy",
  "arctic-monkeys-am",
  "at-the-drive-in",
  "babyface-songwriter",
  "babymetal",
  "benny-the-butcher",
  "beyonce-pt-2",
  "bon-jovi-pt-1",
  "bryan-adams",
  "buffalo-springfield",
  "the-byrds",
  "ceelo-green",
  "chad-hugo-neptunes",
  "clipse-hell-hath",
  "cold-chisel",
  "coldplay",
  "conway-the-machine",
  "creed-scott-stapp",
  "crosby-stills-nash-young",
  "cunninglynguists",
  "the-cure-robert-smith",
  "linkin-park-chester",
  "loudness",
  "madonna-material-girl",
  "massive-attack-trip-hop",
  "melle-mel-grandmaster-flash",
  "milli-vanilli-farian",
  "motorhead-lemmy",
  "muse-bellamy",
  "nas-illmatic",
  "neil-young-crazy-horse",
  "nile-rodgers-chic",
  "nili-brosh",
  "the-notorious-big-biggie",
  "nwa-straight-outta",
  "oasis-britpop",
  "obie-trice",
  "ozzy-osbourne",
  "parliament-funkadelic",
  "pete-townshend-the-who",
  "pharrell-williams-neptunes",
  "the-police-sting",
  "portishead-dummy",
  "pulp-jarvis",
  "queen-freddie",
  "radiohead-ok-computer",
  "randy-rhoads",
  "raye",
  "rem-losing-my-religion",
  "robert-fripp-king-crimson",
  "rolling-stones-pt-1",
  "the-runaways-joan-jett",
  "sade",
  "santana-carlos",
  "seal-kiss-from-a-rose",
  "sia-chandelier",
  "slash-guns",
  "the-smashing-pumpkins-corgan",
  "stephen-stills-csny",
  "stevie-ray-vaughan-texas",
  "the-stooges-iggy",
  "the-strokes-is-this-it",
  "system-of-a-down-serj",
  "tears-for-fears",
  "tech-n9ne",
  "ted-nugent",
  "tenacious-d",
  "thin-lizzy-phil-lynott",
  "timbaland",
  "tlc-waterfalls",
  "todrick-hall",
  "tom-waits",
  "toni-braxton",
  "tony-macalpine",
  "tori-amos",
  "tracy-chapman",
  "tricky-bristol",
  "twenty-one-pilots",
  "tyler-the-creator-ofwgkta",
  "ufo-michael-schenker",
  "unisonic",
  "usher-confessions",
  "vampire-weekend",
  "van-halen-david-lee-roth",
  "velvet-revolver",
  "the-verve-bittersweet",
  "vince-staples",
  "the-weeknd-abel",
  "westside-gunn",
  "the-who-pete-townshend",
  "willow-smith",
  "wu-tang-clan",
  "x-japan",
  "the-yardbirds",
  "yelawolf",
  "yngwie-malmsteen",
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
  } catch (e) {
    return null
  }

  return await page.evaluate(() => {
    const getMeta = (prop) => {
      const el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`)
      return el ? el.getAttribute('content') : ''
    }

    const title = getMeta('og:title') || document.title || ''
    const excerpt = getMeta('og:description') || ''
    const imageUrl = getMeta('og:image') || ''
    const publishedAt = getMeta('article:published_time') || new Date().toISOString()

    // Check if 404
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
        blocks.push({ _type: 'block', _key: `b${keyIdx++}`, style, markDefs: [], children })
        return
      }
      if (tag === 'blockquote') {
        const text = el.innerText?.trim()
        if (text && text.length > 10) blocks.push({ _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }] })
        return
      }
      if (tag === 'img') {
        const src = el.getAttribute('src') || ''
        if (src && src.includes('wixstatic') && !src.includes('w_39,') && !src.includes('4b037027')) {
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          blocks.push({ _type: 'image', _key: `img${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: el.getAttribute('alt') || '' })
        }
        return
      }
      if (tag === 'iframe') {
        const src = el.getAttribute('src') || ''
        const ytMatch = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
        if (ytMatch) blocks.push({ _type: 'youtube', _key: `yt${keyIdx++}`, url: `https://www.youtube.com/watch?v=${ytMatch[1]}` })
        return
      }
      if (['script','style','nav','header','footer','button','svg'].includes(tag)) return
      el.childNodes?.forEach(child => { if (child.nodeType === 1) walker(child) })
    }

    walker(rceContainer)
    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks }
  })
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-puppet-3.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-3.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  const unique = [...new Set(slugs)]
  console.log(`🎵 EmoodziK Puppeteer Scraper Batch 3 — ${unique.length} slugs\n`)

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
      console.log(` ❌ ${data ? `title=${data.title?.substring(0,20)}, blocks=${data?.blocks?.length}` : '404'}`)
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
  console.log(`\nnpx sanity dataset import emoodzik-posts-puppet-3.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
