const puppeteer = require('puppeteer')
puppeteer.launch({headless:'new',args:['--no-sandbox']}).then(async browser => {
  const page = await browser.newPage()
  const tests = [
    // Wu-Tang
    'wu-tang-gza-odb','wu-tang-ghostface-raekwon','wu-tang-method-man-rza',
    // The Weeknd
    'the-weeknd-pt-1','the-weeknd-pt-2',
    // Michael Jackson
    'michael-jackson-pt-1','michael-jackson-pt-2',
    // Nas
    'nas-pt-1','nas-pt-2',
    // Rolling Stones
    'the-rolling-stones-pt-1','the-rolling-stones-pt-2',
    // Others with pt variations
    '2pac-tupac','2pac-pt-1','tupac','pac',
    '50-cent-pt-1','50-cent-get-rich',
    'abba-pt-1','abba-dancing-queen',
    'ac-dc-pt-1','acdc',
    'allman-brothers','allman-brothers-band-pt-1',
    'alt-j-pt-1','alt-j-relaxer',
    'alter-bridge-pt-1',
    'andy-james-pt-1',
    'arctic-monkeys-pt-1',
    'at-the-drive-in-pt-1',
    'babyface-pt-1',
    'babymetal-pt-1',
    'benny-the-butcher-pt-1',
    'bryan-adams-pt-1',
    'buffalo-springfield-pt-1',
    'the-byrds-pt-1',
    'ceelo-green-pt-1',
    'chad-hugo-pt-1','chad-hugo-neptunes',
    'clipse-pt-1',
    'cold-chisel-pt-1',
    'coldplay-pt-1',
    'conway-the-machine-pt-1',
    'creed-pt-1',
    'csny','crosby-stills-nash-young-pt-1',
    'cunninglynguists-pt-1',
    'the-cure-pt-1',
    'madonna-pt-1',
    'melle-mel-pt-1','grandmaster-flash-melle-mel',
    'michael-kiske-pt-1',
    'milli-vanilli-pt-1',
    'motorhead-pt-1','lemmy',
    'muse-pt-1',
    'neil-young-pt-1',
    'nile-rodgers-pt-1',
    'nili-brosh-pt-1',
    'nirvana-pt-1',
    'nita-strauss-pt-1',
    'the-notorious-big-pt-1','notorious-big','biggie',
    'nwa-pt-1',
    'oasis-pt-1',
    'obie-trice-pt-1',
    'ozzy-osbourne-pt-1',
    'parliament-pt-1',
    'pete-townshend-pt-1',
    'pharrell-williams-pt-1',
    'the-police-pt-1',
    'portishead-pt-1',
    'pulp-pt-1',
    'robert-fripp-pt-1',
    'sade-pt-1',
    'santana-pt-1',
    'seal-pt-1',
    'sia-pt-1',
    'slash-pt-1',
    'the-smashing-pumpkins-pt-1',
    'stephen-stills-pt-1',
    'stevie-ray-vaughan-pt-1',
    'the-stooges-pt-1','iggy-pop-the-stooges',
    'the-strokes-pt-1',
    'tech-n9ne-pt-1',
    'ted-nugent-pt-1',
    'thin-lizzy-pt-1',
    'tlc-pt-1',
    'toni-braxton-pt-1',
    'tony-macalpine-pt-1',
    'tricky-pt-1',
    'ufo-pt-1',
    'unisonic-pt-1',
    'velvet-revolver-pt-1',
    'vince-staples-pt-1',
    'westside-gunn-pt-1',
    'wu-tang-clan-pt-1',
    'x-japan-pt-1',
    'the-yardbirds-pt-1',
    // Behind the drums eps
    'behind-the-drums-ep-8','behind-the-drums-ep-9',
    'behind-the-drums-ep-10','behind-the-drums-ep-11',
    'behind-the-drums-ep-12','behind-the-drums-ep-13',
    'behind-the-drums-ep-14',
    // Free flow eps
    'free-flow-ep-6','free-flow-ep-7','free-flow-ep-8',
    'free-flow-ep-6-chu-nhac-rap','free-flow-ep-7-nhac-pop',
    'free-flow-ep-8-mot-hop-am','free-flow-ep-8-1-hop-am',
  ]
  
  for (const slug of tests) {
    await page.goto('https://www.emoodzik.com/post/' + slug, {waitUntil:'networkidle2',timeout:12000})
    const title = await page.evaluate(() => {
      const t = document.querySelector('meta[property="og:title"]')
      return t ? t.getAttribute('content') : ''
    })
    if (title && title.indexOf('EmoodziK | Music Blog') === -1 && title !== 'EmoodziK' && title !== 'Post | emoodzik') {
      console.log('FOUND:', slug, '->', title.substring(0,60))
    }
  }
  await browser.close()
  console.log('Done')
})
