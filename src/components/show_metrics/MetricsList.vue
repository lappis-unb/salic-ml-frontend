<template>
  <div class="ui basic segment" id="DiagnosticArea">
    <div v-for="(metric,index) in metrics_list" :key="metric.type+index"
      class="ui styled fluid accordion" id="DiagnosticMetrics">
      <div class="title active" :class="metric.is_outlier">
        <div class="ui ribbon label">
          <i class="icon"></i>
        </div>
        <span>{{metric.name_title}}: {{metric.value}}</span>
        <helper-metric :helper_text="metric.helper_text"/>
        <i class="dropdown icon"></i>
      </div>
      <div class="content active" :class="metric.is_outlier">
        <metric-content :metric="metric" />
        <div class="ui divider"></div>
        <feedback-form :user="user" :metric_id="metric.metric_id" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import FeedbackForm from "./feedback/FeedbackForm.vue";
import HelperMetric from "./metric/HelperMetric.vue";
import MetricCardContent from "./metric/MetricCardContent.vue";

export default {
  name: "MetricsList",
  data: function() {
    return {
      budget_items: {
        name_title: "Itens orçamentários",
        helper_text: "Compara a quantidade de itens deste projeto com a quantidade mais comum de itens em projetos do mesmo segmento",
        type: "bar",
        value: this.metrics.budget_items.value,
        is_outlier: this.getIsOutlierStyle(this.metrics.budget_items.is_outlier),
        value_is_valid: this.metrics.budget_items.value_is_valid,
        minimun_expected: this.metrics.budget_items.minimum_expected,
        maximum_expected: this.metrics.budget_items.maximum_expected,

        bar: {},
      },
      budget_items_unusual: {
        name_title: "Itens orçamentários inesperados",
        type: "items-list",
        helper_text:
          "Indica os itens orçamentários deste projeto que \
                <strong>não estão entre os mais comuns</strong> do segmento.\
                Também lista os itens que aparecem frequentemente em projetos do segmento, \
                mas que <strong>não aparecem neste projeto</strong>.",

        value: this.metrics.budget_items_unusual.value + "%",
        value_is_valid: this.metrics.budget_items_unusual.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.budget_items_unusual.is_outlier),
        minimun_expected: this.metrics.budget_items_unusual.minimun_expected,
        maximum_expected: this.metrics.budget_items_unusual.maximum_expected,

        reason: "",

        common_items_not_in_project: this.metrics.budget_items_unusual.common_items_not_in_project,
        uncommon_items: this.metrics.budget_items_unusual.uncommon_items,
      },
      proof_payment: {
        name_title: "Comprovantes de pagamento",
        helper_text:
          "Compara a quantidade de comprovantes deste projeto com a \
               <strong>quantidade mais comum</strong> de comprovantes em projetos do mesmo segmento",
        value: this.metrics.proof_payment.value + "%",
        value_is_valid: this.metrics.proof_payment.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.proof_payment.is_outlier),
        minimun_expected: this.metrics.proof_payment.minimun_expected,
        maximum_expected: this.metrics.proof_payment.maximum_expected,
        type: "bar",

        bar: {},
      },
      above_average_prices: {
        name_title: "Preços acima da média",
        helper_text:
          "<p>Verifica a quantidade de itens com valor acima da mediana histórica neste projeto e compara com a <strong>quantidade mais frequente</strong> de itens acima da mediana em projetos do mesmo segmento</p>",
        value: "R$ " + this.metrics.above_average_prices.value,
        value_is_valid: this.metrics.above_average_prices.value_is_value,
        is_outlier: this.getIsOutlierStyle(this.metrics.above_average_prices.is_outlier),
        type: "above-average-prices-list",
        minimun_expected: this.metrics.above_average_prices.minimun_expected,
        maximum_expected: this.metrics.above_average_prices.maximum_expected,

        items: this.metrics.above_average_prices.items,
        total_items: "DESCOBRIR",
        maximum_expected: "DESCOBRIR",

        reason: ""
      },
      proven_value: {
        name_title: "Valor comprovado",
        helper_text:
          "<p>Compara o valor comprovado neste projeto com o <strong>valor mais frequentemente</strong> comprovado em projetos do mesmo segmento</p>",
        value: "R$ "+ this.metrics.proven_value.value,
        value_is_valid: this.metrics.proven_value.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.proven_value.is_outlier),
        minimun_expected: this.metrics.proven_value.minimun_expected,
        maximum_expected: this.metrics.proven_value.maximum_expected,
        type: "bar",

        bar: {}
      },
      captured_value: {
        name_title: "Valor captado",
        helper_text:
          "<p>Compara o valor captado neste projeto com o <strong>valor mais frequentemente</strong> captado em projetos do mesmo segmento</p>",
        value: "R$ " + this.metrics.captured_value.value,
        value_is_valid: this.metrics.captured_value.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.captured_value.is_outlier),
        minimun_expected: this.metrics.captured_value.minimun_expected,
        maximum_expected: this.metrics.captured_value.maximum_expected,
        type: "bar",

        bar: {},
      },
      projects_same_proponent: {
        name_title: "Projetos do mesmo proponente",
        helper_text:
          "<p>Indica os projetos que o proponente já executou no passado.</p>",
        value: this.metrics.projects_same_proponent.value,
        value_is_valid: this.metrics.projects_same_proponent.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.projects_same_proponent.is_outlier),
        minimun_expected: this.metrics.projects_same_proponent.minimun_expected,
        maximum_expected: this.metrics.projects_same_proponent.maximum_expected,
        type: "proponents-list",

        proponent_projects: this.metrics.projects_same_proponent.proponent_projects,
        reason: ""
      },
      new_providers: {
        name_title: "Novos fornecedores",
        value: this.metrics.new_providers.value,
        value_is_valid: this.metrics.new_providers.values_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.new_providers.is_outlier),
        minimun_expected: this.metrics.new_providers.minimun_expected,
        maximum_expected: this.metrics.new_providers.maximum_expected,
        type: "providers-list",
        reason: "",

        providers: this.metrics.new_providers.providers,
      } ,
      approved_value: {
        name_title: "Valor aprovado",
        helper_text:
          "<p>Indica a proporção de fornecedores que <strong>nunca participaram de projetos</strong> de incentivo antes em relação ao total de fornecedores envolvidos com o projeto.</p> <p>Também lista os itens orçamentários dos novos fornecedores.</p>",
        value: "R$ " + this.metrics.approved_value.value,
        value_is_valid: this.metrics.approved_value.value_is_valid,
        is_outlier: this.getIsOutlierStyle(this.metrics.approved_value.is_outlier),
        minimun_expected: this.metrics.approved_value.minimun_expected,
        maximum_expected: this.metrics.approved_value.maximum_expected,
        type: "bar",

        bar: {},
      }
    };
  },
  props: {
    metrics: Object,
    user: Object
  },
  computed: {
    metrics_list: function(){
      return [
        this.budget_items,
        this.budget_items_unusual,
        this.proof_payment,
        this.above_average_prices,
        this.proven_value,
        this.captured_value,
        this.projects_same_proponent,
        this.new_providers,
        this.approved_value,
      ];
    }
  },
  methods: {
    getIsOutlierStyle(isOutlier){
      return (isOutlier) ? "Metric-good" : "Metric-bad";
    },
    getMetricBar(max, min, value){
      var max_value = Math.max(max, value) * 2;
      return {};
    },
  },
  components: {
    "feedback-form": FeedbackForm,
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
  color: #666 !important;
}
.Metric-good .ui.ribbon.label {
  color: #666;
  background-color: #e7e7e7;
  border-color: #e7e7e7;
}
.Metric-good .icon:before {
  content: "\f2cb"; /* Thermometer empty */
}
</style>
