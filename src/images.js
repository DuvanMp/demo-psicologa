// Fotos de Unsplash (uso comercial libre: https://unsplash.com/license).
// Para la versión real, cambia "portrait" por una foto profesional de la psicóloga.
const u = (id, w = 1200, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}${extra}`

export const img = {
  // "mobile" = qué parte de la foto se ve en el celular (horizontal vertical)
  hero: [
    { src: u('1758273241086-f3585ef8c2f8', 2000), mobile: '22% 30%' },
    { src: u('1628645339131-0c39c7527856', 2000), mobile: '42% 30%' },
    { src: u('1714976694867-bc0e012fab70', 2000), mobile: '72% 30%' },
  ],
  portrait: u('1733685373178-b49c3943ccef', 900, '&h=1100&crop=faces'),
  online: u('1713946598526-357e3baaff04', 1200, '&h=900'),
  room: u('1637245048732-adf1a547835e', 2000, '&h=1100'),
  areas: {
    anxiety: u('1551847677-dc82d764e1eb', 800, '&h=600'),
    mood: u('1604881991664-593b31b88488', 800, '&h=600'),
    couple: u('1714976694810-85add1a29c96', 800, '&h=600'),
    self: u('1573495804664-b1c0849525af', 800, '&h=600'),
    teens: u('1758273240403-052b3c99f636', 800, '&h=600'),
    grief: u('1604881991720-f91add269bed', 800, '&h=600'),
  },
}
