const puppeteer = require('puppeteer')

puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.emoodzik.com/post/lynyrd-skynyrd', {waitUntil:'networkidle2',timeout:30000})
  await new Promise(r => setTimeout(r, 3000))
  
  const data = await page.evaluate(() => {
    // Check hashtags
    const hashtags = Array.from(document.querySelectorAll('a[href*="hashtag"], [class*="hashtag"], [data-hook*="hashtag"]'))
      .map(el => el.innerText?.trim()).filter(t => t)
    
    // Check tags
    const tags = Array.from(document.querySelectorAll('[class*="tag"], [data-hook*="tag"]'))
      .map(el => el.innerText?.trim()).filter(t => t)
    
    // Check for nghesi/artist links  
    const artistLinks = Array.from(document.querySelectorAll('a'))
      .filter(a => {
        const href = a.href || ''
        const text = a.innerText?.trim() || ''
        return href.includes('nghe-si') || href.includes('nghesi') || href.includes('artist')
      })
      .map(a => ({ text: a.innerText?.trim(), href: a.href }))

    // Check for any labels/chips near the title
    const labels = Array.from(document.querySelectorAll('[class*="label"], [class*="chip"], [class*="category"]'))
      .map(el => el.innerText?.trim()).filter(t => t && t.length < 50)

    // Get full page text to find "Nghệ sĩ" section
    const bodyText = document.body.innerText || ''
    const ngheSiIdx = bodyText.indexOf('Nghệ sĩ')
    const ngheSiSection = ngheSiIdx > 0 ? bodyText.substring(ngheSiIdx, ngheSiIdx + 200) : 'NOT FOUND'
    
    return { hashtags, tags, artistLinks: artistLinks.slice(0,10), labels: labels.slice(0,10), ngheSiSection }
  })
  
  console.log('Hashtags:', data.hashtags)
  console.log('Tags:', data.tags)
  console.log('Artist links:', JSON.stringify(data.artistLinks, null, 2))
  console.log('Labels:', data.labels)
  console.log('NgheSi section:', data.ngheSiSection)
  
  await browser.close()
})
