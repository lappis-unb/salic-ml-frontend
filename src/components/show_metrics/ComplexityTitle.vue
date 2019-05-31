<template>
  <span>
    <router-link to="/" class="ui basic icon button" id="btBack">
      <i class="left arrow icon"></i>
    </router-link>
    <div class="ui sticky grid" id="Summary">
      <div hidden>{{ value }}</div>
      <div class="four wide center aligned column" id="score">
        <div id="indicatorContainer"></div>
        <h3>{{ getSubtitle }}</h3>
      </div>
      <div class="twelve wide column">
        <h3>Complexidade da análise de resultado para:</h3>
        <h1>{{ project.nome }} ({{ project.pronac }})</h1>
      </div>
    </div>
  </span>
</template>

<script>
let radialIndicator = require("@/../public/assets/js/radialIndicator.js");

export default {
  name: "ComplexityTitle",
  data: function() {
    return {
      radialObj: ""
    };
  },
  props: {
    project: Object,
    value: Number
  },
  computed: {
    getSubtitle: function() {
      let complexidade = "Normal";
      if (this.value > 6) complexidade = "Muito Complexo";
      else if (this.value > 3) complexidade = "Complexo";
      return complexidade;
    }
  },
  mounted: function() {
    radialIndicator;
    this.radialObj = $("#indicatorContainer")
      .radialIndicator({
        radius: 70,
        barColor: {
          0: "#1b5e20",
          3: "#1b5e20",
          4: "#f2b01c",
          6: "#f2b01c",
          7: "#db2828",
          10: "#db2828"
        },
        maxValue: 10,
        minValue: 0,
        barWidth: 10,
        initValue: 0,
        displayNumber: true,
        roundCorner: true,
        percentage: false,
        interpolate: false
      })
      .data("radialIndicator");
    this.radialObj.value(this.value);
  }
};
</script>

<style>
/***************************
 ********* Summary *********
 ***************************/
#btBack {
  position: absolute;
  top: 1em;
  left: 1em;
}

#Summary {
  padding: 2em 0;
}

#Summary h1 {
  font-size: 3.2em;
  font-style: italic;
  margin: 0.2em 0 0;
}

#Summary h3 {
  margin: 0;
}
</style>
