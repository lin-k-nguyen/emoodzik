const puppeteer = require('puppeteer')
puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.emoodzik.com/post/royce-da-5-9', {waitUntil:'networkidle2',timeout:30000})
  await page.waitForSelector('[data-rce-version]', {timeout:10000}).catch(()=>{})
  await new Promise(r => setTimeout(r, 1500))
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let h = 0
      const t = setInterval(() => { window.scrollBy(0,300); h+=300; if(h>=document.body.scrollHeight){clearInterval(t);resolve()} }, 150)
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
      .sort((a,b) => {
        const na = parseInt(a.getAttribute('data-hook').replace('rcv-block','')) || 0
        const nb = parseInt(b.getAttribute('data-hook').replace('rcv-block','')) || 0
        return na - nb
      })
    const videoBlocks = all.filter(el => el.getAttribute('type') === 'video')
    return {
      total: all.length,
      videoCount: videoBlocks.length,
      videoHooks: videoBlocks.map(el => el.getAttribute('data-hook')),
      allTypes: all.map(el => el.getAttribute('type'))
    }
  })
  console.log('Total blocks:', result.total)
  console.log('Video blocks:', result.videoCount)
  console.log('Video hooks:', result.videoHooks)
  console.log('All types:', result.allTypes.join(', '))
  await browser.close()
})
