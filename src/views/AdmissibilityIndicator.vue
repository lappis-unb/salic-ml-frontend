<template>
  <div class="show-metrics" v-if="indicadores.AdmissibilityIndicator">
    <div class="ui dimmer inverted" id="load_background" :class="(loading)? 'active' : 'disabled'">
      <div class="ui large text loader">Carregando...</div>
    </div>
    <header-show :value="indicadores.AdmissibilityIndicator.valor" :project="project"/>
    <span>
      <complexity-title :value="indicadores.AdmissibilityIndicator.valor" :project="project"/>
      <metrics-list v-if="metricas!=undefined" :metricas="metricas"/>
      <h1
        v-else
        style="text-align: center;"
      >Error a acessar as métricas. {{indicadores.AdmissibilityIndicator.metricas==undefined}}</h1>
    </span>
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import axios from "axios";
import { API_PATH_PROJECT } from "@/utils/variables.js";
import * as metrics_functions from "@/utils/metrics.js";

export default {
  name: "AdmissibilityIndicator",
  components: {
    "header-show": HeaderShow,
    "complexity-title": ComplexityTitle,
    "metrics-list": MetricsList
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
      url: API_PATH_PROJECT + this.$route.params.pronac + "/details/"
    };
  },
  methods: {},
  props: {
    pronac: String
  },
  computed: {
    metricas: function() {
      let metricas = this.indicadores.AdmissibilityIndicator.metricas;
      return [
      ];
    }
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
      .catch(function(/*error*/) {
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
  background: #fff;
}
</style>

