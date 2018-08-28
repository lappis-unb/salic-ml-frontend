<template>
  <div class="show-metrics">
    <header-show />
    <complexity-title />
    <metrics-list />
    <project-feedback />
    <user-login />
    <success-message/>
  </div>
</template>

<script>
import HeaderShow from '@/components/show_metrics/HeaderShow.vue'
import ComplexityTitle from '@/components/show_metrics/ComplexityTitle.vue'
import MetricsList from '@/components/show_metrics/MetricsList.vue';
import ProjectFeedback from '@/components/show_metrics/ProjectFeedback.vue';
import UserLogin from '@/components/show_metrics/UserLogin.vue';
import SuccessMessage from '@/components/show_metrics/SuccessMessage.vue';

export default {
  name: 'show-metrics',
  components: {
    'header-show': HeaderShow,
    'complexity-title': ComplexityTitle,
    'metrics-list': MetricsList,
    'project-feedback': ProjectFeedback,
    'user-login': UserLogin,
    'success-message': SuccessMessage
  }
}

</script>
