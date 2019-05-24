<template>
  <div>
    <div v-if="metrica.valor!=0" >
      <div class="ui bulleted list">
         <ul v-for="(item, index) in metrica.lista_de_comprovantes" :key="item+index" class="item">
        <li>{{item.nome}}: 
          <strong>{{(item.porcentagem).toFixed(0)}}%</strong></li>
      </ul>
      </div>
        <!--<a :href="metrica.link_da_planilha">Acesse a Planilha</a>-->
    </div>
    <div v-else>Não há comprovantes com preços acima de 50%.</div>
    </div>
</template>

<style>
  a {
    font-weight: bold; 
    color: #0099a8 !important;
  }

  a:hover {
    color: #003f70 !important;
    text-decoration: underline !important;
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
