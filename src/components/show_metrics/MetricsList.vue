<template>
  <div class="ui basic segment" id="DiagnosticArea">
      <div class="ui styled fluid accordion" id="DiagnosticMetrics">
          <div class="title active" :class="metric.check_outlier">
              <div class="ui ribbon label">
                  <i class="icon"></i>
              </div>
              <span>{{metric.name}}: {{metric.value}}</span>
              <helper-metric :helper_text="metric.helper_text"/>
              <i class="dropdown icon"></i>
          </div>
          <div class="content active">
              <metric-content />
              <div class="ui divider"></div>
              <feedback-form />
          </div>
      </div>
  </div>
</template>

<script>
import FeedbackForm from './feedback/FeedbackForm.vue';
import HelperMetric from './metric/HelperMetric.vue';
import MetricCardContent from './metric/MetricCardContent.vue';

export default {
  name: "MetricsList",
  data: function() {
    return {
        metric: {
            name: "Itens orçamentários",
            value: 0,
            helper_text: "Compara a quantidade de itens deste projeto com a quantidade mais comum \
            de itens em projetos do mesmo segmento",
            check_outlier: "Metric-good",
        }
    };
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
  border: solid 2px yellow !;
} 

.ui.styled.accordion .accordion .title{
	border: none !important;
	color: red !important;
	padding-left: 0 !important;
    padding-bottom: 0 !important;
    border: solid 2px yellow;
}

.ui.styled.accordion .accordion .content{
    padding-left: 1.6em !important;
    border: solid 2px yellow;
}

/*************************** 
 ****** Metric Status ******
 ***************************/

.ui.ribbon.label {
    color: #FFF;
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
.Metric-bad .ui.ribbon.label{
	background-color: #db2828;
	border-color: #b21e1e;
}
.Metric-bad .icon:before{
	content: "\f2c7"; /* Thermometer full */
}


.Metric-average {
	color: #f2b01c !important;
}
.Metric-average .ui.ribbon.label{
	background-color: #f2b01c;
	border-color: #cf910c;
}
.Metric-average .icon:before{
	content: "\f2c9"; /* Thermometer half full */
} 


.Metric-good {
	color: #666 !important;
}
.Metric-good .ui.ribbon.label{
	color: #666;
	background-color: #E7E7E7;
	border-color: #E7E7E7;
}
.Metric-good .icon:before{
	content: "\f2cb"; /* Thermometer empty */
}
</style>
