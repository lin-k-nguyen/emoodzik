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
    
    // Get rcv-blocks in order with their types
    const blocks = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => {
        const h = el.getAttribute('data-hook') || ''
        return h !== 'rcv-block-first' && h !== 'rcv-block-last'
      })
      .sort((a,b) => {
        const na = parseInt(a.getAttribute('data-hook').replace('rcv-block','')) || 0
        const nb = parseInt(b.getAttribute('data-hook').replace('rcv-block','')) || 0
        return na - nb
      })
      .map(el => ({
        hook: el.getAttribute('data-hook'),
        type: el.getAttribute('type')
      }))

    // Get YouTube IDs from video players in order
    const players = Array.from(rce.querySelectorAll('[data-hook="video-player"]'))
    const ytIds = players.map(p => {
      const btn = p.querySelector('button.react-player__preview')
      const style = btn?.getAttribute('style') || ''
      const m = style.match(/ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\//)
      return m ? m[1] : 'NO_ID'
    })

    return { blocks: blocks.slice(0,30), ytIds }
  })

  console.log('RCV blocks:')
  result.blocks.forEach(b => console.log(` ${b.hook}: ${b.type}`))
  console.log('\nYT IDs in order:', result.ytIds)

  await browser.close()
})
