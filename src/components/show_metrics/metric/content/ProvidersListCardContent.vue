<template>
  <div>
    <div v-if="metric.valor!=0" v-for="(provider, index) in metric.providers" :key="index+provider+index" class="accordion">
      <div class="title">
        <i class="dropdown icon"></i>
        {{provider.nome}}
      </div>
      <div class="content">
        <div class="ui bulleted list">                          
          <div v-for="(item, index) in provider.items" :key="index+index+item" class="item">
            <a href="item.link">{{item.nome}}</a>
          </div>
        </div> 		
      </div>
    </div>
    <div v-else>Não há novos fornecedores.</div>
  </div>
</template>

<script>
export default {
  name: "ProvidersListCardContent",
  props: {
    metric: Object
  }
};
</script>
