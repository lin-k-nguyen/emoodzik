const puppeteer = require('puppeteer')

puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.emoodzik.com/post/dolly-parton', {waitUntil:'networkidle2',timeout:30000})
  await new Promise(r => setTimeout(r, 2000))
  
  const data = await page.evaluate(() => {
    // All meta tags
    const metas = Array.from(document.querySelectorAll('meta')).map(m => ({
      prop: m.getAttribute('property') || m.getAttribute('name'),
      content: m.getAttribute('content')?.substring(0,80)
    })).filter(m => m.prop && m.content)

    // Look for date in page text
    const bodyText = document.body.innerText
    const dateMatches = bodyText.match(/\d{1,2}\s+tháng\s+\d{1,2}\s+\d{4}|\d{4}-\d{2}-\d{2}/g)
    
    // Check JSON-LD
    const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .map(s => s.textContent?.substring(0,300))
    
    // Check for date in any element
    const timeEls = Array.from(document.querySelectorAll('time')).map(t => ({
      datetime: t.getAttribute('datetime'),
      text: t.innerText?.trim()
    }))
    
    return { metas: metas.filter(m => m.prop?.includes('time') || m.prop?.includes('date') || m.prop?.includes('publish')), dateMatches, jsonLd, timeEls }
  })
  
  console.log('Date-related metas:', JSON.stringify(data.metas, null, 2))
  console.log('Date matches in text:', data.dateMatches?.slice(0,5))
  console.log('JSON-LD:', data.jsonLd?.slice(0,2))
  console.log('Time elements:', data.timeEls)
  
  await browser.close()
})
