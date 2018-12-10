<template>
  <div>
    <table v-if="metric.value!=0" class="ui celled table">
      <thead>
        <tr>
            <th>Comp.</th>
            <th>Nome</th>
            <th>Valor Comprovado (R$)</th>
            <th>Valor Captado (R$)</th>
            <th>Situação</th>
            <th>Período de execução</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in metric.proponent_projects" :key="project+index">
          <td data-label="Complexidade" id="complexity-cell">{{ (project.complexidade) }}</td>
          <td data-label="Nome" id="name-cell">{{project.nome}} ({{project.pronac}})</td>
          <td data-label="Valor Captado" id="value-cell">{{setMoneyFormat(project.valor_captado)}}</td>
          <td data-label="Valor Comprovado" id="value-cell">{{setMoneyFormat(project.valor_comprovado)}}</td>
          <td data-label="Situação">{{project.situacao}}</td>
          <td data-label="Período de execução" id="period-cell">{{formateDate(project.data_inicio, project.data_fim)}}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>Não há projetos do mesmo proponente.</div>
  </div>
</template>

<script>
export default {
  name: "ProponentsListCardContent",
  props: {
    metric: Object
  },
  methods: {
    setMoneyFormat(value){
        return (value).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.');
    },
    formateDate(begin, end){
        let start =  begin.slice(5,7) + '/' + begin.slice(0,4);
        let final =  end.slice(5,7) + '/' + end.slice(0,4);
        let date = start + " à " + final
         
        return (date==="/ à /") ? "-" : date;
    }
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
}

#name-cell {
    max-width: 18em;
}

</style>
