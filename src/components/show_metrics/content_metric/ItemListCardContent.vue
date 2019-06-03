<template>
  <div>
    <div class="ui grid">
      <div class="eight wide column">
        <div class="list header" v-if="metric.items_incomuns">Itens inesperados</div>
        <div class="ui bulleted list">
          <div v-for="(item, index) in metric.items_incomuns" :key="item+index" class="item">
            <a :href="item.link">{{item.nome}}</a>
          </div>
        </div>
      </div>
      <div class="eight wide column">
        <div class="list header" v-if="metric.items_comuns_que_o_projeto_nao_possui">Itens ausentes</div>
        <div class="ui bulleted list">
          <div
            v-for="(item, index) in metric.items_comuns_que_o_projeto_nao_possui"
            :key="item+index+index"
            class="item"
          >
            <!--<a :href="item.link">{{item.nome}}</a>-->
            <p>{{item.nome}}</p>
          </div>
        </div>
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
