const puppeteer = require('puppeteer')
puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.emoodzik.com/post/royce-da-5-9', {waitUntil:'networkidle2',timeout:30000})
  await page.waitForSelector('[data-rce-version]', {timeout:10000}).catch(()=>{})
  await new Promise(r => setTimeout(r, 1500))
  
  // Scroll like scraper does
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

  const result = await page.evaluate(() => {
    const rce = document.querySelector('[data-rce-version]')
    const all = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => {
        const h = el.getAttribute('data-hook')
        return h !== 'rcv-block-first' && h !== 'rcv-block-last'
      })
    const videoBlocks = all.filter(el => el.getAttribute('type') === 'video')
    const videoPlayers = Array.from(rce.querySelectorAll('[data-hook="video-player"]'))
    return {
      totalRcvBlocks: all.length,
      videoBlocks: videoBlocks.length,
      videoPlayers: videoPlayers.length,
    }
  })
  console.log(result)
  await browser.close()
})
