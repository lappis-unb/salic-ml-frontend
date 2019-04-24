<template>
  <div>
      <strong>
        <a class="Link" :href="metrica.link_da_planilha">Acesse a Planilha</a>
      </strong>
      <pre>
        </pre>
    <div v-if="metrica.valor!=0" class="ui bulleted list">
         <ul v-for="(item, index) in metrica.lista_de_comprovantes" :key="item+index" class="item">
        <li>{{item.nome}}: <strong>{{(item.porcentagem).toFixed(0)}}%</strong></li>
      </ul>
    </div>
    <div v-else>Não há comprovantes com preços acima de 50%.</div>
  </div>
</template>

<style>

  .Link {
    font-weight: bold; 
    cursor: pointer;
    color: #0099a8;
  }

  .Link:hover {
    color: #003f70;
    text-decoration: underline;
  }

</style>

<script>
export default {
  name: "VouchersAbove50",
  props: {
    metrica: Object
  }
};
</script>