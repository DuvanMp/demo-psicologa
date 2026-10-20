import { useEffect, useMemo, useState } from 'react'
import { site } from './config.js'
import { content } from './content.js'
import { img } from './images.js'

const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
const locales = { es: 'es-CO', en: 'en-US' }

// Idioma: el que la persona eligió antes; si no, el del dispositivo.
function useLang() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'es' || saved === 'en') return saved
    } catch {}
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
  })
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${site.name} · ${site.title[lang]}`
  }, [lang])
  const choose = (l) => {
    setLang(l)
    try { localStorage.setItem('lang', l) } catch {}
  }
  return [lang, choose]
}

export default function App() {
  const [lang, setLang] = useLang()
  const t = content[lang]
  const [area, setArea] = useState('')
  const goBook = (id) => {
    if (id) setArea(id)
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} lang={lang} onBook={() => goBook()} />
        <Feelings t={t} />
        <About t={t} lang={lang} />
        <Areas t={t} onBook={goBook} />
        <Online t={t} lang={lang} />
        <Steps t={t} />
        <Quote t={t} />
        <Booking t={t} lang={lang} area={area} setArea={setArea} />
        <Faq t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <footer className="footer">
        <p className="crisis">{site.crisis[lang]}</p>
        <div className="foot-row">
          <span>© {new Date().getFullYear()} {site.name} · {t.demo}</span>
          <a href="https://duvan-martinez.vercel.app/" target="_blank" rel="noreferrer">{t.credit}</a>
        </div>
      </footer>
      <a className="fab" href={waLink(t.hello)} target="_blank" rel="noreferrer" aria-label={t.writeMeWa}><WhatsIcon /></a>
    </>
  )
}

function Header({ t, lang, setLang }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`header ${solid || open ? 'solid' : ''}`}>
      <div className="wrap header-inner">
        <a href="#" className="brand">
          <img src="/favicon.svg" alt="" width="34" height="34" />
          <span>{site.name}</span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Principal">
          {t.nav.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="#agendar" className="btn btn-small" onClick={() => setOpen(false)}>{t.book}</a>
        </nav>
        <div className="header-tools">
          <div className="lang" role="group" aria-label="Idioma / Language">
            {['es', 'en'].map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button className="menu" aria-expanded={open} aria-label={t.menu} onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </div>
    </header>
  )
}

function Hero({ t, lang, onBook }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % img.hero.length), 7000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        {img.hero.map((h, n) => <img key={h.src} src={h.src} alt="" className={n === i ? 'on' : ''} style={{ '--mobile-pos': h.mobile }} />)}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-content">
        <p className="hero-kicker">{site.title[lang]} · {t.hero.kicker}</p>
        <h1>{t.hero.title}</h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="actions">
          <button className="btn btn-light" onClick={onBook}>{t.hero.cta}</button>
          <a className="btn btn-outline-light" href={waLink(t.hello)} target="_blank" rel="noreferrer"><WhatsIcon /> {t.writeMe}</a>
        </div>
        <p className="hero-note">{t.hero.note} {site.prices.first[lang]}</p>
      </div>
    </section>
  )
}

function Feelings({ t }) {
  return (
    <section className="feelings">
      <div className="wrap">
        <h2>{t.feelingsTitle}</h2>
        <ul>
          {t.feelings.map((f) => <li key={f}>“{f}”</li>)}
        </ul>
        <p>{t.feelingsNote}</p>
      </div>
    </section>
  )
}

function About({ t, lang }) {
  return (
    <section id="sobre-mi" className="section">
      <div className="wrap about">
        <figure className="about-photo">
          <img src={img.portrait} alt={site.name} loading="lazy" />
        </figure>
        <div>
          <h2>{t.aboutHi} {site.firstName}</h2>
          {t.about.body.map((p) => <p key={p} className="body-lg">{p}</p>)}
          <ul className="checks">
            {t.about.credentials.map((c) => <li key={c}>{c}</li>)}
            <li>{site.license[lang]}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Areas({ t, onBook }) {
  return (
    <section id="como-te-ayudo" className="section section-soft">
      <div className="wrap">
        <div className="section-head">
          <h2>{t.areasTitle}</h2>
          <p>{t.areasLead}</p>
        </div>
        <ul className="area-grid">
          {t.areas.map((a) => (
            <li key={a.id}>
              <button className="area-card" onClick={() => onBook(a.id)} aria-label={`${t.bookSession}: ${a.name}`}>
                <img src={img.areas[a.id]} alt="" loading="lazy" />
                <div className="area-body">
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <span className="link">{t.bookSession}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Online({ t, lang }) {
  const p = site.prices
  const o = t.online
  return (
    <section id="terapia-virtual" className="section">
      <div className="wrap online">
        <img src={img.online} alt={o.alt} loading="lazy" />
        <div>
          <h2>{o.title}</h2>
          <p className="body-lg">{o.body}</p>
          {(p.individual || p.couple) && (
            <dl className="prices">
              {p.individual && <><dt>{o.individual}</dt><dd>{p.individual[lang]}</dd></>}
              {p.couple && <><dt>{o.couple}</dt><dd>{p.couple[lang]}</dd></>}
              <dt>{o.first}</dt><dd>{o.free}</dd>
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}

function Steps({ t }) {
  return (
    <section className="section section-soft">
      <div className="wrap">
        <h2 className="center">{t.stepsTitle}</h2>
        <ol className="steps">
          {t.steps.map(([s, d], n) => (
            <li key={s}>
              <span className="step-n" aria-hidden="true">{n + 1}</span>
              <h3>{s}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Quote({ t }) {
  return (
    <section className="quote">
      <img src={img.room} alt="" loading="lazy" />
      <div className="quote-shade" />
      <blockquote className="wrap">{t.quote}</blockquote>
    </section>
  )
}

function Booking({ t, lang, area, setArea }) {
  const b = t.booking
  const loc = locales[lang]
  const [day, setDay] = useState(null)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [first, setFirst] = useState(true)
  const [error, setError] = useState('')

  const days = useMemo(() => {
    const out = []
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    for (let n = 1; out.length < 12; n++) {
      const x = new Date(d)
      x.setDate(d.getDate() + n)
      out.push(x)
    }
    return out
  }, [])
  const slots = day ? (day.getDay() === 6 ? site.slots.saturday : site.slots.weekday) : site.slots.weekday
  const a = t.areas.find((x) => x.id === area)
  const dayLabel = day?.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })

  const confirm = () => {
    if (!day || !time || !name.trim() || !phone.trim()) return setError(b.error)
    setError('')
    const msg = b.msg({ name: site.firstName, first, topic: a?.name, day: dayLabel, time, client: name, phone })
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <section id="agendar" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>{b.title}</h2>
          <p>{b.lead}</p>
        </div>
        <div className="booking">
          <div className="booking-steps">
            <fieldset>
              <legend>{b.firstQ}</legend>
              <div className="chips">
                <button type="button" aria-pressed={first} onClick={() => setFirst(true)}>{b.firstYes}</button>
                <button type="button" aria-pressed={!first} onClick={() => setFirst(false)}>{b.firstNo}</button>
              </div>
            </fieldset>
            <fieldset>
              <legend>{b.topic}</legend>
              <div className="chips">
                {t.areas.map((x) => (
                  <button key={x.id} type="button" aria-pressed={area === x.id} onClick={() => setArea(area === x.id ? '' : x.id)}>{x.name}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>{b.day}</legend>
              <div className="days">
                {days.map((d) => {
                  const sunday = d.getDay() === 0
                  const active = day && d.getTime() === day.getTime()
                  return (
                    <button key={d.toISOString()} type="button" disabled={sunday} aria-pressed={!!active} onClick={() => { setDay(d); setTime('') }}>
                      <span>{d.toLocaleDateString(loc, { weekday: 'short' })}</span>
                      <strong>{d.getDate()}</strong>
                      <span>{d.toLocaleDateString(loc, { month: 'short' })}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <fieldset disabled={!day}>
              <legend>{b.time}</legend>
              <div className="chips">
                {slots.map((s) => <button key={s} type="button" aria-pressed={time === s} onClick={() => setTime(s)}>{s}</button>)}
              </div>
            </fieldset>
            <fieldset>
              <legend>{b.you}</legend>
              <div className="row">
                <label className="field"><span>{b.name}</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" /></label>
                <label className="field"><span>{b.phone}</span><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" /></label>
              </div>
            </fieldset>
          </div>
          <aside className="card summary" aria-live="polite">
            <div className="summary-who">
              <img src={img.portrait} alt="" />
              <div><strong>{site.name}</strong><span>{site.title[lang]}</span></div>
            </div>
            <dl>
              <dt>{b.type}</dt><dd>{first ? b.typeFirst : b.typeSession}</dd>
              <dt>{b.day}</dt><dd className="cap">{dayLabel || '—'}</dd>
              <dt>{b.time}</dt><dd>{time || '—'}</dd>
              <dt>{b.mode}</dt><dd>{b.modeValue}</dd>
            </dl>
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn btn-wa" type="button" onClick={confirm}><WhatsIcon /> {b.confirm}</button>
            <p className="hint">{site.crisis[lang]}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Faq({ t }) {
  return (
    <section id="preguntas" className="section section-soft">
      <div className="wrap narrow">
        <h2>{t.faqTitle}</h2>
        <div className="faq">
          {t.faq.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ t, lang }) {
  return (
    <section className="section contact">
      <div className="wrap contact-grid">
        <div>
          <h2>{t.contactTitle}</h2>
          <p className="body-lg">{site.city[lang]}</p>
        </div>
        <div>
          <h3>{t.hoursTitle}</h3>
          {site.hours[lang].map((h) => <p key={h}>{h}</p>)}
        </div>
        <div>
          <h3>{t.contact}</h3>
          <p className="contact-link"><WhatsIcon /><a href={waLink(t.hello)} target="_blank" rel="noreferrer">{site.phoneDisplay}</a></p>
          <p className="contact-link"><MailIcon /><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="contact-link"><CameraIcon /><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
        </div>
      </div>
    </section>
  )
}

function WhatsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.8l1.4-2h4.6l1.4 2h1.8A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  )
}
