<template>
  <div>
    <span v-if="!metrica.valor_valido">
      <p>Esta informação não está disponível.</p>
    </span>
    <span v-else-if="metrica.valor!=0 && metrica.tipo==='simples'">
      <simple-text-content :metrica="metrica"/>
    </span>
    <span v-else-if=" metrica.tipo==='tabela-simples'">
      <simple-table :metrica="metrica"/>
    </span>
    <span v-else-if=" metrica.tipo==='tabela-de-items'">
      <items-table :metrica="metrica"/>
    </span>
    <span v-else-if="metrica.tipo==='lista-simples'">
      <simple-list :metrica="metrica"/>
    </span>
    <span v-else-if="metrica.tipo==='lista-com-dropdown'">
      <dropdown-list :metrica="metrica" text_exception="Não há novos fornecedores."/>
    </span>

    <!--As metricas abaixo não serão utilizadas na complexidade financeira-->

    <span v-else-if="metrica.tipo==='above-average-prices-list'">
      <above-average-list :metrica="metrica"/>
    </span>
    <span v-else-if="metrica.tipo==='operation-code-list'">
      <operation-code-list :metrica="metrica"/>
    </span>
    <span v-else-if="metrica.tipo==='items-list'">
      <item-list :metrica="metrica"/>
    </span>
  </div>
</template>

<script>
import SimpleTextContent from "@/components/show_metrics/metrics/content/SimpleTextContent.vue";
import SimpleListContent from "@/components/show_metrics/metrics/content/SimpleListContent.vue";
import SimpleTableContent from "@/components/show_metrics/metrics/content/SimpleTableContent.vue";
import ItemsTableContent from "@/components/show_metrics/metrics/content/ItemsTableContent.vue";
import DropdownListCardContent from "@/components/show_metrics/metrics/content/DropdownListCardContent";

import ItemListCardContent from "@/components/show_metrics/metrics/content/ItemListCardContent.vue";
import OperationCodeCardContent from "@/components/show_metrics/metrics/content/OperationCodeCardContent.vue";
import AboveAveragePricesCardContent from "@/components/show_metrics/metrics/content/AboveAveragePricesCardContent.vue";

export default {
  name: "MetricCardContent",
  components: {
    "simple-list": SimpleListContent,
    "simple-table": SimpleTableContent,
    "items-table": ItemsTableContent,
    "simple-text-content": SimpleTextContent,
    "dropdown-list": DropdownListCardContent,

    "item-list": ItemListCardContent,
    "above-average-list": AboveAveragePricesCardContent,
    "operation-code-list": OperationCodeCardContent
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


