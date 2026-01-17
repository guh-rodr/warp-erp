export function formatToReal(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
}

export function convertToCents(value: number) {
  return Math.round(value * 100);
}

export function convertToDecimal(value: number) {
  return Math.round(value / 100);
}
