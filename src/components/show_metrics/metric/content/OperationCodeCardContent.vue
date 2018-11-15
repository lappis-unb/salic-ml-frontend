<template>
  <div class="ui grid">
    <div v-for="operation in metric.operation_list" class="five wide column">
      <div class="list header">{{operation.nome}}</div>
      <div class="ui bulleted list">                          
        <div v-for="(codigo, index) in operation.codigos_de_operacao" :key="codigo+index" class="item">
          <a :href="codigo.link">{{codigo.nome}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperationCodeCardContent",
  props: {
    metric: Object
  }
};
</script>
