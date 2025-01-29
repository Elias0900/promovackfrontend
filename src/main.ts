import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importer les fichiers Bootstrap via Sass
import './styles/main.scss'  // Ce fichier contient l'import de bootstrap/scss/bootstrap

// Importer les styles globaux de ton projet
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
