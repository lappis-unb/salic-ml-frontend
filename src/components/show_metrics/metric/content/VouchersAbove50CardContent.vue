<template>
    <div>
        <div v-if="metrica.value!=0" class="ui bulleted list">
          <ul  v-for="(item, index) in metrica.vouchers_list" :key="item+index" class="item">
            <li><a target="_blank" :href="item.link">{{item.nome}} - {{item.porcentagem}}%</a></li>
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
