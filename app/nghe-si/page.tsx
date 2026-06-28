'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const ARTISTS_RAW = `2Pac\n50 Cent\nA Perfect Circle\nA Tribe Called Quest\nABBA\nAC/DC\nAerosmith\nAesop Rock\nAlice Cooper\nAlice In Chains\nAlicia Keys\nAlt-J\nAlter Bridge\nAnderson .Paak\nAnthrax\nAmy Winehouse\nArcade Fire\nArctic Monkeys\nAretha Franklin\nAvril Lavigne\nBabymetal\nB.B. King\nThe Beatles\nBee Gees\nBenny the Butcher\nBeyoncé\nBig L\nBillie Eilish\nBilly Joel\nBjörk\nThe Black Keys\nBlack Sabbath\nBob Dylan\nBon Jovi\nBruno Mars\nChuck Berry\nCeline Dion\nChildish Gambino\nChris Cornell\nClipse\nColdplay\nConway the Machine\nThe Cure\nCyndi Lauper\nD'Angelo\nDeath\nDeep Purple\nDef Leppard\nDenzel Curry\nDepeche Mode\nDiane Warren\nDio\nDire Straits\nDMX\nDoechii\nThe Doors\nDr. Dre\nDream Theater\nDua Lipa\nEarth, Wind & Fire\nEd Sheeran\nEminem\nEric Clapton\nErykah Badu\nFiona Apple\nFleetwood Mac\nFoo Fighters\nFrank Ocean\nFreddie Gibbs\nGamma Ray\nGenesis\nGojira\nGorillaz\nGreen Day\nGriselda\nGuns N' Roses\nHelloween\nIron Maiden\nJ. Cole\nJay-Z\nJimi Hendrix\nJoni Mitchell\nJudas Priest\nKai Hansen\nKanye West\nKendrick Lamar\nKid Cudi\nKing Crimson\nKISS\nKurt Cobain\nLady Gaga\nLana Del Rey\nLed Zeppelin\nLinkin Park\nLittle Simz\nLorde\nLoudness\nMac Miller\nMadonna\nMariah Carey\nMarilyn Manson\nMark Knopfler\nMetallica\nMF DOOM\nMichael Jackson\nMichael Kiske\nMobb Deep\nMötley Crüe\nMuse\nMy Chemical Romance\nNas\nNeil Young\nNine Inch Nails\nNirvana\nNorah Jones\nThe Notorious B.I.G.\nOasis\nOne OK Rock\nOutkast\nOzzy Osbourne\nPantera\nParamore\nPearl Jam\nPhoebe Bridgers\nPink Floyd\nThe Police\nPrince\nPulp\nPublic Enemy\nPusha T\nQueen\nQueens Of The Stone Age\nRadiohead\nRage Against The Machine\nRed Hot Chili Peppers\nR.E.M.\nRihanna\nThe Rolling Stones\nRoyce Da 5'9\"\nRun The Jewels\nRush\nSoundgarden\nSZA\nTaylor Swift\nTool\nTyler, the Creator\nU2\nThe Weeknd\nWeezer\nWestside Gunn\nThe White Stripes\nWhitney Houston\nThe Who\nWu-Tang Clan\nX Japan\nYngwie Malmsteen\nZZ Top`

function norm(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd')
}
function artistKey(name: string) {
  return norm(name.replace(/^the\s+/i, '').replace(/^["'.]+/, ''))
}
function artistLetter(name: string) {
  const c = artistKey(name).charAt(0).toUpperCase()
  return /[A-Z]/.test(c) ? c : '#'
}

const ALL_ARTISTS = ARTISTS_RAW.split('\n').map(s => s.trim()).filter(Boolean).sort((a, b) => artistKey(a).localeCompare(artistKey(b), 'en'))

export default function NgheSiPage() {
  const [query, setQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = norm(query.trim())
    return q ? ALL_ARTISTS.filter(a => norm(a).includes(q)) : ALL_ARTISTS
  }, [query])

  const byLetter = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const a of filtered) {
      const L = artistLetter(a)
      if (!map.has(L)) map.set(L, [])
      map.get(L)!.push(a)
    }
    return map as Map<string, string[]>
  }, [filtered])

  const letters = useMemo(() => {
    const ls = Array.from(byLetter.keys()).sort((a, b) => a.localeCompare(b, 'en'))
    const hi = ls.indexOf('#')
    if (hi > -1) { ls.splice(hi, 1); ls.push('#') }
    return ls
  }, [byLetter])

  const activeLetter = selectedLetter && byLetter.has(selectedLetter) ? selectedLetter : letters[0] ?? null
  const activeArtists = activeLetter ? byLetter.get(activeLetter) ?? [] : []

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <div className="split" style={{ alignItems: 'end' }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>Danh bạ</p>
          <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>Nghệ Sĩ</h1>
          <p style={{ margin: '12px 0 0', maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: 'var(--muted-fg)' }}>
            Tất cả nghệ sĩ được nhắc tới trên EmoodziK, xếp theo thứ tự bảng chữ cái.
          </p>
        </div>
        <div>
          <div style={{ position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text" value={query}
              onChange={e => { setQuery(e.target.value); setSelectedLetter(null) }}
              placeholder="Tìm tên nghệ sĩ..."
              style={{ height: 48, width: '100%', border: '1px solid var(--border)', background: 'var(--bg)', padding: '0 20px 0 44px', fontSize: 14, color: 'var(--fg)', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>{filtered.length} nghệ sĩ</p>
        </div>
      </div>

      {letters.length > 0 ? (
        <>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 2, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
            {letters.map(L => {
              const active = L === activeLetter
              return (
                <button key={L} onClick={() => setSelectedLetter(L)} style={{
                  display: 'flex', width: 42, height: 42, alignItems: 'center', justifyContent: 'center',
                  border: 'none', background: active ? '#ff2e2e' : 'transparent',
                  fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700,
                  color: active ? '#fff' : 'var(--muted-fg)', cursor: 'pointer',
                }}>
                  {L}
                </button>
              )
            })}
          </div>

          {activeLetter && (
            <div style={{ marginTop: 32 }}>
              <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6vw,44px)', fontWeight: 700, lineHeight: 1, color: 'var(--brand)' }}>
                {activeLetter}
              </h2>
              <ul className="art-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {activeArtists.map(a => (
                  <li key={a} style={{ padding: '0 0 12px' }}>
                    <Link href={`/tim-kiem?q=${encodeURIComponent(a)}`} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{a}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p style={{ marginTop: 48, textAlign: 'center', fontSize: 14, color: 'var(--muted-fg)' }}>
          Không tìm thấy nghệ sĩ nào cho &ldquo;{query}&rdquo;
        </p>
      )}
    </section>
  )
}
