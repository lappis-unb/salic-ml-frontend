<template>
  <div class="show-metrics">
      <div class="ui dimmer inverted" id="load_background" :class="(loading)? 'active' : 'disabled'">
        <div class="ui large text loader">Carregando...</div>
      </div>
    <header-show :value="parseInt(indicators[0].valor)" :user="user" :project="project" />
    <span>
      <complexity-title :value="parseInt(indicators[0].valor)" :project="project" />
      <metrics-list v-if="indicators[0].metricas && indicators[0].metricas.length != 0" :metrics="indicators[0].metricas" :user="user" />
      <!--<project-feedback
        :user="user"
        :project="project"
        :project_feedback_list="project_feedback_list"
      />-->
    </span>
    <!--<span v-else><user-login @setUser="getUser"/></span>-->
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import ProjectFeedback from "@/components/show_metrics/feedback/ProjectFeedback.vue";
import UserLogin from "@/components/show_metrics/feedback/UserLogin.vue";
import axios from "axios";
import {API_PATH_PROJECT} from '@/utils/variables.js'

export default {
  name: "show-metrics",
  components: {
    "header-show": HeaderShow,
    "complexity-title": ComplexityTitle,
    "metrics-list": MetricsList,
    "project-feedback": ProjectFeedback,
    "user-login": UserLogin
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
      user: {},
      has_user: true,
      project: {
        pronac: "-",
        name: "Pronac não existente"
      },
      project_feedback_list: [
        "Muito simples",
        "Simples",
        "Normal",
        "Complexo",
        "Muito complexo"
      ],
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
        var project = JSON.parse(JSON.stringify(response.data));
        self.project = project;
        self.indicators = project.indicadores;
        // handle success
      })
      .catch(function(error) {
        // handle error
        console.log("Get error", error);
      })
      .then(function() {
        self.loading = false;
        // always executed
      });
  },
  methods: {
    getUser: function(user) {
      this.user = user;
      this.has_user = true;
      // console.log("Este e o user ", this.has_user);
    }
  }
};
</script>

<style>
#load_background {
    background: #FFF;
}
</style>

