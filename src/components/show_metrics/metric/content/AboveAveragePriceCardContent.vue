<template>
  <div>
    <div class="ui bulleted list">
      <ul  v-for="(item, index) in metric.items" :key="item+index" class="item">
        <li v-if="item.has_receipt"><a target="_blank" :href="item.link">{{item.name}}</a></li>
        <li v-else>{{item.name}} (sem comprovante)</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboveAveragePriceCardContent",
  props: {
    metric: Object
  }
};
</script>
