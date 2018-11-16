<template>
  <div>
    <p>O valor está acima do esperado, sendo este: {{metric.maximum_expected}}.</p>
    <!--
        <div class="ui pointing below label" :class="metric.outlier_check" id="MedianDisplay-Project">
          Este projeto
        </div>
        <div class="ui progress" :data-value="metric.bar.interval" :data-total="metric.bar.max_value" id="bar">
          <div class="bar" id="barra">
            <div class="progress"></div>
          </div>
        </div>
    -->
  </div>
</template>

<script>
export default {
  name: "MetricBarContent",
  data: function() {
    return {
      // metric: {
      //   type: 'list-proponents',
      //   interval_start: 30,
      //   interval_end: 70,
      //   bar: {
      //     interval: 50,
      //     max_value: 100
      //   }
      // }
    };
  },
  mounted: function() {
		/*
    var self = this
    $("#bar").progress({
      label: "ratio",
      text: {
        ratio: self.metric.interval_start + " de " + self.metric.interval_end + " Média de itens"
      }
    });
    $("#MedianDisplay-TotalItems").progress("increment");

    var mark_project = document.getElementById("MedianDisplay-Project");
    mark_project.addEventListener(
      "load",
      changeWidthBar(mark_project, document.getElementById("barra"))
    );
    function changeWidthBar(x, y) {
      // Barra
      y.style.left = "10" + "%";
      // Project
      var value = "50";
      x.style.left = value - 3 + "%";
    }
    */
  },
  props: {
    metric: Object
  }
};
</script>
