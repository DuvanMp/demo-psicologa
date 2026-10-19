// ─────────────────────────────────────────────────────────────
// Datos de la psicóloga. Para adaptar la demo, cambia este archivo
// (y las fotos en images.js). Todo lo que está aquí es ficticio.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'Ps. Silvia Fernanda',
  firstName: 'Silvia Fernanda',
  title: 'Psicóloga clínica',
  license: 'Tarjeta profesional N.º 000000',
  // WhatsApp en formato internacional, sin "+" ni espacios
  whatsapp: '573246853552',
  phoneDisplay: '+57 324 685 3552',
  email: 'hola@ejemplo.com',
  instagram: 'https://instagram.com/',
  city: 'Atención virtual desde Colombia',
  hours: ['Lunes a viernes · 7:00 a. m. – 8:00 p. m.', 'Sábados · 8:00 a. m. – 1:00 p. m.'],
  slots: {
    weekday: ['7:00', '8:00', '9:00', '10:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
    saturday: ['8:00', '9:00', '10:00', '11:00'],
  },
  // Precios (déjalos vacíos '' si no quiere publicarlos)
  prices: {
    individual: '$150.000',
    couple: '$190.000',
    first: '15 minutos sin costo',
  },
  // Mensaje para personas en crisis (se muestra en el pie y en la agenda)
  crisis: 'Si estás en una crisis o en riesgo, no esperes una cita: llama a la línea de emergencias 123 o acude a urgencias.',
  theme: {
    ink: '#2F4A3F',
    accent: '#B9714F',
    soft: '#E7EDE6',
  },
}
