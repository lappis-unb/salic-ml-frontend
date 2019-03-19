<template>
  <div class="show-metrics">
    <div class="ui dimmer inverted" id="load_background" :class="(loading)? 'active' : 'disabled'">
      <div class="ui large text loader">Carregando...</div>
    </div>
    {{ indicadores.FinancialIndicator }}
    <header-show :value="indicadores.FinancialIndicator.valor" :project="project" />
    <span>
      <!--<complexity-title :value="indicadores.FinancialIndicator.valor" :project="project" />-->
      <!--<metrics-list v-if="indicadores.FinancialIndicator.metricas && indicadores.FinancialIndicator.metricas.length != 0" :metrics="indicadores.FinancialIndicator.metricas" />-->
    </span>
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import axios from "axios";
import {API_PATH_PROJECT} from '@/utils/variables.js'

export default {
  name: "show-metrics",
  components: {
    "header-show": HeaderShow,
    "complexity-title": ComplexityTitle,
    "metrics-list": MetricsList,
  },
  data: function() {
    return {
      loading: true,
      indicadores: [
        {
          valor: 0,
          metricas: []
        }
      ],
      project: {
        pronac: "Pronac não existente",
        name: "Projeto não existente"
      },
      url: API_PATH_PROJECT + this.$route.params.pronac + '/details/'
    };
  },
  props: {
    pronac: String
  },
  computed: {
    
  },
  created: function() {
    var self = this;
    axios
      .get(this.url)
      .then(function(response) {
        // handle success
        var project = JSON.parse(JSON.stringify(response.data));
        self.project = project;
        self.indicadores = project.indicadores;
      })
      .catch(function(error) {
        // handle error
        // console.log("Get error", error);
      })
      .then(function() {
        self.loading = false;
        // always executed
      });
  }
};
</script>

<style>
#load_background {
    background: #FFF;
}
</style>

