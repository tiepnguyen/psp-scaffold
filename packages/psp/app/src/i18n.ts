import { createI18n } from 'vue-i18n'
// import en_US from '@/locales/source/en-US.json'

const defaultLocale = 'en-US'
const messages: Record<string, any> = {
  // 'en-US': en_US,
}

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages,
})

export async function setLocale(locale: string) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const source = locale === 'en-US' ? 'source/en-US' : locale
    const messages = await importLocale(`./locales/${source}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
  }

  i18n.global.locale.value = locale
}

function importLocale(path: string) {
  return import.meta.glob('./locales/**/*.json')[path]() as Promise<{ default: any }>
}
