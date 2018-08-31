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
      indicator_value: Math.round(this.value)
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
          0: "#1B5E20",
          30: "#F2B01C",
          80: "#DB2828",
          100: "#DB2828",
        },
        maxValue: 100,
        barWidth: 10,
        initValue: 0,
        roundCorner: true,
        percentage: true,
      })
      .data("radialIndicator");
    
    radialObj.animate(this.indicator_value);
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
