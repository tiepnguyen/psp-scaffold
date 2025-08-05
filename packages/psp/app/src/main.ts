import { createApp } from 'vue'
import App from '@/App.vue'
import { i18n } from '@/i18n'
import { router } from '@/router'
import { client } from '@/villus'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(client)
app.mount('#app')
