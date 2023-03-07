import { createApp } from 'vue'
import App from './App.vue'

import "normalize.css"
import "@/assets/css/index.css"

import router from "@/router"
import pinia from "@/stores"


const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
