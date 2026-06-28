// EmoodziK Wix Scraper v2 — Full list
// Chạy: node scraper-v2.js
// Output: emoodzik-posts.ndjson

const https = require('https')
const fs = require('fs')
const path = require('path')

const slugs = ["dolly-parton","chuck-berry","royce-da-5-9","phoebe-bridgers","album-hay-2025","freeflow-ep-22-king-gizzard","behind-the-drums-ep-15-gene-hoglan","griselda","one-ok-rock","diane-warren","x-japan-vs-babymetal","doechii","gamma-ray","krs-one","howlin-wolf","debbie-gibson","tommy-aldridge","olivia-rodrigo","roxette","joey-badass","_mgmt","maximum-the-hormone","_chic","slick-rick","fleetwood-mac","the-smiths","damn-yankees","lorde","jimi-hendrix","captain-beefheart","big-sean","paul-mccartney","kali-uchis","steve-stevens","cyndi-lauper","nelly","d-angelo","steve-vai","tina-turner","isaiah-rashad","alice-cooper-band","good-charlotte","garbage","james-brown","redman","billy-idol","duran-duran","jessie-ware-pt2","miley-cyrus","jpegmafia","_toto","sonic-youth","yeah-yeah-yeahs","carole-king","heart","_wasp","__sza","maxwell","weezer","_hole","scarface","manowar","bon-jovi-best","little-simz","maroon-5","quiet-riot","weird-al-yankovic","aristocrats","xzibit","harry-styles","nightwish","sufjan-stevens","motley-crue","freddie-gibbs","placebo","fka-twigs","vinnie-colaiuta","muddy-waters","chuck-schuldiner","the-killers","travis-scott","sum-41","the-mars-volta","finneas","soundgarden","mobb-deep","journey","father-john-misty-j-tillman","_tool","def-leppard","aesop-rock","stevie-wonder-pt-2","helloween","erykah-badu","five-finger-death-punch","creedence-clearwater-revival","_pink","kool-g-rap","robert-johnson","kid-cudi","avril-lavigne","take-that","sting","zz-top","james-blake","_rush","kasabian","___u2","jackson-5","paramore-hayley-williams","ramones","noname","the-velvet-underground-v%C3%A0-c%C3%A1i-r%E1%BB%91n-c%E1%BB%A7a-v%C5%A9-tr%E1%BB%A5-lou-reed","blink-182","busta-rhymes","george-harrison","avantasia","adele","rakim","radiohead-emoodzik","_ratm","elliott-smith","halsey","jamiroquai","slipknot","free-flow-ep-17-woodstock-1999","free-flow-ep-16-southern-rock","free-flow-ep-15","free-flow-ep-14","free-flow-ep-13-nu-metal","free-flow-ep-12-vince-staples","free-flow-ep-11","free-flow-ep-10","free-flow-ep-9","behind-the-drums-ep-7-anika-nilles","behind-the-drums-ep-6-simon-phillips","behind-the-drums-ep-5-josh-freese","50-year-hip-hop-pt-3","50-year-hip-hop-pt-2","50-year-hip-hop-pt-1","boney-milli-vanilli-frank-farian","album-hay-2022","album-hay-2023","jessie-ware","white-stripes-qu%C3%A1-c%E1%BA%A7u-k%E1%BB%B3-hay-th%E1%BA%ADt-t%E1%BB%91i-gi%E1%BA%A3n","beyonce-%C4%91%E1%BB%ABng-ch%E1%BB%8Dc-t%E1%BB%A9c-ch%C3%BAa-s%C6%A1n-l%C3%A2m-pt-1","whitney-houston","album-hay-2024","2pac","50-cent","a-perfect-circle","a-tribe-called-quest","abba","ac-dc","accept","aerosmith","alanis-morissette","alice-cooper","alice-in-chains","alicia-keys","allman-brothers-band","alt-j","alter-bridge","myles-kennedy","mark-tremonti","anderson-paak","andy-james","andy-timmons","anthrax","amy-winehouse","arcade-fire","arch-enemy","arctic-monkeys","aretha-franklin","asap-rocky","at-the-drive-in","avenged-sevenfold","babyface","babymetal","bb-king","the-beach-boys","beastie-boys","the-beatles","ringo-starr","bee-gees","benny-the-butcher","beyonce","big-daddy-kane","big-krit","big-l","big-pun","bill-withers","billie-eilish","billy-joel","bjork","the-black-keys","black-sabbath","blondie","blue-oyster-cult","blur","bob","bob-dylan","bob-marley","bon-jovi","bone-thugs-n-harmony","boyz-ii-men","brand-new","bruce-dickinson","bruno-mars","bryan-adams","buckethead","buffalo-springfield","the-byrds","carpenters","ceelo-green","celine-dion","chad-hugo","chance-the-rapper","childish-gambino","children-of-bodom","chris-cornell","christina-aguilera","cinderella","the-clash","clipse","cold-chisel","coldplay","common","conway-the-machine","coolio","the-cranberries","cream","creed","crosby-stills-nash-young","crowded-house","cunninglynguists","the-cure","lady-gaga","lana-del-rey","lari-basilio","lauryn-hill","led-zeppelin","lenny-kravitz","les-paul","lil-wayne","limp-bizkit","linkin-park","lita-ford","ll-cool-j","loudness","lupe-fiasco","lynyrd-skynyrd","mac-miller","madonna","marco-minnemann","marco-sfogli","mariah-carey","marilyn-manson","mark-knopfler","marvin-gaye","massive-attack","mastodon","max-martin","megadeth","melle-mel","metallica","mf-doom","michael-jackson","michael-kiske","michael-kiwanuka","michael-schenker","miguel","mike-shinoda","milli-vanilli","missy-elliott","mo","mos-def","motorhead","mr-big","muse","my-chemical-romance","nas","nate-dogg","neil-young","nick-cave","nick-johnston","nile-rodgers","nili-brosh","nina-simone","nine-inch-nails","nirvana","nita-strauss","norah-jones","the-notorious-big","nuno-bettencourt","nwa","oasis","obie-trice","the-offspring","outkast","ozzy-osbourne","pantera","parliament","pearl-jam","perfume-genius","pet-shop-boys","pete-townshend","the-pharcyde","pharrell-williams","phil-collins","pixies","plini","the-police","portishead","prince","pulp","public-enemy","pusha-t","queen","queens-of-the-stone-age","queensryche","radiohead","rammstein","randy-rhoads","rapsody","raye","red-hot-chili-peppers","rem","rihanna","robbie-williams","robert-fripp","the-rolling-stones","the-roots","rory-gallagher","run-the-jewels","the-runaways","sade","santana","savage-garden","savatage","schoolboy-q","scorpions","the-script","seal","sex-pistols","the-shadows","sheryl-crow","sia","simon-garfunkel","skid-row","slash","slayer","sly-the-family-stone","the-smashing-pumpkins","snoop-dogg","spoon","steely-dan","stephen-stills","steve-lukather","steve-morse","steven-tyler","stevie-ray-vaughan","stevie-wonder","the-stone-roses","stone-temple-pilots","the-stooges","the-strokes","suede","system-of-a-down","talib-kweli","talking-heads","taylor-swift","tears-for-fears","tech-n9ne","ted-nugent","tenacious-d","thin-lizzy","timbaland","tlc","todrick-hall","tom-waits","toni-braxton","tony-macalpine","tori-amos","tracy-chapman","tricky","twenty-one-pilots","tyler-the-creator","ufo","unisonic","usher","vampire-weekend","van-halen","velvet-revolver","the-velvet-underground","the-verve","vince-staples","the-weeknd","westside-gunn","the-white-stripes","the-who","willow","wu-tang-clan","x-japan","the-yardbirds","yelawolf","yngwie-malmsteen","behind-the-drums-ep-1-ringo-starr","behind-the-drums-ep-2-jeff-porcaro","behind-the-drums-ep-3-taylor-hawkins","behind-the-drums-ep-4-alex-van-halen","behind-the-drums-ep-8-vinnie-colaiuta","behind-the-drums-ep-9-tommy-aldridge","behind-the-drums-ep-10-bernard-purdie","behind-the-drums-ep-11-jim-keltner","behind-the-drums-ep-12-travis-barker","behind-the-drums-ep-13-mike-mangini","behind-the-drums-ep-14-gregg-bissonette","free-flow-ep-1","free-flow-ep-2","free-flow-ep-3","free-flow-ep-4","free-flow-ep-5","free-flow-ep-6","free-flow-ep-7","free-flow-ep-8","free-flow-ep-18","free-flow-ep-19","free-flow-ep-20","free-flow-ep-21"]

