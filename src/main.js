import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification' // ✅ Aqui está o POSITION
import 'vue-toastification/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'





const app = createApp(App)

app.use(Toast, {
  timeout: 3000,
  position: POSITION.TOP_CENTER,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  icon: '💜',
  toastClassName: 'custom-toast',
})

app.use(router)
app.mount('#app')

