import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: DefineLocaleMessage
  }
}
