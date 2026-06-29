// EmoodziK Scraper Puppeteer — Batch 2 (remaining slugs)
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

// Slugs chưa scrape từ danh sách đầy đủ
const slugs = [
  "a-tribe-called-quest","alanis-morissette","alicia-keys","anderson-paak","arcade-fire",
  "aretha-franklin","the-beach-boys","big-daddy-kane","big-krit","big-l","bill-withers",
  "black-sabbath","blink-182","bob-dylan","bone-thugs-n-harmony","boyz-ii-men","brand-new",
  "bruno-mars","celine-dion","childish-gambino","christina-aguilera","the-clash","coolio",
  "lana-del-rey","lari-basilio","lauryn-hill","lil-wayne","limp-bizkit","lupe-fiasco",
  "lynyrd-skynyrd","mac-miller","marilyn-manson","marvin-gaye","michael-kiwanuka","miguel",
  "mike-shinoda","missy-elliott","nate-dogg","nick-cave","nick-johnston","nina-simone",
  "nine-inch-nails","a-perfect-circle","accept","aerosmith","alice-in-chains","allman-brothers-band",
  "alt-j","alter-bridge","amy-winehouse","arch-enemy","arctic-monkeys","asap-rocky",
  "at-the-drive-in","avenged-sevenfold","babyface","babymetal","bb-king","beastie-boys",
  "bee-gees","benny-the-butcher","beyonce","big-pun","billie-eilish","billy-joel",
  "bjork","the-black-keys","blondie","blue-oyster-cult","bob-marley","bon-jovi",
  "brand-new","bruce-dickinson","bryan-adams","buckethead","buffalo-springfield","the-byrds",
  "carpenters","ceelo-green","chad-hugo","chance-the-rapper","children-of-bodom","chris-cornell",
  "cinderella","clipse","cold-chisel","coldplay","common","conway-the-machine",
  "the-cranberries","cream","creed","crosby-stills-nash-young","crowded-house","cunninglynguists",
  "the-cure","lady-gaga","led-zeppelin","lenny-kravitz","les-paul","linkin-park",
  "lita-ford","ll-cool-j","loudness","madonna","marco-minnemann","marco-sfogli",
  "mariah-carey","mark-knopfler","massive-attack","mastodon","max-martin","megadeth",
  "melle-mel","metallica","mf-doom","michael-jackson","michael-kiske","michael-schenker",
  "milli-vanilli","mo","mos-def","motorhead","mr-big","muse","my-chemical-romance",
  "nas","neil-young","nile-rodgers","nili-brosh","norah-jones","the-notorious-big",
  "nuno-bettencourt","nwa","oasis","obie-trice","the-offspring","outkast","ozzy-osbourne",
  "pantera","parliament","pearl-jam","perfume-genius","pet-shop-boys","pete-townshend",
  "the-pharcyde","pharrell-williams","phil-collins","pixies","plini","the-police",
  "portishead","prince","pulp","public-enemy","pusha-t","queen","queens-of-the-stone-age",
  "queensryche","radiohead","rammstein","randy-rhoads","rapsody","raye",
  "red-hot-chili-peppers","rem","rihanna","robbie-williams","robert-fripp","the-rolling-stones",
  "the-roots","rory-gallagher","run-the-jewels","the-runaways","sade","santana",
  "savage-garden","savatage","schoolboy-q","scorpions","the-script","seal",
  "sex-pistols","the-shadows","sheryl-crow","sia","simon-garfunkel","skid-row",
  "slash","slayer","sly-the-family-stone","the-smashing-pumpkins","snoop-dogg","spoon",
  "steely-dan","stephen-stills","steve-lukather","steve-morse","steven-tyler","stevie-ray-vaughan",
  "the-stone-roses","stone-temple-pilots","the-stooges","the-strokes","suede",
  "system-of-a-down","talib-kweli","talking-heads","taylor-swift","tears-for-fears",
  "tech-n9ne","ted-nugent","tenacious-d","thin-lizzy","timbaland","tlc",
  "todrick-hall","tom-waits","toni-braxton","tony-macalpine","tori-amos","tracy-chapman",
  "tricky","twenty-one-pilots","tyler-the-creator","ufo","unisonic","usher",
  "vampire-weekend","van-halen","velvet-revolver","the-verve","vince-staples",
  "the-weeknd","westside-gunn","the-who","willow","wu-tang-clan","x-japan",
  "the-yardbirds","yelawolf","yngwie-malmsteen",
  "behind-the-drums-ep-1-ringo-starr","behind-the-drums-ep-2-jeff-porcaro",
  "behind-the-drums-ep-3-taylor-hawkins","behind-the-drums-ep-4-alex-van-halen",
  "behind-the-drums-ep-8-vinnie-colaiuta","behind-the-drums-ep-9-tommy-aldridge",
  "behind-the-drums-ep-10-bernard-purdie","behind-the-drums-ep-11-jim-keltner",
  "behind-the-drums-ep-12-travis-barker","behind-the-drums-ep-13-mike-mangini",
  "behind-the-drums-ep-14-gregg-bissonette",
  "free-flow-ep-1","free-flow-ep-2","free-flow-ep-3","free-flow-ep-4",
  "free-flow-ep-5","free-flow-ep-6","free-flow-ep-7","free-flow-ep-8",
  "free-flow-ep-18","free-flow-ep-19","free-flow-ep-20","free-flow-ep-21",
  "album-hay-2024","2pac","50-cent","abba","ac-dc",
  "andy-james","andy-timmons","anthrax","big-sean",
  "blur","bob-marley","brand-new","d12","daft-punk",
  "danger-mouse","daniel-caesar","dave-grohl","david-bowie","david-crosby",
  "deep-purple","denzel-curry","depeche-mode","derek-sherinian","destiny-s-child",
  "dio","dire-straits","dmx","donna-summer","the-doors","dr-dre",
  "dragonforce","drake","dream-theater","dua-lipa","eagles","earl-sweatshirt",
  "earth-wind-fire","ed-sheeran","el-p","electric-light-orchestra",
  "elton-john","eminem","eric-clapton","eric-johnson","europe","evanescence",
  "faith-no-more","fiona-apple","first-aid-kit","florence-the-machine",
  "foo-fighters","fort-minor","frank-ocean","franz-ferdinand","fugazi","the-fugees",
  "funkadelic","the-game","gary-moore","genesis","george-michael",
  "gnarls-barkley","gojira","gorillaz","graham-nash","grandmaster-caz",
  "green-day","grimes","guns-n-roses","hanson","halestorm",
  "harry-nilsson","hayley-williams","the-hollies","hozier","iggy-pop",
  "ike-turner","iron-maiden","j-cole","j-ivy","j-jid",
  "jane-s-addiction","janelle-monae","janis-joplin","jason-becker",
  "jay-z","jazmine-sullivan","jeff-beck","jeff-buckley","jefferson-airplane",
  "jennifer-batten","jethro-tull","joan-baez","joe-satriani","joe-stump",
  "john-5","john-legend","joni-mitchell","jorja-smith","judas-priest",
  "justin-derrico","justin-timberlake","kai-hansen","kansas","kanye-west",
  "kate-bush","keane","keith-moon","kendrick-lamar","kiko-loureiro",
  "killer-mike","king-crimson","the-kinks","kiss","kool-moe-dee","korn",
  "kurt-cobain","kylie-minogue","queen","r-e-m","rihanna",
  "robert-fripp","the-rolling-stones","the-roots"
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
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await page.waitForSelector('[data-rce-version]', { timeout: 10000 }).catch(() => {})
    await new Promise(r => setTimeout(r, 1000))
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

    let categorySlug = 'quen-quen'
    document.querySelectorAll('a[href*="/categories/"]').forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
      else if (href.includes('ch') && href.includes('gi')) categorySlug = 'chém-gió'
    })

    const bodyText = document.body.innerText || ''
    let author = 'kink'
    if (/\bKroon\b/.test(bodyText)) author = 'kroon'
    else if (/\bKcid\b/.test(bodyText)) author = 'kcid'
    else if (/\bKai\b/.test(bodyText) && !/Kai Hansen|Kai Powell/i.test(bodyText)) author = 'kai'
    else if (/\bKunt\b/.test(bodyText)) author = 'kunt'
    else if (/\bKink\b/.test(bodyText)) author = 'kink'

    const authorMeta = (getMeta('article:author') || '').toLowerCase()
    if (authorMeta.includes('kroon') || authorMeta.includes('k.k.n')) author = 'kroon'
    else if (authorMeta.includes('kcid')) author = 'kcid'
    else if (authorMeta.includes('kai')) author = 'kai'
    else if (authorMeta.includes('kunt')) author = 'kunt'
    else if (authorMeta.includes('kink')) author = 'kink'

    const rceContainer = document.querySelector('[data-rce-version]')
    if (!rceContainer) return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks: [] }

    const blocks = []
    let keyIdx = 0

    const walker = (el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : ''

      if (tag === 'p' || tag === 'h2' || tag === 'h3') {
        const text = el.innerText?.trim()
        if (!text || text.length < 2) return
        let style = 'normal'
        if (tag === 'h2' || tag === 'h3') style = tag
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
            if (ct === 'strong' || ct === 'b') marks.push('strong')
            if (ct === 'em' || ct === 'i') marks.push('em')
            if (node.querySelector('strong,b')) marks.push('strong')
            if (node.querySelector('em,i')) marks.push('em')
            children.push({ _type: 'span', _key: `c${keyIdx++}`, text: t, marks })
          }
        })
        if (children.length === 0) children.push({ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] })
        blocks.push({ _type: 'block', _key: `b${keyIdx++}`, style, markDefs: [], children })
        return
      }

      if (tag === 'blockquote') {
        const text = el.innerText?.trim()
        if (text && text.length > 10) {
          blocks.push({ _type: 'block', _key: `bq${keyIdx++}`, style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: `c${keyIdx++}`, text, marks: [] }] })
        }
        return
      }

      if (tag === 'img') {
        const src = el.getAttribute('src') || el.getAttribute('data-src') || ''
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

      if (['script', 'style', 'nav', 'header', 'footer', 'button', 'svg'].includes(tag)) return
      el.childNodes?.forEach(child => { if (child.nodeType === 1) walker(child) })
    }

    walker(rceContainer)
    return { title, excerpt, imageUrl, publishedAt, author, categorySlug, blocks }
  })
}

async function main() {
  const outputFile = path.join(process.cwd(), 'emoodzik-posts-puppet-2.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-2.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  // Remove duplicates
  const unique = [...new Set(slugs)]
  console.log(`🎵 EmoodziK Puppeteer Scraper Batch 2 — ${unique.length} slugs\n`)

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=vi-VN'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
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
    if (data.categorySlug.includes('ngóng') || data.categorySlug.includes('ngong')) catId = 'category-la-la'
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
    console.log(` ✅ "${data.title.substring(0,35)}" — ${data.blocks.length} blocks, ${imgCount} ảnh, ${ytCount} YT`)
    await new Promise(r => setTimeout(r, 500))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))

  console.log(`\n✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-puppet-2.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters`)
}

main().catch(console.error)
