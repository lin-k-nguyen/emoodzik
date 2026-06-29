const puppeteer = require('puppeteer')
puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  const tests = ['chic','_chic','hole','_hole','mgmt','_mgmt','pink','_pink','ratm','_ratm','rush','_rush','sza','__sza','tool','_tool','toto','_toto','u2','___u2','wasp','_wasp']
  for (const slug of tests) {
    await page.goto('https://www.emoodzik.com/post/' + slug, {waitUntil:'networkidle2',timeout:15000})
    const title = await page.evaluate(() => {
      const t = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
      return t || ''
    })
    if (title && title.indexOf('EmoodziK | Music Blog') === -1 && title !== 'EmoodziK') {
      console.log(slug, '->', title.substring(0,40))
    }
  }
  await browser.close()
})
