<template>
  <div class="show-metrics">
    <header-show :user="user" :project="project" />
    <span v-if="Object.keys(user).length!=0">
      <complexity-title v-if="indicators[0].value" :value="indicators[0].value" />
      <metrics-list v-if="indicators[0].metrics" :metrics="indicators[0].metrics" />
      <project-feedback
        :user="user"
        :project="project"
        :project_feedback_list="project_feedback_list"
      />
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
    "user-login": UserLogin,
  },
  data: function() {
    return {
      indicators: [],
      user: {},
      project: {
        name: "Nome do projeto",
        pronac: "1234"
      },
      project_feedback_list: [
        "Muito simples",
        "Simples",
        "Normal",
        "Complexo",
        "Muito complexo"
      ],
    };
  },
  mounted: function() {
    var self = this;
    axios
      .get("http://localhost:3000/project_indicators")
      .then(function(response) {
        self.indicators = response.data;
        // handle success
      })
      .catch(function(error) {
        // handle error
        // console.log(error);
      })
      .then(function() {
        // always executed
      });
  },
  methods: {
    getUser: function(user){
      this.user = user
    }
  }
};
</script>
