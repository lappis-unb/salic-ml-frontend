<template>
    <div class="ui basic segment" id="DiagnosticArea">
        <div class="ui styled fluid accordion" id="DiagnosticMetrics">
            <metric-card />
        </div>
    </div>
</template>

<script>
import MetricCard from "@/components/show_metrics/MetricCard.vue";

export default {
  name: "MetricsList",
  data: function() {
    return {};
  },
  components: {
    "metric-card": MetricCard
  },
  mounted: function() {
    $(".ui.accordion").accordion({ exclusive: false });
  }
};
</script>