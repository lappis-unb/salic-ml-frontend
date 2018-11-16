<template>
  <div class="ui grid">
    <div class="eight wide column">
      <div class="list header" v-if="metric.uncommon_items">Itens inesperados</div>
      <div class="ui bulleted list">                          
        <div v-for="(item, index) in metric.uncommon_items" :key="item+index" class="item">
          <a :href="item.link">{{item.nome}}</a>
        </div>
      </div>
    </div>
    <div class="eight wide column">
      <div class="list header" v-if="metric.common_items_not_in_project">Itens ausentes</div>
      <div class="ui bulleted list">                          
        <div v-for="(item, index) in metric.common_items_not_in_project" :key="item+index+index" class="item">
        <a :href="item.link">{{item.nome}}</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemListCardContent",
  props: {
    metric: Object
  }
};
</script>
