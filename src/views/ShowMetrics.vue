<template>
  <div class="show-metrics">
    <header-show />
  </div>
</template>

<script>
import HeaderShow from '@/components/show_metrics/HeaderShow.vue'

export default {
  name: 'show-metrics',
  components: {
    'header-show': HeaderShow
  }
}
</script>
