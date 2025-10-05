import { createI18n } from 'vue-i18n'
import messages from '@/locales'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages,
})

export default i18n
