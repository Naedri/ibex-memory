import { createApp } from 'vue'
import App from './App.vue'
import { i18n, router, pinia } from './plugins'
import 'uno.css'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
