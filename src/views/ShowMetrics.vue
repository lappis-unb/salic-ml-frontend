<template>
  <div class="show-metrics">
    <header-show :user="user" :project="project" />
    <complexity-title v-if="indicators[0].value" :value="indicators[0].value" />
    <metrics-list v-if="indicators[0].metrics" :metrics="indicators[0].metrics" />
    <project-feedback
      :user="user"
      :project="project"
      :project_feedback_list="project_feedback_list"
    />
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import ProjectFeedback from "@/components/show_metrics/feedback/ProjectFeedback.vue";
import axios from "axios";

export default {
  name: "show-metrics",
  components: {
    "header-show": HeaderShow,
    "complexity-title": ComplexityTitle,
    "metrics-list": MetricsList,
    "project-feedback": ProjectFeedback
  },
  data: function() {
    return {
      indicators: [],
      user: {
        name: "Ferdinandinho",
        email: 'fernandinho@gmail.com'
      },
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
      ]
    };
  },
  mounted: function() {
    var self = this
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
  }
};
</script>
