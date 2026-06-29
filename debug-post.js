const puppeteer = require('puppeteer')

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0
      const distance = 300
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 150)
    })
  })
  await new Promise(r => setTimeout(r, 2000))
}

puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  
  console.log('Loading page...')
  await page.goto('https://www.emoodzik.com/post/lynyrd-skynyrd', {waitUntil:'networkidle2',timeout:30000})
  await page.waitForSelector('[data-rce-version]', {timeout:10000}).catch(() => {})
  await new Promise(r => setTimeout(r, 2000))
  
  console.log('Scrolling...')
  await autoScroll(page)
  
  const data = await page.evaluate(() => {
    const getMeta = (prop) => {
      const el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`)
      return el ? el.getAttribute('content') : ''
    }

    // Meta info
    const meta = {
      title: getMeta('og:title'),
      date: getMeta('article:published_time'),
      author: getMeta('article:author'),
      image: getMeta('og:image'),
      excerpt: getMeta('og:description'),
    }

    // Category links
    const catLinks = Array.from(document.querySelectorAll('a[href*="/categories/"]')).map(a => a.href)

    // All images after scroll
    const navIds = ['4b037027','e316f544','8d689333','83804c07']
    const imgs = Array.from(document.querySelectorAll('img')).map(i => ({
      src: i.src || i.getAttribute('data-src') || '',
      width: i.naturalWidth,
      alt: i.alt,
    })).filter(i => i.src.includes('wixstatic') && !navIds.some(id => i.src.includes(id)))

    // All iframes
    const iframes = Array.from(document.querySelectorAll('iframe')).map(i => i.src).filter(s => s.length > 10)

    // YouTube links in page
    const ytLinks = Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('youtube.com') || h.includes('youtu.be'))

    // RCE container structure - get first 3000 chars of innerHTML
    const rce = document.querySelector('[data-rce-version]')
    const rceHTML = rce ? rce.innerHTML.substring(0, 5000) : 'NOT FOUND'

    // Artists tagged
    const artistLinks = Array.from(document.querySelectorAll('a[href*="/nghesi/"], a[href*="/nghe-si/"], a[href*="/artists/"]')).map(a => a.innerText.trim())

    return { meta, catLinks, imgs, iframes, ytLinks, rceHTML, artistLinks }
  })

  console.log('\n=== META ===')
  console.log(JSON.stringify(data.meta, null, 2))
  
  console.log('\n=== CATEGORY LINKS ===')
  console.log(data.catLinks)
  
  console.log('\n=== IMAGES ===')
  data.imgs.forEach((img, i) => console.log(`${i}: w=${img.width} src=${img.src.substring(0,100)}`))
  
  console.log('\n=== IFRAMES ===')
  console.log(data.iframes)
  
  console.log('\n=== YOUTUBE LINKS ===')
  console.log(data.ytLinks)
  
  console.log('\n=== ARTISTS ===')
  console.log(data.artistLinks)

  console.log('\n=== RCE HTML (first 3000 chars) ===')
  console.log(data.rceHTML)

  await browser.close()
})
