// ============================================================================
//  SIVAN · Contacto y redes (único lugar para cambiar estos datos)
// ============================================================================
export const WPP_PHONE = '51937302239';          // WhatsApp (Perú, con código país)
export const EMAIL = 'sivansolutionsgo@gmail.com';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/sivansolutions/',
  facebook: 'https://www.facebook.com/SivanSolutions',
  tiktok:   'https://www.tiktok.com/@sivansolutions',
  youtube:  'https://www.youtube.com/@Sivan-solutions',
};

// Construye un enlace de WhatsApp con mensaje prellenado.
export function wppUrl(text) {
  return 'https://wa.me/' + WPP_PHONE + '?text=' + encodeURIComponent(text);
}

export const WPP_DEFAULT_TEXT =
  'Hola SIVAN 👋, quiero que me asesoren para profesionalizar mi operación inmobiliaria.';
export const WPP_URL = wppUrl(WPP_DEFAULT_TEXT);

export const WPP_FOUNDER_URL = wppUrl(
  'Hola SIVAN 👋, quiero asegurar el precio fundador de S/ 297 para el Programa Fundadores · Nivel 1. Me interesa implementar los cuatro procesos con IA y probar KAIROS + BROX durante 90 días. ¿Podrían confirmarme la disponibilidad y explicarme cómo reservar mi vacante?'
);
