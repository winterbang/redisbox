import {createRouter, createWebHashHistory} from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// const Home = HelloWorld
const About = { template: '<div>About</div>' }

const routes = [
    {
        path: '/',
        redirect: '/main'
    }, { 
        path: '/main', 
        component: () => import('./layouts/index.vue'),
        children: [
            {
                path: '',
                component: () => import('./pages/Connections.vue')
            }, {
                path: 'connetions',
                name: 'connetions',
                component: () => import('./pages/Connections.vue'),
            }, {
                path: ':connection_id',
                name: 'connection',
                component: () => import('./pages/Dbs.vue')
            }, {
                path: ':connection_id/:db',
                name: 'db',
                component: () => import('./pages/Keys.vue')
            }
        ]
    }, { 
        path: '/about', 
        component: About 
    }, {
        path: '/new_connection',
        component: () => import('./pages/NewConnection.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
  
export default router