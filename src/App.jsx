import { useEffect, useMemo, useState } from 'react'
import { site } from './config.js'
import { areas, feelings, steps, about, faq, quote } from './content.js'
import { img } from './images.js'

const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
const hello = 'Hola, quisiera información sobre la terapia.'

export default function App() {
  const [area, setArea] = useState('')
  const goBook = (id) => {
    if (id) setArea(id)
    document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <Header />
      <main>
        <Hero onBook={() => goBook()} />
        <Feelings />
        <About />
        <Areas onBook={goBook} />
        <Online />
        <Steps />
        <Quote />
        <Booking area={area} setArea={setArea} />
        <Faq />
        <Contact />
      </main>
      <footer className="footer">
        <p className="crisis">{site.crisis}</p>
        <div className="foot-row">
          <span>© {new Date().getFullYear()} {site.name} · Sitio de demostración, datos y fotos de ejemplo (Unsplash)</span>
          <a href="https://duvan-martinez.vercel.app/" target="_blank" rel="noreferrer">Sitio web por DM Software</a>
        </div>
      </footer>
      <a className="fab" href={waLink(hello)} target="_blank" rel="noreferrer" aria-label="Escríbeme por WhatsApp"><WhatsIcon /></a>
    </>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['#sobre-mi', 'Sobre mí'], ['#como-te-ayudo', 'Cómo te ayudo'], ['#terapia-virtual', 'Terapia virtual'], ['#preguntas', 'Preguntas']]
  return (
    <header className={`header ${solid || open ? 'solid' : ''}`}>
      <div className="wrap header-inner">
        <a href="#" className="brand">
          <img src="/favicon.svg" alt="" width="34" height="34" />
          <span>{site.name}</span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Principal">
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a href="#agendar" className="btn btn-small" onClick={() => setOpen(false)}>Agendar</a>
        </nav>
        <button className="menu" aria-expanded={open} aria-label="Menú" onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  )
}

function Hero({ onBook }) {
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
        <p className="hero-kicker">{site.title} · Terapia virtual</p>
        <h1>Un lugar seguro para hablar de lo que sientes.</h1>
        <p className="lead">Psicoterapia por videollamada para adultos, parejas y adolescentes. Con calma, sin juicios y a tu ritmo, estés donde estés.</p>
        <div className="actions">
          <button className="btn btn-light" onClick={onBook}>Agendar primera sesión</button>
          <a className="btn btn-outline-light" href={waLink(hello)} target="_blank" rel="noreferrer"><WhatsIcon /> Escríbeme</a>
        </div>
        <p className="hero-note">Primera llamada de {site.prices.first}</p>
      </div>
    </section>
  )
}

