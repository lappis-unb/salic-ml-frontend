<template>
    <div>
      <span v-if="!metric.value_is_valid">
        <p>Esta informação não está disponível.</p>
      </span>
      <span v-else-if="metric.value!=0 && metric.type==='bar'">
        <metric-bar :metric="metric"/>
      </span>
      <span v-else-if="metric.type==='items-list'">
        <item-list :metric="metric" />
      </span>
      <span v-else-if=" metric.type==='proponents-list'">
        <proponents-list :metric="metric" />
      </span>
      <span v-else-if="metric.type==='providers-list'">
        <dropdown-list :metric="metric" text_exception="Não há novos fornecedores." />  
      </span>
      <span v-else-if="metric.type==='above-average-prices-list'">
        <above-average-list :metric="metric" />  
      </span>
      <span v-else-if="metric.type==='operation-code-list'">
        <operation-code-list :metric="metric" />  
      </span>
      </span>
        <span v-else-if="metric.type==='vouchers-above-50'">
        <voucher-above-50 :metric="metric" />  
      </span>
	  <!--<p class="reason-text">{{metric.reason}}</p>-->
	</div>
</template>

<script>
import ItemListCardContent from "@/components/show_metrics/metric/content/ItemListCardContent.vue"
import ProponentsListCardContent from "@/components/show_metrics/metric/content/ProponentsListCardContent.vue"
import MetricBarContent from "@/components/show_metrics/metric/content/MetricBarContent.vue"
import AboveAveragePricesCardContent from "@/components/show_metrics/metric/content/AboveAveragePricesCardContent.vue"
import OperationCodeCardContent from "@/components/show_metrics/metric/content/OperationCodeCardContent.vue"
import VouchersAbove50CardContent from "@/components/show_metrics/metric/content/VouchersAbove50CardContent.vue"
import DropdownListCardContent from "@/components/show_metrics/metric/content/DropdownListCardContent"

export default {
  name: "MetricCardContent",
  components: {
    "item-list": ItemListCardContent,
    "proponents-list": ProponentsListCardContent,
    "metric-bar": MetricBarContent,
    "above-average-list": AboveAveragePricesCardContent,
    "operation-code-list": OperationCodeCardContent,
    "voucher-above-50": VouchersAbove50CardContent,
    "dropdown-list": DropdownListCardContent
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


