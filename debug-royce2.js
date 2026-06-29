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
    
    // Get ALL rcv-blocks including beyond 30
    const allBlocks = Array.from(rce.querySelectorAll('[data-hook^="rcv-block"]'))
      .filter(el => {
        const h = el.getAttribute('data-hook') || ''
        return h !== 'rcv-block-first' && h !== 'rcv-block-last'
      })
      .sort((a,b) => {
        const na = parseInt(a.getAttribute('data-hook').replace('rcv-block','')) || 0
        const nb = parseInt(b.getAttribute('data-hook').replace('rcv-block','')) || 0
        return na - nb
      })

    const videoBlocks = allBlocks.filter(el => el.getAttribute('type') === 'video')
    const totalBlocks = allBlocks.length

    // Check where video players are in the DOM relative to rcv-blocks
    const allVideoPlayers = Array.from(rce.querySelectorAll('[data-hook="video-player"]'))
    const videoPlayerInfo = allVideoPlayers.map(p => {
      const btn = p.querySelector('button.react-player__preview')
      const style = btn?.getAttribute('style') || ''
      const m = style.match(/ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})\//)
      // Find nearest rcv-block parent
      let parent = p.parentElement
      let rcvHook = ''
      while (parent && parent !== rce) {
        if (parent.getAttribute && parent.getAttribute('data-hook')?.startsWith('rcv-block')) {
          rcvHook = parent.getAttribute('data-hook')
          break
        }
        parent = parent.parentElement
      }
      return { ytId: m ? m[1] : 'NO_ID', nearestRcvBlock: rcvHook }
    })

    return { 
      totalBlocks, 
      videoBlockCount: videoBlocks.length,
      videoBlocks: videoBlocks.map(el => el.getAttribute('data-hook')),
      videoPlayerInfo
    }
  })

  console.log('Total rcv-blocks:', result.totalBlocks)
  console.log('Video block count:', result.videoBlockCount)
  console.log('Video blocks:', result.videoBlocks)
  console.log('Video players with context:', JSON.stringify(result.videoPlayerInfo, null, 2))

  await browser.close()
})
