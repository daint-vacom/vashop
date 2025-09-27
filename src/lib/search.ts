export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD') // tách ký tự + dấu
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/[đð]/g, 'd'); // gộp luôn đ + Ð (eth)
}

export function advancedSearch(
  str: string | undefined | null,
  search: string | undefined | null,
): boolean {
  if (!search) return true;
  const normalizedStr = normalizeVietnamese(str ?? '');
  const normalizedSearch = normalizeVietnamese(search);
  return normalizedStr.includes(normalizedSearch);
  // return fuzzy(normalizedSearch, normalizedStr) >= threshold;
}
