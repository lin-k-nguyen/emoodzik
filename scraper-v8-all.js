// EmoodziK Scraper v8 — TẤT CẢ 319 bài, fix author từ cuối bài
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const slugs = ["50-year-hip-hop-pt-1","50-year-hip-hop-pt-2","50-year-hip-hop-pt-3","a-perfect-circle","a-tribe-called-quest","accept","adele","aerosmith","aesop-rock","alanis-morissette","album-hay-2022","album-hay-2023","album-hay-2024","album-hay-2025","alice-cooper-band","alice-in-chains","alicia-keys","amy-winehouse","anderson-paak","arcade-fire","arch-enemy","aretha-franklin","aristocrats","asap-rocky","avantasia","avenged-sevenfold","avril-lavigne","bb-king","beastie-boys","bee-gees","behind-the-drums-ep-1-ringo-starr","behind-the-drums-ep-15-gene-hoglan","behind-the-drums-ep-2-jeff-porcaro","behind-the-drums-ep-3-taylor-hawkins","behind-the-drums-ep-4-alex-van-halen","behind-the-drums-ep-5-josh-freese","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-7-anika-nilles","beyonce-đừng-chọc-tức-chúa-sơn-lâm-pt-1","big-daddy-kane","big-krit","big-l","big-pun","big-sean","bill-withers","billie-eilish","billy-idol","billy-joel","bjork","black-sabbath","blink-182","blondie","blue-oyster-cult","bob-dylan","bob-marley","bon-jovi-best","bone-thugs-n-harmony","boney-milli-vanilli-frank-farian","boyz-ii-men","brand-new","bruce-dickinson","bruno-mars","buckethead","busta-rhymes","captain-beefheart","carole-king","carpenters","celine-dion","chance-the-rapper","chic","childish-gambino","children-of-bodom","chris-cornell","christina-aguilera","chuck-berry","chuck-schuldiner","cinderella","common","coolio","cream","creedence-clearwater-revival","crowded-house","cyndi-lauper","d-angelo","damn-yankees","debbie-gibson","def-leppard","diane-warren","doechii","dolly-parton","duran-duran","elliott-smith","erykah-badu","father-john-misty-j-tillman","finneas","five-finger-death-punch","fka-twigs","fleetwood-mac","freddie-gibbs","free-flow-ep-1-the-bridge","free-flow-ep-10","free-flow-ep-11","free-flow-ep-12-vince-staples","free-flow-ep-13-nu-metal","free-flow-ep-14","free-flow-ep-15","free-flow-ep-16-southern-rock","free-flow-ep-17-woodstock-1999","free-flow-ep-18-wrecking-crew","free-flow-ep-19-one-man-band","free-flow-ep-2-ozzy","free-flow-ep-3-woodstock-1969","free-flow-ep-4-woodstock-1994","free-flow-ep-5-shape-of-my-heart","free-flow-ep-9","freeflow-ep-22-king-gizzard","gamma-ray","garbage","george-harrison","good-charlotte","griselda","guns-n-roses-pt-1","guns-n-roses-pt-2","guns-n-roses-pt-3","halsey","harry-styles","heart","helloween","hole","howlin-wolf","iron-maiden-pt-2","isaiah-rashad","jackson-5","james-blake","james-brown","jamiroquai","jay-z-pt-2","jessie-ware","jessie-ware-pt2","jimi-hendrix","joey-badass","journey","jpegmafia","kali-uchis","kasabian","kid-cudi","kool-g-rap","krs-one","lady-gaga","lana-del-rey","lari-basilio","lauryn-hill","led-zeppelin","lenny-kravitz","les-paul","lil-wayne","limp-bizkit","lita-ford","little-simz","ll-cool-j","lorde","lupe-fiasco","lynyrd-skynyrd","mac-miller","manowar","marco-minnemann","marco-sfogli","mariah-carey","marilyn-manson","mark-knopfler","maroon-5","marvin-gaye","mastodon","max-martin","maximum-the-hormone","maxwell","megadeth","metallica","mf-doom","mgmt","michael-kiwanuka","michael-schenker","miguel","mike-shinoda","miley-cyrus","missy-elliott","mobb-deep","mos-def","motley-crue","mr-big","muddy-waters","my-chemical-romance","nate-dogg","nelly","nick-cave","nick-johnston","nightwish","nina-simone","nine-inch-nails","noname","norah-jones","nuno-bettencourt","olivia-rodrigo","one-ok-rock","outkast","pantera","paramore-hayley-williams","paul-mccartney","pearl-jam","perfume-genius","pet-shop-boys","phil-collins","phoebe-bridgers","pink","pixies","placebo","plini","prince","public-enemy","pusha-t","queen-pt-1","queen-pt-2","queens-of-the-stone-age","queensryche","quiet-riot","radiohead-emoodzik","rakim","rammstein","ramones","rapsody","ratm","red-hot-chili-peppers","redman","rihanna","robbie-williams","robert-johnson","rory-gallagher","roxette","royce-da-5-9","run-the-jewels","rush","savage-garden","savatage","scarface","schoolboy-q","scorpions","sex-pistols","sheryl-crow","simon-garfunkel","skid-row","slayer","slick-rick","slipknot","sly-the-family-stone","snoop-dogg","sonic-youth","soundgarden","spoon","steely-dan","steve-lukather","steve-morse","steve-stevens","steve-vai","steven-tyler","stevie-wonder-pt-2","sting","stone-temple-pilots","suede","sufjan-stevens","sum-41","sza","take-that","talib-kweli","talking-heads","taylor-swift","tears-for-fears","tenacious-d","the-beach-boys","the-black-keys","the-clash","the-cranberries","the-cure-robert-smith","the-killers","the-mars-volta","the-offspring","the-pharcyde","the-roots","the-script","the-shadows","the-smiths","the-stone-roses","the-velvet-underground-và-cái-rốn-của-vũ-trụ-lou-reed","the-who-pt-2","timbaland","tina-turner","todrick-hall","tom-waits","tommy-aldridge","tool","top-5-death","tori-amos","toto","tracy-chapman","travis-scott","twenty-one-pilots","u2","vampire-weekend","vinnie-colaiuta","wasp","weezer","weird-al-yankovic","white-stripes-quá-cầu-kỳ-hay-thật-tối-giản","whitney-houston","x-japan-vs-babymetal","xzibit","yeah-yeah-yeahs","yelawolf","yngwie-malmsteen","zz-top"]

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
    .replace(/^free-flow-ep-\d+[-–]?.*$/,'').replace(/^behind-the-drums-ep-\d+[-–]?.*$/,'')
    .replace(/^freeflow-ep-\d+[-–]?.*$/,'').replace(/^album-hay-\d+$/,'')
    .replace(/^50-year-hip-hop.*$/,'').replace(/^top-\d+.*$/,'')
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

    // Category
    let categorySlug = 'quen-quen'
    document.querySelectorAll('a[href*="/categories/"]').forEach(l => {
      const href = l.getAttribute('href') || ''
      if (href.includes('nghe-ng')) categorySlug = 'nghe-ngóng'
      else if (href.includes('ngh') && href.includes('ngu')) categorySlug = 'nghịch-ngu'
      else if (href.includes('n-view')) categorySlug = 'ăn-view'
    })

    const rce = document.querySelector('[data-rce-version]')
    if (!rce) return { title, excerpt, imageUrl, publishedAt, author: 'kink', categorySlug, blocks: [] }

    // Author: detect from last paragraphs of RCE
    const allParas = Array.from(rce.querySelectorAll('p'))
    const lastParas = allParas.slice(-5).map(p => p.innerText?.trim()).filter(t => t)
    let author = 'kink'
    for (const line of lastParas.reverse()) {
      if (/^kroon$/i.test(line)) { author = 'kroon'; break }
      if (/^kcid$/i.test(line)) { author = 'kcid'; break }
      if (/^kai$/i.test(line)) { author = 'kai'; break }
      if (/^kunt$/i.test(line)) { author = 'kunt'; break }
      if (/^kink$/i.test(line) || /kink$/i.test(line)) { author = 'kink'; break }
      // Handle "Hẹn gặp lại!\n\nKink" style
      if (/kroon/i.test(line) && line.length < 30) { author = 'kroon'; break }
      if (/kcid/i.test(line) && line.length < 30) { author = 'kcid'; break }
      if (/\bkai\b/i.test(line) && line.length < 30) { author = 'kai'; break }
      if (/kunt/i.test(line) && line.length < 30) { author = 'kunt'; break }
    }

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

  const outputFile = path.join(process.cwd(), 'emoodzik-posts-v8-all.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed-v8.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  console.log(`🎵 EmoodziK Scraper v8 ALL — ${slugs.length} slugs\n`)

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
    console.log(` ✅ "${data.title.substring(0,28)}" | ${imgCount}img ${ytCount}YT | ${data.author} | ${data.publishedAt.substring(0,10)}`)
    await new Promise(r => setTimeout(r, 800))
  }

  await browser.close()
  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))
  console.log(`\n✅ ${success} thành công, ❌ ${failed.length} thất bại`)
  console.log(`\nnpx sanity dataset import emoodzik-posts-v8-all.ndjson production --project-id 22wk7h4m --dataset production --allow-replacement-characters --replace`)
}

main().catch(console.error)