const catMap = {
  'ch%C3%A9m-gi%C3%B3': 'category-quen-quen',
  'nghe-ng%C3%B3ng': 'category-la-la',
  'ngh%E1%BB%8Dch-ngu': 'category-an-bum',
  '%C4%83n-view': 'category-an-view',
  'ch\u00e9m-gi\u00f3': 'category-quen-quen',
  'nghe-ng\u00f3ng': 'category-la-la',
  'ngh\u1ecbch-ngu': 'category-an-bum',
  '\u0103n-view': 'category-an-view',
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
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve({ slug, html: '', status: res.statusCode, redirect: res.headers.location })
      }
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve({ slug, html: data, status: res.statusCode }))
    })
    req.on('error', () => resolve({ slug, html: '', status: 0 }))
    req.setTimeout(20000, () => { req.destroy(); resolve({ slug, html: '', status: 408 }) })
  })
}

function parsePost(slug, html) {
  if (!html || html.length < 1000) return null

  const titleMatch = html.match(/meta-og:title:\s*(.+)/) || html.match(/og:title.*?content="([^"]+)"/)
  const title = titleMatch ? titleMatch[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').trim() : ''
  if (!title || title.includes('EmoodziK | Music Blog')) return null

  const excerptMatch = html.match(/meta-og:description:\s*(.+)/)
  const excerpt = excerptMatch ? excerptMatch[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').trim().substring(0,300) : ''

  const imageMatch = html.match(/meta-og:image:\s*(https:\/\/[^\s]+)/)
  const imageUrl = imageMatch ? imageMatch[1].trim().split('/fill/')[0] + '/fill/w_1200,h_675,al_c,q_85/' + imageMatch[1].split('/').pop() : ''

  const dateMatch = html.match(/meta-article:published_time:\s*([^\s\n]+)/)
  const publishedAt = dateMatch ? dateMatch[1].trim() : new Date().toISOString()

  // Author
  let authorId = 'author-kink'
  if (html.match(/\*\*\*Kroon\*\*\*/i) || html.match(/— Kroon/i) || html.match(/K\.K\.N\./)) authorId = 'author-kroon'
  else if (html.match(/\*\*\*Kcid\*\*\*/i) || html.match(/— Kcid/i)) authorId = 'author-kcid'
  else if (html.match(/\*\*\*Kai\*\*\*/i) || html.match(/— Kai/i)) authorId = 'author-kai'
  else if (html.match(/\*\*\*Kunt\*\*\*/i) || html.match(/— Kunt/i)) authorId = 'author-kunt'
  else if (html.match(/\*\*\*Kink\*\*\*/i) || html.match(/— Kink/i)) authorId = 'author-kink'

  // Category
  let categoryId = 'category-quen-quen'
  for (const [key, val] of Object.entries(catMap)) {
    if (html.includes(key)) { categoryId = val; break }
  }

  // Series
  let seriesId = null
  const ls = slug.toLowerCase()
  if (ls.includes('free-flow') || ls.includes('freeflow')) seriesId = 'series-tan-man'
  else if (ls.includes('behind-the-drums')) seriesId = 'series-an-sau-gian-trong'

  // Body — extract text lines after "min read"
  const startIdx = html.indexOf('min read')
  const endIdx = html.indexOf('Recent Posts')
  const section = startIdx > 0 ? html.substring(startIdx, endIdx > startIdx ? endIdx : html.length) : ''

  const paras = []
  for (const line of section.split('\n')) {
    let t = line
      .replace(/\*\*\*(.*?)\*\*\*/g,'$1').replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1')
      .replace(/\[(.*?)\]\([^)]+\)/g,'$1').replace(/!\[.*?\]\([^)]+\)/g,'')
      .replace(/#{1,6}\s/g,'').replace(/---/g,'').replace(/\*\*\*/g,'')
      .replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ')
      .replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim()
    if (t.length > 50 && !t.startsWith('http') && !t.includes('wixstatic') &&
        !t.includes('canonical') && !t.startsWith('meta-') &&
        !['Music Blog','Nghệ Sĩ','Bọn Này','TẤT TẦN TẬT','Facebook','Instagram',
          'Pinterest','Log In','Every Thursday','Search','top of page',
          'bottom of page','© 2018'].some(x => t.includes(x))) {
      paras.push(t)
    }
  }

  if (paras.length === 0) return null

  const cleanSlug = decodeURIComponent(slug).replace(/^_+/,'')
  return {
    _type: 'post', _id: `post-${toSlug(cleanSlug)}`,
    title, slug: { _type: 'slug', current: cleanSlug },
    excerpt, publishedAt,
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
  const outputFile = path.join(process.cwd(), 'emoodzik-posts.ndjson')
  const failedFile = path.join(process.cwd(), 'emoodzik-failed.txt')
  const stream = fs.createWriteStream(outputFile)
  const failed = []
  let success = 0

  console.log(`🎵 EmoodziK Scraper v2 — ${slugs.length} slugs`)
  console.log(`📁 Output: ${outputFile}\n`)

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}...`)

    const { html, status } = await fetchPage(slug)

    if (status === 200 && html) {
      const post = parsePost(slug, html)
      if (post) {
        stream.write(JSON.stringify(post) + '\n')
        success++
        console.log(` ✅ "${post.title.substring(0,45)}"`)
      } else {
        failed.push(slug)
        console.log(` ⚠️  No content (404 or parse fail)`)
      }
    } else {
      failed.push(slug)
      console.log(` ❌ HTTP ${status}`)
    }

    await new Promise(r => setTimeout(r, 800))
  }

  stream.end()
  fs.writeFileSync(failedFile, failed.join('\n'))

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅ ${success} bài viết thành công`)
  console.log(`❌ ${failed.length} thất bại (xem emoodzik-failed.txt)`)
  console.log(`\n📦 Import vào Sanity:`)
  console.log(`npx sanity dataset import emoodzik-posts.ndjson production --project-id 22wk7h4m --dataset production`)
}

main().catch(console.error)
