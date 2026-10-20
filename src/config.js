// ─────────────────────────────────────────────────────────────
// Datos de la psicóloga. Para adaptar la demo, cambia este archivo
// (y las fotos en images.js). Todo lo que está aquí es ficticio.
// Los campos con { es, en } tienen texto en español e inglés.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'Ps. Silvia Celis',
  firstName: 'Silvia Celis',
  title: { es: 'Psicóloga', en: 'Psychologist' },
  license: { es: 'Tarjeta profesional N.º 000000', en: 'Professional license No. 000000' },
  // WhatsApp en formato internacional, sin "+" ni espacios
  whatsapp: '573246853552',
  phoneDisplay: '+57 324 685 3552',
  email: 'hola@ejemplo.com',
  instagram: 'https://instagram.com/',
  city: { es: 'Atención virtual desde Colombia', en: 'Online sessions from Colombia' },
  hours: {
    es: ['Lunes a viernes · 7:00 a. m. – 8:00 p. m.', 'Sábados · 8:00 a. m. – 1:00 p. m.'],
    en: ['Monday to Friday · 7:00 a.m. – 8:00 p.m. (Colombia time)', 'Saturday · 8:00 a.m. – 1:00 p.m.'],
  },
  slots: {
    weekday: ['7:00', '8:00', '9:00', '10:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
    saturday: ['8:00', '9:00', '10:00', '11:00'],
  },
  // Precios (déjalos vacíos '' si no quiere publicarlos)
  prices: {
    individual: { es: '$150.000', en: 'COP 150,000' },
    couple: { es: '$190.000', en: 'COP 190,000' },
    first: { es: '15 minutos sin costo', en: '15 minutes, free of charge' },
  },
  // Mensaje para personas en crisis (se muestra en el pie y en la agenda)
  crisis: {
    es: 'Si estás en una crisis o en riesgo, no esperes una cita: llama a la línea de emergencias 123 o acude a urgencias.',
    en: 'If you are in crisis or at risk, don’t wait for an appointment: call 123 in Colombia or your local emergency number, or go to the nearest emergency room.',
  },
  theme: {
    ink: '#6B4F55',
    accent: '#8A5D61',
    soft: '#F4E8E5',
  },
}