function Feelings() {
  return (
    <section className="feelings">
      <div className="wrap">
        <h2>¿Te suena familiar?</h2>
        <ul>
          {feelings.map((f) => <li key={f}>“{f}”</li>)}
        </ul>
        <p>Si alguna de estas frases te describe, no estás solo. Hablarlo es el primer paso.</p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="wrap about">
        <figure className="about-photo">
          <img src={img.portrait} alt={site.name} loading="lazy" />
        </figure>
        <div>
          <h2>Hola, soy {site.firstName}</h2>
          {about.body.map((p) => <p key={p} className="body-lg">{p}</p>)}
          <ul className="checks">
            {about.credentials.map((c) => <li key={c}>{c}</li>)}
            <li>{site.license}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Areas({ onBook }) {
  return (
    <section id="como-te-ayudo" className="section section-soft">
      <div className="wrap">
        <div className="section-head">
          <h2>Cómo te puedo ayudar</h2>
          <p>Cada proceso es distinto. Estos son algunos de los motivos por los que más me consultan.</p>
        </div>
        <ul className="area-grid">
          {areas.map((a) => (
            <li key={a.id}>
              <button className="area-card" onClick={() => onBook(a.id)} aria-label={`Agendar: ${a.name}`}>
                <img src={img.areas[a.id]} alt="" loading="lazy" />
                <div className="area-body">
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <span className="link">Agendar sesión</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Online() {
  const p = site.prices
  return (
    <section id="terapia-virtual" className="section">
      <div className="wrap online">
        <img src={img.online} alt="Persona en una sesión de terapia por videollamada desde su casa" loading="lazy" />
        <div>
          <h2>Terapia desde tu casa</h2>
          <p className="body-lg">Sin tráfico ni salas de espera. Te conectas desde un lugar privado donde te sientas cómodo, por Google Meet o Zoom. También atiendo a colombianos que viven en el exterior.</p>
          {(p.individual || p.couple) && (
            <dl className="prices">
              {p.individual && <><dt>Sesión individual · 50 min</dt><dd>{p.individual}</dd></>}
              {p.couple && <><dt>Sesión de pareja · 60 min</dt><dd>{p.couple}</dd></>}
              <dt>Llamada inicial · 15 min</dt><dd>Sin costo</dd>
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section className="section section-soft">
      <div className="wrap">
        <h2 className="center">Empezar es sencillo</h2>
        <ol className="steps">
          {steps.map(([t, d], n) => (
            <li key={t}>
              <span className="step-n" aria-hidden="true">{n + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className="quote">
      <img src={img.room} alt="" loading="lazy" />
      <div className="quote-shade" />
      <blockquote className="wrap">{quote}</blockquote>
    </section>
  )
}

function Booking({ area, setArea }) {
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
  const a = areas.find((x) => x.id === area)
  const dayLabel = day?.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })

  const confirm = () => {
    if (!day || !time || !name.trim() || !phone.trim()) return setError('Elige día y hora, y escribe tu nombre y celular.')
    setError('')
    const msg = `Hola ${site.firstName}, quiero agendar ${first ? 'la llamada inicial gratuita' : 'una sesión'}.\n\n${a ? `Tema: ${a.name}\n` : ''}Día: ${dayLabel}\nHora: ${time}\nNombre: ${name}\nCelular: ${phone}`
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <section id="agendar" className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>Agenda tu espacio</h2>
          <p>Elige el día y la hora que te queden mejor. Te confirmo por WhatsApp. No necesitas contarme nada por aquí.</p>
        </div>
        <div className="booking">
          <div className="booking-steps">
            <fieldset>
              <legend>¿Es tu primera vez conmigo?</legend>
              <div className="chips">
                <button type="button" aria-pressed={first} onClick={() => setFirst(true)}>Sí, quiero la llamada gratuita</button>
                <button type="button" aria-pressed={!first} onClick={() => setFirst(false)}>Ya soy paciente</button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Tema (opcional)</legend>
              <div className="chips">
                {areas.map((x) => (
                  <button key={x.id} type="button" aria-pressed={area === x.id} onClick={() => setArea(area === x.id ? '' : x.id)}>{x.name}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Día</legend>
              <div className="days">
                {days.map((d) => {
                  const sunday = d.getDay() === 0
                  const active = day && d.getTime() === day.getTime()
                  return (
                    <button key={d.toISOString()} type="button" disabled={sunday} aria-pressed={!!active} onClick={() => { setDay(d); setTime('') }}>
                      <span>{d.toLocaleDateString('es-CO', { weekday: 'short' })}</span>
                      <strong>{d.getDate()}</strong>
                      <span>{d.toLocaleDateString('es-CO', { month: 'short' })}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <fieldset disabled={!day}>
              <legend>Hora</legend>
              <div className="chips">
                {slots.map((s) => <button key={s} type="button" aria-pressed={time === s} onClick={() => setTime(s)}>{s}</button>)}
              </div>
            </fieldset>
            <fieldset>
              <legend>Tus datos</legend>
              <div className="row">
                <label className="field"><span>Nombre</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" /></label>
                <label className="field"><span>Celular</span><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" /></label>
              </div>
            </fieldset>
          </div>
          <aside className="card summary" aria-live="polite">
            <div className="summary-who">
              <img src={img.portrait} alt="" />
              <div><strong>{site.name}</strong><span>{site.title}</span></div>
            </div>
            <dl>
              <dt>Tipo</dt><dd>{first ? 'Llamada inicial gratuita' : 'Sesión'}</dd>
              <dt>Día</dt><dd className="cap">{dayLabel || '—'}</dd>
              <dt>Hora</dt><dd>{time || '—'}</dd>
              <dt>Modalidad</dt><dd>Videollamada</dd>
            </dl>
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn btn-wa" type="button" onClick={confirm}><WhatsIcon /> Confirmar por WhatsApp</button>
            <p className="hint">{site.crisis}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="preguntas" className="section section-soft">
      <div className="wrap narrow">
        <h2>Preguntas frecuentes</h2>
        <div className="faq">
          {faq.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact">
      <div className="wrap contact-grid">
        <div>
          <h2>Aquí estoy cuando lo necesites</h2>
          <p className="body-lg">{site.city}</p>
        </div>
        <div>
          <h3>Horario</h3>
          {site.hours.map((h) => <p key={h}>{h}</p>)}
        </div>
        <div>
          <h3>Contacto</h3>
          <p><a href={waLink(hello)} target="_blank" rel="noreferrer">{site.phoneDisplay}</a></p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
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
