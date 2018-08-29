<template>
  <div class="show-metrics">
    <header-show />
    <complexity-title :value="indicator.value" />
    <metrics-list />
    <project-feedback
      :project_name="project.name"
      :project_feedback_list="project_feedback_list"
    />
  </div>
</template>

<script>
import HeaderShow from "@/components/show_metrics/HeaderShow.vue";
import ComplexityTitle from "@/components/show_metrics/ComplexityTitle.vue";
import MetricsList from "@/components/show_metrics/MetricsList.vue";
import ProjectFeedback from "@/components/show_metrics/feedback/ProjectFeedback.vue";

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
      indicator: {
        value: 77
      },
      project: {
        name: "Nome do projeto"
      },
      project_feedback_list: [
        "Muito simples",
        "Simples",
        "Normal",
        "Complexo",
        "Muito complexo"
      ]
    };
  }
};
</script>
