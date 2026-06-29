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
    
    // Find all elements in RCE with video-related attributes
    const allEls = Array.from(rce?.querySelectorAll('*') || [])
    
    const videoEls = allEls.filter(el => {
      const attrs = Array.from(el.attributes || []).map(a => a.name + '=' + a.value).join(' ')
      return attrs.includes('youtube') || attrs.includes('video') || attrs.includes('ytimg')
        || el.tagName.toLowerCase().includes('video')
        || el.className?.toString().includes('video')
        || el.className?.toString().includes('youtube')
    }).slice(0,10).map(el => ({
      tag: el.tagName,
      id: el.id,
      class: el.className?.toString().substring(0,60),
      attrs: Array.from(el.attributes || []).map(a => a.name + '=' + a.value.substring(0,50)).join(', ').substring(0,200)
    }))
    
    // Also check shadow DOM
    const wixVideo = rce?.querySelector('wix-video, [data-testid*="video"], [data-hook*="video"]')
    
    return { videoEls, wixVideo: wixVideo?.outerHTML?.substring(0,200) }
  })
  
  console.log('Video elements in RCE:', JSON.stringify(result.videoEls, null, 2))
  console.log('Wix video:', result.wixVideo)
  
  await browser.close()
})
