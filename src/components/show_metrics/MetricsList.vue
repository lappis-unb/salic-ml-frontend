<template>
  <div class="ui basic segment" id="DiagnosticArea">
    <div v-for="(metrica, index) in metrics_list" :key="metrica.tipo+index"
      class="ui styled fluid accordion" id="DiagnosticMetrics">
      <div class="title" :class="metrica.is_outlier">
        <div class="ui ribbon label">
          <i class="icon"></i>
        </div>
        <span><span v-html="metrica.nome">{{metrica.nome}}</span>: {{(metrica.valor_valido) ? metrica.valor_formatado : "não disp."}}</span>
        <helper-metric :helper_text="metrica.explicacao"/>
        <i class="dropdown icon"></i>
      </div>
      <div class="content">
        <metric-content :metrica="metrica" />
      </div>
    </div>
  </div>
</template>

<script>
import HelperMetric from "./metric/HelperMetric.vue";
import MetricCardContent from "./metric/MetricCardContent.vue";
import {getFinancialMetrics} from "@/utils/metrics.js"

export default {
  name: "MetricsList",
  data: function() {
    return {
      new_metrics: getFinancialMetrics(this.metrics)
    };
  },
  props: {
    metrics: Object,
  },
  computed: {
    metrics_list: function () {
      return [
        this.new_metrics.valor_a_ser_comprovado,
        this.new_metrics.comprovantes_com_extrapolacao_de_50,
        this.new_metrics.projetos_do_mesmo_proponente,
        this.new_metrics.novos_fornecedores,
        this.new_metrics.itens_orcamentarios,
        this.new_metrics.comprovantes_de_pagamento,

        // Nao mostrar apartir daqui
        //this.new_metrics.approved_value,
        //this.new_metrics.vouchers_by_operation_code,
        //this.new_metrics.budget_items_unusual,
        //this.new_metrics.above_average_prices,
        //this.new_metrics.proven_value,
        //this.new_metrics.captured_value,
      ];
    }
  },
  methods: {
  },
  components: {
    "helper-metric": HelperMetric,
    "metric-content": MetricCardContent
  },
  mounted: function() {
    $(".ui.accordion").accordion({ exclusive: false });
  }
};
</script>

<style>

/***************************
 ** Diagnostic Accordion ***
 ***************************/

.ui.styled.accordion > .title {
  font-size: 2em !important;
}

.ui.styled.accordion > .title .dropdown.icon {
  color: #000;
  float: right;
}

.ui.styled.accordion .content {
  margin: 0 0 0 5.5em !important;
}

/*** Nested accordion ***/

.ui.styled.accordion .accordion {
  box-shadow: none !important;
  margin-top: -1em !important;
}

.ui.styled.accordion .accordion .title {
  border: none !important;
  color: black !important;
  padding-left: 0 !important;
  padding-bottom: 0 !important;
}

.ui.styled.accordion .accordion .content {
  padding-left: 1.6em !important;
}

/***************************
 ****** Metric Status ******
 ***************************/

.ui.ribbon.label {
  color: #fff;
  margin-left: 0;
  left: calc(-2rem - 1.2em) !important;
  padding: 1em 0 1em 2em !important;
}
.ui.ribbon.label .icon {
  font-size: 3em;
  padding-left: 0.2em;
}

/***** Types styles *****/

.title.Metric-bad {
  color: #db2828 !important;
}
.Metric-bad .ui.ribbon.label {
  background-color: #db2828;
  border-color: #b21e1e;
}
.Metric-bad .icon:before {
  content: "\f2c7"; /* Thermometer full */
}

.Metric-average {
  color: #f2b01c !important;
}
.Metric-average .ui.ribbon.label {
  background-color: #f2b01c;
  border-color: #cf910c;
}
.Metric-average .icon:before {
  content: "\f2c9"; /* Thermometer half full */
}

.Metric-good {
  color: #1B5E20 !important;
}
.Metric-good .ui.ribbon.label {
  color: white;
  background-color: #1B5E20;
  border-color: #1B5E20;
}
.Metric-good .icon:before {
  content: "\f2cb"; /* Thermometer empty */
}

.Metric-invalid {
  color: #666 !important;
}
.Metric-invalid .ui.ribbon.label {
  color: #666;
  background-color: #e7e7e7;
  border-color: #e7e7e7;
}
.Metric-invalid .icon:before {
  content: "\f2cb"; /* Thermometer empty */
}

</style>
