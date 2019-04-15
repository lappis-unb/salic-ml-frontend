<template>
  <div>
    <table v-if="metrica.valor!=0" class="ui celled striped collapsing table  ">
      <thead>
        <tr>
            <th>Itens a serem comprovados</th>
            <th id="value-cell">Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in metrica.list" :key="project+index">
          <td data-label="Nome" id="name-cell">{{project.nome}} ({{project.pronac}})</td>
          <td data-label="Valor (R$)" id="value-cell">{{setMoneyFormat(project.valor_captado)}}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Não há items a serem comprovados.</div>
  </div>
</template>

<script>
export default {
  name: "ItemsTableContent",
  props: {
    metrica: Object
  },
  data(){
    return {
      code: "",
      text: ""
    }
  },
  methods: {
    setMoneyFormat(value){
        var sinal = '+ ';
        if(value<0) sinal = '- ';
        else if (value==0) sinal = '';
        return sinal + (value).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.');
    },
  },
};
</script>

<style>
#complexity-cell {
    text-align: center;
}

#period-cell {
    text-align: center;
}

#value-cell {
    text-align: right;
    min-width: 10em;
}

#name-cell {
/*    max-width: 18em;*/
}

#situation-cell {
    text-align: center;
}

</style>
