export function formatCurrency(value: number | undefined | null) {
  if (value === undefined || value === null) return '';
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
