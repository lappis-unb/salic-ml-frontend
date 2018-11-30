<template>
  <div class="ui grid">
    <div v-if="metric.value!=0" v-for="operation in metric.operation_list" class="five wide column">
      <div class="header-title-operation"><strong>{{operation.nome}}</strong></div>
        <div v-for="(codigo, index) in operation.codigos_de_operacao" :key="codigo+index" class="accordion">
          <div class="title">
            <a :href="codigo.link">{{codigo.nome}}</a>
          </div>
          <div class="content">
            <div class="ui bulleted list" style="background: blue;">                          
              <div v-for="(item, index) in codigo.comprovantes" :key="index+index+item" class="item">
                <a href="item.link">{{item.nome}}</a>
              </div>
            </div> 		
          </div>
        </div>
    </div>
    <div v-else>Não há comprovantes por código de operação.</div>
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

<style>
.header-title-operation {
    margin-bottom: 15px;
}

</style>
