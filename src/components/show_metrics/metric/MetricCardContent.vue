<template>
    <div>
      <span v-if="metric.value!=0 && metric.type=='bar'">
        <metric-bar :metric="metric"/>
      </span>
      <span v-else-if="metric.type=='items-list'">
        <item-list :metric="metric" />
      </span>
      <span v-else-if=" metric.type=='proponents-list'">
        <proponents-list :metric="metric" />
      </span>
      <span v-else-if="metric.type=='providers-list'">
        <providers-list :metric="metric" />  
      </span>
       
			<p class="reason-text">{{metric.reason}}</p>
	</div>
</template>

<script>
import ItemListCardContent from "@/components/show_metrics/metric/content/ItemListCardContent.vue"
import ProvidersListCardContent from "@/components/show_metrics/metric/content/ProvidersListCardContent.vue"
import ProponentsListCardContent from "@/components/show_metrics/metric/content/ProponentsListCardContent.vue"
import MetricBarContent from "@/components/show_metrics/metric/content/MetricBarContent.vue"

export default {
  name: "MetricCardContent",
  components: {
    "item-list": ItemListCardContent,
    "providers-list": ProvidersListCardContent,
    "proponents-list": ProponentsListCardContent,
    "metric-bar": MetricBarContent
  },
  props: {
    metric: Object
  }
};
</script>

<style>
.reason-text {
  margin-top: 25px;
  color: black;
}
</style>


