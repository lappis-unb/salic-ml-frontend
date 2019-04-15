<template>
    <div>
        <div v-if="metrica.valor!=0" class="ui bulleted list">
          <strong><a :href="metrica.link_da_planilha">Link para a planilha</a></strong>
          <ul  v-for="(item, index) in metrica.lista_de_comprovantes" :key="item+index" class="item">
            <li>{{item.nome}} - {{(item.porcentagem).toFixed(2)}}%</li>
          </ul>
        </div>
        <div v-else>Não há comprovantes com preços acima de 50%.</div>
    </div>
</template>

<script>
export default {
  name: "VouchersAbove50",
  props: {
    metrica: Object
  }
};
</script>
