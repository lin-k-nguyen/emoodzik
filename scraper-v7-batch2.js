// EmoodziK Scraper v7 — Batch 2 (171 remaining slugs)
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = ["a-perfect-circle","a-tribe-called-quest","accept","aerosmith","alanis-morissette","album-hay-2024","alice-in-chains","alicia-keys","amy-winehouse","anderson-paak","arcade-fire","arch-enemy","aretha-franklin","asap-rocky","avenged-sevenfold","bb-king","beastie-boys","bee-gees","behind-the-drums-ep-1-ringo-starr","behind-the-drums-ep-2-jeff-porcaro","behind-the-drums-ep-3-taylor-hawkins","behind-the-drums-ep-4-alex-van-halen","big-daddy-kane","big-krit","big-l","big-pun","bill-withers","billie-eilish","billy-joel","bjork","black-sabbath","blondie","blue-oyster-cult","bob-dylan","bob-marley","bone-thugs-n-harmony","boyz-ii-men","brand-new","bruce-dickinson","bruno-mars","buckethead","carpenters","celine-dion","chance-the-rapper","childish-gambino","children-of-bodom","chris-cornell","christina-aguilera","cinderella","common","coolio","cream","crowded-house","free-flow-ep-1-the-bridge","free-flow-ep-18-wrecking-crew","free-flow-ep-19-one-man-band","free-flow-ep-2-ozzy","free-flow-ep-3-woodstock-1969","free-flow-ep-4-woodstock-1994","free-flow-ep-5-shape-of-my-heart","guns-n-roses-pt-1","guns-n-roses-pt-2","guns-n-roses-pt-3","iron-maiden-pt-2","jay-z-pt-2","lady-gaga","lana-del-rey","lari-basilio","lauryn-hill","led-zeppelin","lenny-kravitz","les-paul","lil-wayne","limp-bizkit","lita-ford","ll-cool-j","lupe-fiasco","mac-miller","marco-minnemann","marco-sfogli","mariah-carey","marilyn-manson","mark-knopfler","marvin-gaye","mastodon","max-martin","megadeth","metallica","mf-doom","michael-kiwanuka","michael-schenker","miguel","mike-shinoda","missy-elliott","mos-def","mr-big","my-chemical-romance","nate-dogg","nick-cave","nick-johnston","nina-simone","nine-inch-nails","norah-jones","nuno-bettencourt","outkast","pantera","pearl-jam","perfume-genius","pet-shop-boys","phil-collins","pixies","plini","prince","public-enemy","pusha-t","queen-pt-1","queen-pt-2","queens-of-the-stone-age","queensryche","rammstein","rapsody","red-hot-chili-peppers","rihanna","robbie-williams","rory-gallagher","run-the-jewels","savage-garden","savatage","schoolboy-q","scorpions","sex-pistols","sheryl-crow","simon-garfunkel","skid-row","slayer","sly-the-family-stone","snoop-dogg","spoon","steely-dan","steve-lukather","steve-morse","steven-tyler","stone-temple-pilots","suede","talib-kweli","talking-heads","taylor-swift","tears-for-fears","tenacious-d","the-beach-boys","the-black-keys","the-clash","the-cranberries","the-cure-robert-smith","the-offspring","the-pharcyde","the-roots","the-script","the-shadows","the-stone-roses","the-who-pt-2","timbaland","todrick-hall","tom-waits","top-5-death","tori-amos","tracy-chapman","twenty-one-pilots","vampire-weekend","yelawolf","yngwie-malmsteen"]

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

    let categorySlug = 'quen-quen'
    document.querySelectorAll('a[href*="/categories/"]').forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
    })

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

    // Collect YouTube IDs from video players in RCE
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

    // Collect text blocks
    const textBlocks = []
    let keyIdx = 0
    const walker = (el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : ''
      if (tag === 'p' || tag === 'h2' || tag === 'h3') {
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
        if (text && text.length > 10) textBlocks.push({ _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }] })
        return
      }
      if (['script','style','nav','header','footer','button','svg'].includes(tag)) return
      el.childNodes?.forEach(child => { if (child.nodeType === 1) walker(child) })
    }
    walker(rce)

    // Reconstruct blocks using rcv-block order
    const rcvBlocks = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => { const h = el.getAttribute('data-hook') || ''; return h !== 'rcv-block-first' && h !== 'rcv-block-last' })
      .sort((a, b) => (parseInt(a.getAttribute('data-hook').replace('rcv-block','')) || 0) - (parseInt(b.getAttribute('data-hook').replace('rcv-block','')) || 0))

    const finalBlocks = []
    let textIdx = 0, videoIdx = 0, imgIdx = 0

    rcvBlocks.forEach(rcvBlock => {
      const type = rcvBlock.getAttribute('type') || ''
      if (type === 'paragraph' || type === 'heading1' || type === 'heading2' || type === 'heading3') {
        if (textIdx < textBlocks.length) finalBlocks.push(textBlocks[textIdx++])
      } else if (type === 'video') {
        if (videoIdx < ytQueue.length) finalBlocks.push({ _type: 'youtube', _key: `yt${keyIdx++}`, url: `https://www.youtube.com/watch?v=${ytQueue[videoIdx++]}` })
      } else if (type === 'image') {
        if (imgIdx < allImgs.length) {
          const img = allImgs[imgIdx++]
          const src = img.src || img.getAttribute('data-src') || ''
          const cleanSrc = src.split('/v1/')[0] + '~mv2.' + (src.includes('.png') ? 'png' : 'jpg')
          finalBlocks.push({ _type: 'image', _key: `img${keyIdx++}`, asset: { _type: 'reference', url: cleanSrc }, caption: img.getAttribute('alt') || '' })
        }
      }
    })

    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: finalBlocks.filter(Boolean) }
  }, NAV_IDS)
}

async function main() {
  console.log('Fetching Sanity artists...')
  const sanityArtists = await fetchSanityArtists()
  console.log(`Loaded ${sanityArtists.length} artists\n`)

  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v7-batch2.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-v7-batch2.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  console.log(`🎵 EmoodziK Scraper v7 Batch 2 — ${slugs.length} slugs\n`)

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
  console.log(`\nnpx sanity dataset import emoodzik-posts-v7-batch2.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
