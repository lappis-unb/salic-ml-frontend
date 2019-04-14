import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FinancialMetrics from './views/FinancialMetrics.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projetos/indicador_financeiro/:pronac',
      name: 'indicador_financeiro',
      component: FinancialMetrics,
      props: route => {
        return { pronac: route.params.pronac};
      }
    }
  ]
})
