<template>
  <div class="ui basic segment" id="DiagnosticArea">
    <div v-for="(metric, index) in metrics_list" :key="metric.type+index"
      class="ui styled fluid accordion" id="DiagnosticMetrics">
      <div class="title" :class="metric.is_outlier">
        <div class="ui ribbon label">
          <i class="icon"></i>
        </div>
        <span>{{metric.name_title}}: {{(metric.value_is_valid) ? metric.value_text : "não disp."}}</span>
        <helper-metric :helper_text="metric.helper_text"/>
        <i class="dropdown icon"></i>
      </div>
      <div class="content">
        <metric-content :metric="metric" />
        <!--
            <div class="ui divider"></div>
            <feedback-form :user="user" :metric_id="metric.metric_id" :index="index" />
        -->
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
        value: this.metrics.itens_orcamentarios.valor,
        value_text: this.metrics.itens_orcamentarios.valor,
        is_outlier: this.getColorStyle(this.metrics.itens_orcamentarios.outlier, this.metrics.itens_orcamentarios.valor_valido),
        value_is_valid: this.metrics.itens_orcamentarios.valor_valido,
        minimum_expected: this.metrics.itens_orcamentarios.minimo_esperado,
        maximum_expected: parseInt(this.metrics.itens_orcamentarios.maximo_esperado),
        is_invalid_value: (this.metrics.itens_orcamentarios.valor) ? true : false,

        bar: {},
      },
      budget_items_unusual: {
        name_title: "Itens orçamentários inesperados",
        type: "items-list",
        helper_text:
          "Indica os itens orçamentários deste projeto que \
                não estão entre os mais comuns do segmento.\
                Também lista os itens que aparecem frequentemente em projetos do segmento, \
                mas que não aparecem neste projeto.",

        value: (this.metrics.itens_orcamentarios_inesperados.valor).toFixed(2),
        value_text: (this.metrics.itens_orcamentarios_inesperados.valor).toFixed(2) + "%",
        value_is_valid: this.metrics.itens_orcamentarios_inesperados.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.itens_orcamentarios_inesperados.outlier, this.metrics.itens_orcamentarios_inesperados.valor_valido),
        minimum_expected: this.metrics.itens_orcamentarios_inesperados.minimo_esperado,
        maximum_expected: this.metrics.itens_orcamentarios_inesperados.maximo_esperado,

        reason: "",

        common_items_not_in_project: this.metrics.itens_orcamentarios_inesperados.items_comuns_que_o_projeto_nao_possui,
        uncommon_items: this.metrics.itens_orcamentarios_inesperados.items_incomuns,
      },
      proof_payment: {
        name_title: "Comprovantes de pagamento",
        helper_text:
          "Compara a quantidade de comprovantes deste projeto com a \
               quantidade mais comum de comprovantes em projetos do mesmo segmento",
        value: this.metrics.comprovantes_de_pagamento.valor,
        value_text: this.metrics.comprovantes_de_pagamento.valor + "%",
        value_is_valid: this.metrics.comprovantes_de_pagamento.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.comprovantes_de_pagamento.outlier, this.metrics.comprovantes_de_pagamento.valor_valido),
        minimum_expected: this.metrics.comprovantes_de_pagamento.minimo_esperado,
        maximum_expected: "R$ "+ this.setMoneyFormat(this.metrics.comprovantes_de_pagamento.maximo_esperado),
        type: "bar",

        bar: {},
      },
      above_average_prices: {
        name_title: "Preços acima da média",
        helper_text:
          "Verifica a quantidade de itens com valor acima da mediana histórica neste projeto e compara com a quantidade mais frequente de itens acima da mediana em projetos do mesmo segmento",
        value: this.metrics.precos_acima_da_media.valor,
        value_text: this.metrics.precos_acima_da_media.valor,
        value_is_valid: this.metrics.precos_acima_da_media.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.precos_acima_da_media.outlier, this.metrics.precos_acima_da_media.valor_valido),
        type: "above-average-prices-list",
        minimum_expected: this.metrics.precos_acima_da_media.minimo_esperado,
        maximum_expected: this.metrics.precos_acima_da_media.maximo_esperado,

        items: this.metrics.precos_acima_da_media.items,

        reason: ""
      },
      proven_value: {
        name_title: "Valor comprovado",
        helper_text:
          "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento",
        value: this.metrics.valor_comprovado.valor,
        value_text: "R$ "+ this.setMoneyFormat(this.metrics.valor_comprovado.valor),
        value_is_valid: this.metrics.valor_comprovado.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.valor_comprovado.outlier, this.metrics.valor_comprovado.valor_valido),
        minimum_expected: this.metrics.valor_comprovado.minimo_esperado,
        maximum_expected: "R$ "+ this.setMoneyFormat(this.metrics.valor_comprovado.maximo_esperado),
        type: "bar",

        bar: {}
      },
      valor_a_ser_comprovado: {
        name_title: "Valor a ser comprovado",
        helper_text:
          "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento",
        value: this.metrics.valor_a_ser_comprovado.valor,
        value_text: "R$ "+ this.setMoneyFormat(this.metrics.valor_a_ser_comprovado.valor),
        value_is_valid: this.metrics.valor_a_ser_comprovado.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.valor_a_ser_comprovado.outlier, this.metrics.valor_comprovado.valor_valido),
        minimum_expected: this.metrics.valor_a_ser_comprovado.minimo_esperado,
        maximum_expected: "R$ "+ this.setMoneyFormat(this.metrics.valor_a_ser_comprovado.maximo_esperado),
        type: "bar",

        bar: {}
      },
      captured_value: {
        name_title: "Valor captado",
        helper_text:
          "Compara o valor captado neste projeto com o valor mais frequentemente captado em projetos do mesmo segmento",
        value: this.metrics.valor_captado.valor,
        value_text: "R$ " + this.setMoneyFormat(this.metrics.valor_captado.valor),
        value_is_valid: this.metrics.valor_captado.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.valor_captado.outlier, this.metrics.valor_captado.valor_valido),
        minimum_expected: this.metrics.valor_captado.minimo_esperado,
        maximum_expected: "R$ "+ this.setMoneyFormat(this.metrics.valor_captado.maximo_esperado),
        type: "bar",

        bar: {},
      },
      projects_same_proponent: {
        name_title: "Projetos do mesmo proponente",
        helper_text:
          "Indica os projetos que o proponente já executou no passado.",
        value: this.metrics.projetos_do_mesmo_proponente.valor,
        value_text: this.metrics.projetos_do_mesmo_proponente.valor,
        value_is_valid: this.metrics.projetos_do_mesmo_proponente.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.projetos_do_mesmo_proponente.outlier, this.metrics.projetos_do_mesmo_proponente.valor_valido),
        minimum_expected: this.metrics.projetos_do_mesmo_proponente.minimo_esperado,
        maximum_expected: this.metrics.projetos_do_mesmo_proponente.maximo_esperado,
        type: "proponents-list",

        proponent_projects: this.metrics.projetos_do_mesmo_proponente.projetos_submetidos,
        reason: ""
      },
      new_providers: {
        name_title: "Novos fornecedores",
        value: this.metrics.novos_fornecedores.valor,
        value_text: this.metrics.novos_fornecedores.valor,
        value_is_valid: this.metrics.novos_fornecedores.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.novos_fornecedores.outlier, this.metrics.novos_fornecedores.valor_valido),
        minimum_expected: this.metrics.novos_fornecedores.minimo_esperado,
        maximum_expected: this.metrics.novos_fornecedores.maximo_esperado,
        type: "providers-list",
        reason: "",

        providers: this.metrics.novos_fornecedores.lista_de_novos_fornecedores,
      } ,
      approved_value: {
        name_title: "Valor aprovado",
        helper_text:
          "Indica a proporção de fornecedores que nunca participaram de projetos de incentivo antes em relação ao total de fornecedores envolvidos com o projeto. Também lista os itens orçamentários dos novos fornecedores.",
        value: this.metrics.valor_aprovado.valor,
        value_text: "R$ " + this.setMoneyFormat(this.metrics.valor_aprovado.valor),
        value_is_valid: this.metrics.valor_aprovado.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.valor_aprovado.outlier, this.metrics.valor_aprovado.valor_valido),
        minimum_expected: this.metrics.valor_aprovado.minimo_esperado,
        maximum_expected: "R$ "+ this.setMoneyFormat(this.metrics.valor_aprovado.maximo_esperado),
        type: "bar",

        bar: {},
      },
      vouchers_by_operation_code: {
        name_title: "Comprovantes por código de operação",
        helper_text:
          "Explicação da métricas",
        value: 2,
        value_text: this.setMoneyFormat(this.metrics.valor_aprovado.valor),
        value_is_valid: true,
        is_outlier: this.getColorStyle(this.metrics.valor_aprovado.outlier, this.metrics.valor_aprovado.valor_valido),
        minimum_expected: this.metrics.valor_aprovado.minimo_esperado,
        maximum_expected: this.metrics.valor_aprovado.maximo_esperado,

        type: "operation-code-list",
        operation_list: [{nome: "TED", codigos_de_operacao:[{nome: "Codigo 1 fdas fdsa fdsa fdsa fdsa fdsa fdsafdsafdsa fdas fds afd sa", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}, {nome: "Boleto", codigos_de_operacao:[{nome: "Codigo 1", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}, {nome: "Cheque", codigos_de_operacao:[{nome: "Codigo 1 fdas fdsa fdsa fdsa fdsa fdsa fdsafdsafdsa fdas fds afd sa", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}],
      },
      vouchers_above_50: {
        name_title: "Comprovantes com extrapolação acima de 50% do aprovado",
        helper_text:
          "Explicação da métricas",
        value: this.metrics.comprovantes_acima_de_50.valor,
        value_text: this.metrics.comprovantes_acima_de_50.valor,
        value_is_valid: this.metrics.comprovantes_acima_de_50.valor_valido,
        is_outlier: this.getColorStyle(this.metrics.comprovantes_acima_de_50.outlier, this.metrics.comprovantes_acima_de_50.valor_valido),
        minimum_expected: this.metrics.comprovantes_acima_de_50.minimo_esperado,
        maximum_expected: this.metrics.comprovantes_acima_de_50.maximo_esperado,

        type: "vouchers-above-50",
        vouchers_list: this.metrics.comprovantes_acima_de_50.lista_de_comprovantes
      }   
    };
  },
  props: {
    metrics: Object,
    user: Object
  },
  computed: {
    metrics_list: function () {
      return [
        this.valor_a_ser_comprovado,
        this.vouchers_above_50,
        this.projects_same_proponent,
        this.new_providers,
        this.budget_items,
        this.proof_payment,
        //this.approved_value,
        //this.vouchers_by_operation_code,
        //this.budget_items_unusual,
        //this.above_average_prices,
        //this.proven_value,
        //this.captured_value,
      ];
    }
  },
  methods: {
    setMoneyFormat(value){
        return (value).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.');
    },
    getColorStyle(isOutlier, valid){
      let color = "Metric-invalid";
      if(valid) {
        color = (isOutlier && valid) ? "Metric-bad" : "Metric-good";
      }
      return color;
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
