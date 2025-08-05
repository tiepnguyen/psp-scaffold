export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}, locale = 'en-GB') {
  return new Intl.NumberFormat(locale, options).format(value)
}
