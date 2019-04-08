<template>
    <div>
        <div v-if="metrica.valor!=0" class="ui bulleted list">
          <ul  v-for="(item, index) in metrica.lista_de_comprovantes" :key="item+index" class="item">
            <li><a target="_blank" :href="item.link">{{item.item}} - {{((item.approved_value/item.verified_value) * 100).toFixed(2)}}%</a></li>
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
