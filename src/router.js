import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import FinancialIndicator from "./views/FinancialIndicator.vue";

Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/projetos/indicador_financeiro/:pronac",
      name: "indicador_financeiro",
      component: FinancialIndicator,
      props: route => {
        return { pronac: route.params.pronac };
      }
    }
  ]
});
