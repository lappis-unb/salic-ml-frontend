<template>
  <div>
    <p>
      O valor está
      <b v-if="(metrica.is_outlier)=='Metric-bad'">{{(metrica.valor>0) ? "acima" : "abaixo" }}</b>
      <b v-else>abaixo</b>
      do esperado, sendo este: {{metrica.maximo_esperado}}.
    </p>
  </div>
</template>

<script>
export default {
  name: "MetricBarContent",
  props: {
    metrica: Object
  }
};
</script>
