// Función simple para combinar clases CSS sin dependencias externas
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}