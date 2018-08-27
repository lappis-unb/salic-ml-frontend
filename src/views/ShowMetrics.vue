<template>
  <div class="show-metrics">
    <header-show />
    <complexity-title />
  </div>
</template>

<script>
import HeaderShow from '@/components/show_metrics/HeaderShow.vue'
import ComplexityTitle from '@/components/show_metrics/ComplexityTitle.vue'

export default {
  name: 'show-metrics',
  components: {
    'header-show': HeaderShow,
    'complexity-title': ComplexityTitle
  }
}

</script>
