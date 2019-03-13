<template>
  <div class="show-metrics">
      <div class="ui dimmer inverted" id="load_background" :class="(loading)? 'active' : 'disabled'">
        <div class="ui large text loader">Carregando...</div>
      </div>
    <header-show :value="parseInt(indicators[0].valor)" :project="project" />
    <span>
      <complexity-title :value="parseInt(indicators[0].valor)" :project="project" />
      <metrics-list v-if="indicators[0].metricas && indicators[0].metricas.length != 0" :metrics="indicators[0].metricas" />
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
      indicators: [
        {
          valor: 0,
          metrics: []
        }
      ],
      project: {
        pronac: "-",
        name: "Pronac não existente"
      },
      url: API_PATH_PROJECT + this.$route.params.pronac
    };
  },
  props: {
    pronac: String
  },
  mounted: function() {
    var self = this;
    axios
      .get(this.url)
      .then(function(response) {
        // handle success
        var project = JSON.parse(JSON.stringify(response.data));
        self.project = project;
        self.indicators = project.indicadores;
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

