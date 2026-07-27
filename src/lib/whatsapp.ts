export const WHATSAPP_NUMBER = "5493424470949";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  hero: "Hola Lucía! Quiero aplicar a uno de los 5 cupos de lanzamiento 💕",
  final: "Hola Lucía! Quiero ser una de las 5. Contame cómo seguimos.",
  general: "Hola Lucía! Vengo de tu landing y quiero saber más sobre Método Libre / Método Impacto.",
  libre: "Hola Lucía! Quiero armar mi tienda online con el Método Libre 🛍️",
  impacto: "Hola Lucía! Quiero armar mi landing con el Método Impacto 🎯",
};
