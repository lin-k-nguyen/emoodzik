const puppeteer = require('puppeteer')

puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  const ytUrls = []
  
  page.on('request', req => {
    const url = req.url()
    if (url.includes('youtube') || url.includes('youtu') || url.includes('ytimg')) {
      ytUrls.push(url.substring(0,150))
    }
  })
  
  await page.goto('https://www.emoodzik.com/post/lynyrd-skynyrd', {waitUntil:'networkidle2',timeout:30000})
  await new Promise(r => setTimeout(r, 2000))
  
  await page.evaluate(async () => {
    for (let i = 0; i < 50; i++) {
      window.scrollBy(0, 300)
      await new Promise(r => setTimeout(r, 300))
    }
  })
  await new Promise(r => setTimeout(r, 5000))
  
  console.log('YT network requests:', ytUrls.length ? ytUrls : 'NONE')
  
  const html = await page.content()
  const compData = html.match(/"videoId":"[^"]+"/g) || []
  const ytInJson = html.match(/youtube\.com[^"'\s]{0,80}/g) || []
  const ytShort = html.match(/youtu\.be[^"'\s]{0,50}/g) || []
  
  console.log('compData:', compData.slice(0,5))
  console.log('ytInJson:', ytInJson.slice(0,5))
  console.log('ytShort:', ytShort.slice(0,5))
  
  // Check all elements with data attributes containing video info
  const videoEls = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-src],[data-video],[data-url]'))
    return els.slice(0,10).map(el => ({
      tag: el.tagName,
      dataSrc: el.getAttribute('data-src'),
      dataVideo: el.getAttribute('data-video'),
      dataUrl: el.getAttribute('data-url'),
    }))
  })
  console.log('Video elements:', JSON.stringify(videoEls, null, 2))
  
  await browser.close()
})
