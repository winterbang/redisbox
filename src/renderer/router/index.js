import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/pages/Home').default
    }, {
      path: '/connection',
      // name: 'Main',
      component: require('@/pages/Main').default,
      children: [
        {
          name: 'Conns',
          path: '',
          component: require('@/pages/Conns').default
        }, {
          name: 'DbList',
          path: ':id',
          component: require('@/pages/DbList').default
        }, {
          name: 'Keys',
          path: ':id/keys',
          component: require('@/pages/Table').default
        }, {
          name: 'Detail',
          path: ':id/keys/:key',
          component: require('@/pages/Detail').default
        }, {
          name: 'Key',
          path: 'dbs',
          component: require('@/components/Panel').default
        }
      ]
    }, {
      path: '/console',
      name: 'Console',
      component: require('@/pages/Console').default
    }, {
      path: '/setting',
      name: 'Setting',
      component: require('@/pages/Setting').default
    }, {
      path: '/feedback',
      name: 'Feedback',
      component: require('@/pages/Feedback').default
    }, {
      path: '/information',
      name: 'Information',
      component: require('@/pages/Information').default
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log('to =>')
//   console.log(to)
//   console.log('from => ')
//   console.log(from)
//   next()
// })
export default router
