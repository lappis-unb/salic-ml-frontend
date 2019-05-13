<template>
  <div class="ui basic segment" id="DiagnosticArea">
    <div
      v-for="(metrica, index) in metricas"
      :key="metrica.tipo + index"
      class="ui styled fluid accordion"
      id="DiagnosticMetrics"
    >
      <div class="title" :class="metrica.is_outlier">
        <div class="ui ribbon label">
          <i class="icon"></i>
        </div>
        <span>
          <span v-html="metrica.nome">{{ metrica.nome }}</span>
          : {{ metrica.valor_valido ? metrica.valor_formatado : "não disp." }}
        </span>
        <helper-metric :helper_text="metrica.explicacao" />
        <i class="dropdown icon"></i>
      </div>
      <div class="content">
        <metric-content :metrica="metrica" />
      </div>
    </div>
  </div>
</template>

<script>
import HelperMetric from "./HelperMetric.vue";
import MetricCardContent from "./MetricCardContent.vue";

export default {
  name: "MetricsList",
  props: {
    metricas: Array
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
  font-size: 1.5em !important;
  line-height: 1;
  display: flex;
  align-items: center;
}

.ui.styled.accordion > .title .dropdown.icon {
  color: #000;
  margin-left: auto;
}

.ui.styled.accordion .content {
  margin: 0 0 0 3em !important;
}

/*** Nested accordion ***/

.ui.styled.accordion .accordion {
  box-shadow: none !important;
  margin: 0 0 0.5em 0 !important;
}

.ui.styled.accordion .accordion .title {
  border: none !important;
  color: black !important;
  padding-left: 0 !important;
  padding-bottom: 0 !important;
}

.ui.styled.accordion .accordion .content {
  margin: 0 !important;
  padding-left: 1.6em !important;
}

/***************************
 ****** Metric Status ******
 ***************************/

.ui.ribbon.label {
  color: #fff;
  margin-left: 0;
  left: calc(-1.5rem - 1.2em) !important;
  padding: 1em 0 1em 1.2em !important;
}

.ui.ribbon.label .icon {
  font-size: 2em;
  padding-left: 0.2em;
}

/***** Types styles *****/

.title.Metric-bad {
  color: #db2828 !important;
}
.Metric-bad .ui.ribbon.label {
  background-color: #db2828;
  border-color: #841818;
  /*	border-left-width: 1em;*/
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
  color: #1b5e20 !important;
}
.Metric-good .ui.ribbon.label {
  color: white;
  background-color: #1b5e20;
  border-color: #0d2e10;
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
  border-color: #b9b9b9;
}
.Metric-invalid .icon:before {
  content: "\f2cb"; /* Thermometer empty */
}
</style>
