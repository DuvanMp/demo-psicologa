# Demo · Psicóloga (terapia virtual)

Bosquejo de sitio web para una psicóloga que atiende por videollamada. Sirve para mostrarle ideas de diseño y contenido antes de construir la versión final.

Nombre, textos, precios y datos son de ejemplo. Las fotos son de [Unsplash](https://unsplash.com/license) (uso comercial libre).

## Secciones

- Portada a pantalla completa con fotos que se alternan
- "¿Te suena familiar?": frases con las que el paciente se identifica
- Sobre mí, con formación y tarjeta profesional
- Cómo te puedo ayudar (6 áreas con foto)
- Terapia virtual y precios
- Cómo empezar en 3 pasos
- Frase destacada
- Agenda: llamada inicial gratuita o sesión, día, hora y datos → WhatsApp (no pide el motivo de consulta, por privacidad)
- Preguntas frecuentes, contacto y aviso para personas en crisis

## Adaptarlo

- `src/config.js`: nombre, tarjeta profesional, WhatsApp, horarios, precios y colores
- `src/content.js`: textos, áreas, preguntas frecuentes
- `src/images.js`: fotos (cambia `portrait` por la foto real de la psicóloga)

## Correr en local

```bash
npm install
npm run dev
```

## Publicar

En Cloudflare Pages (gratis, permite uso comercial): conecta el repositorio de GitHub, comando de build `npm run build`, carpeta `dist`.
