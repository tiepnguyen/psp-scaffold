import type { IntlFormatFormatOptions } from 'date-fns'
import { intlFormat } from 'date-fns'

export function formatDate(date: Date | string, format: string | IntlFormatFormatOptions = 'medium', locale = 'en-GB') {
  const options = typeof format === 'string' ? { dateStyle: format } as IntlFormatFormatOptions : format
  return intlFormat(date, options, { locale })
}
