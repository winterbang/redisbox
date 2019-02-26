import Vue from 'vue'
import axios from 'axios'

// import './assets/photon/css/photon.css'
import './assets/reset.css'
// import ElementUI from 'element-ui'
import iView from 'iview'
// import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css/animate.min.css'
import '@/themes/index.less'
import './assets/redisbox.scss'
import db from './datastore'
import App from './App'
import router from './router'
import store from '@/store'
import redisClient from '@/redisClient'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
Vue.prototype.$db = db

let doc = {
  name: 'localhost',
  host: 'localhost',
  port: 6379,
  auth: ''
}
db.find({ name: 'localhost' }, function (err, docs) {
  if (docs.length === 0) {
    db.insert(doc, function (err, newDoc) {
      console.log(err)
      console.log(newDoc)
    })
  }
  console.log(err)
})

// Vue.use(ElementUI)
Vue.use(iView)
Vue.use(animate)
Vue.use(redisClient)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
