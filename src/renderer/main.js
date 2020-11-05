import Vue from 'vue'
import axios from 'axios'

// import './assets/photon/css/photon.css'
import './assets/reset.less'
// import iView from 'iview'
import Antd from 'ant-design-vue'
import animate from 'animate.css/animate.css'
import '@/themes/index.less'
import './assets/redisbox.less'
import db from './datastore'
import App from './App'
import router from './router'
import store from '@/store'
import redisClient from '@/redisClient'
// import Ads from 'vue-google-adsense'

console.log(animate)

Vue.use(require('vue-script2'))
// Vue.use(Ads.Adsense)
// Vue.use(Ads.InArticleAdsense)
// Vue.use(Ads.InFeedAdsense)
Vue.use(db)

// Vue.use(ElementUI)
// Vue.use(iView)
Vue.use(Antd)
Vue.use(animate)
Vue.use(redisClient)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
const EventBus = new Vue()
Vue.prototype.$bus = EventBus
Vue.config.productionTip = true // 当前开发版本的提示

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
