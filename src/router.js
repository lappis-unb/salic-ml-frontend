import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ShowMetrics from './views/ShowMetrics.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/show',
      name: 'show',
      component: ShowMetrics,
      props: route => {
        console.log("este é o route" ,route.params.pronac)
        return { pronac: route.params.pronac};
      }
    }
  ]
})
