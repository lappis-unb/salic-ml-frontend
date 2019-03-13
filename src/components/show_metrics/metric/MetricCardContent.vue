<template>
    <div>
      <span v-if="!metrica.valor_indisponivel">
        <p>Esta informação não está disponível.</p>
      </span>
      <span v-else-if="metrica.valor!=0 && metrica.tipo==='simples'">
        <metric-bar :metrica="metrica"/>
      </span>
      <span v-else-if=" metrica.tipo==='tabela-simples'">
        <proponents-list :metrica="metrica" />
      </span>
      </span>
        <span v-else-if="metrica.tipo==='lista-simples'">
        <voucher-above-50 :metrica="metrica" />
      </span>
      <span v-else-if="metrica.tipo==='lista-com-dropdown'">
        <dropdown-list :metrica="metrica" text_exception="Não há novos fornecedores." />
      </span>

      <!--As metricas abaixo não serão utilizadas na complexidade financeira-->

      <span v-else-if="metrica.tipo==='above-average-prices-list'">
        <above-average-list :metrica="metrica" />
      </span>
      <span v-else-if="metrica.tipo==='operation-code-list'">
        <operation-code-list :metrica="metrica" />
      </span>
      <span v-else-if="metrica.tipo==='items-list'">
        <item-list :metrica="metrica" />
      </span>
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
    metrica: Object
  }
};
</script>

<style>
.reason-text {
  margin-top: 25px;
  color: black;
}
</style>


