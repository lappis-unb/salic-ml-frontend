<template>
  <div>
    <div v-if="metric.items.length!==0" class="ui bulleted list">
      <ul v-for="(item, index) in metric.items" :key="item+index" class="item">
        <li v-if="item.has_receipt">
          <!--<a target="_blank" :href="item.link">{{item.nome}}</a>-->
          {{item.nome}}
        </li>
        <li v-else>{{item.nome}} (sem comprovante)</li>
      </ul>
    </div>
    <div v-else>Não há items com preço acima da média.</div>
  </div>
</template>

<script>
export default {
  name: "AboveAveragePricesCardContent",
  props: {
    metric: Object
  }
};
</script>
