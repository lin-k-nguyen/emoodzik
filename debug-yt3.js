const puppeteer = require('puppeteer')

puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.emoodzik.com/post/lynyrd-skynyrd', {waitUntil:'networkidle2',timeout:30000})
  await new Promise(r => setTimeout(r, 2000))
  await page.evaluate(async () => { 
    for(let i=0;i<50;i++){window.scrollBy(0,300);await new Promise(r=>setTimeout(r,200))} 
  })
  await new Promise(r => setTimeout(r, 4000))
  
  const result = await page.evaluate(() => {
    const rce = document.querySelector('[data-rce-version]')
    
    // Get all video players and extract YouTube ID from background-image
    const videoPlayers = Array.from(rce?.querySelectorAll('[data-hook="video-player"]') || [])
    
    const ytData = videoPlayers.map(player => {
      const btn = player.querySelector('button.react-player__preview')
      const style = btn?.getAttribute('style') || ''
      // Extract YouTube ID from thumbnail URL in background-image
      const ytMatch = style.match(/ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\//)
      const bgImage = style.match(/background-image:\s*url\("([^"]+)"\)/)?.[1]
      return { ytId: ytMatch?.[1], bgImage: bgImage?.substring(0,100) }
    })
    
    // Also check rcv-block elements
    const rcvBlocks = Array.from(rce?.querySelectorAll('[data-hook^="rcv-block"]') || [])
    const rcvData = rcvBlocks.map(el => ({
      hook: el.getAttribute('data-hook'),
      type: el.getAttribute('type'),
      outerHTML: el.outerHTML.substring(0,300)
    }))
    
    return { ytData, rcvData }
  })
  
  console.log('YouTube from video players:', JSON.stringify(result.ytData, null, 2))
  console.log('RCV blocks:', JSON.stringify(result.rcvData, null, 2))
  
  await browser.close()
})
