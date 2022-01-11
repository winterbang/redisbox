import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'
import redisApi from './redisApi'
import datastore from './database.js'
import '@assets/css/index.less'

import SvgIcon from './components/SvgIcon.vue'
const app = createApp(App)

app.config.globalProperties.$redis = redisApi
app.config.globalProperties.$datastore = datastore

app.component('svg-icon', SvgIcon)
app.use(router)
app.mount('#app')