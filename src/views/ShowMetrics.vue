<template>
  <div class="show-metrics">
    <header-show :user="user" :project="project" />
    <span v-if="has_user==true">
      <complexity-title v-if="indicators[0].value" :value="indicators[0].value" />
      <metrics-list v-if="indicators[0].metrics.length != 0" :metrics="indicators[0].metrics" :user="user" />
      <!--<project-feedback
        :user="user"
        :project="project"
        :project_feedback_list="project_feedback_list"
      />-->
    </span>
    <span v-else>
      <user-login @setUser="getUser"/>
    </span>
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import ProjectFeedback from "@/components/show_metrics/feedback/ProjectFeedback.vue";
import UserLogin from "@/components/show_metrics/feedback/UserLogin.vue";
import axios from "axios";

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
      indicators: [
        {
          value: 0,
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
      //url: "https://salicml-api.lappis.rocks/indicators/project_info/" + this.pronac,
      //url: "http://localhost:3000/projects/" + this.$route.params.pronac
      url: "http://localhost:8080/projetos/" + this.$route.params.pronac
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
        self.indicators = project.indicators;
        // handle success
      })
      .catch(function(error) {
        // handle error
        console.log("Get error", error);
      })
      .then(function() {
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
