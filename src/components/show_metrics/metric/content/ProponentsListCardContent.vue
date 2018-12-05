<template>
  <div>
    <table v-if="metric.value!=0" class="ui celled table">
      <thead>
        <tr>
            <th>Complexidade</th>
            <th>Pronac</th>
            <th>Nome</th>
            <th>Valor Comprovado(R$)</th>
            <th>Valor Captado(R$)</th>
            <th>Situação</th>
            <th>Período de execução</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in metric.proponent_projects" :key="project+index">
          <td data-label="Complexidade">{{project.complexity}}</td>
          <td data-label="Pronac">{{project.pronac}}</td>
          <td data-label="Nome">{{project.nome}}</td>
          <td data-label="Valor Comprovado">{{setMoneyFormat(project.valor_comprovado)}}</td>
          <td data-label="Valor Captado">{{setMoneyFormat(project.valor_captado)}}</td>
          <td data-label="Situação">{{project.situacao}}</td>
          <td data-label="Período de execução">{{formateDate(project.data_inicio, project.data_fim)}}</td>
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
        return  begin.slice(0,11) + " / " + end.slice(0, 11);
    }
  },
};
</script>
