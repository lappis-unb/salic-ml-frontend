<template>
    <div class="ui clearing basic segment" id="Summary">
      <div id="indicatorContainer"></div>
      <h1 class="ui header">
          Diagnóstico de complexidade da prestação de contas
      </h1>
    </div>
</template>

<script>
import radialIndicator from "@/../public/assets/js/radialIndicator.js";

export default {
  name: "ComplexityTitle",
  data: function() {
    return {
      indicator_value: this.value
    };
  },
  props: {
    value: Number
  },
  mounted: function() {
    var radialObj = $("#indicatorContainer")
      .radialIndicator({
        radius: 70,
        barColor: {
          0: "#DB2828",
          3: "#DB2828",
          8: "#F2B01C",
          10: "#1B5E20",
        },
        maxValue: 10,
        barWidth: 10,
        initValue: 0,
        roundCorner: true,
        percentage: false,
      })
      .data("radialIndicator");
    console.log(this.indicator_value)
    radialObj.value(this.indicator_value);
  }
};
</script>

<style>
/*************************** 
 ********* Summary *********
 ***************************/
#Summary {
  display: table;
}

#Summary .c100 {
  margin: 0 0.2em 0 0;
}

#Summary .ui.header {
  display: table-cell;
  font-size: 4em;
  font-style: italic;
  padding: 0 0 0 35px;
  vertical-align: middle;
}
</style>
