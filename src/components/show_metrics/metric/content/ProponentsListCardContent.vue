<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
            <th>Pronac</th>
            <th>Nome</th>
            <th>Valor Comprovado</th>
            <th>Valor Captado</th>
            <th>Etapa</th>
            <th>Situação</th>
            <th>Data Início</th>
            <th>Data Fim</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in metric.proponent_projects" :key="project+index">
          <td data-label="Pronac">{{project.pronac}}</td>
          <td data-label="Nome">{{project.nome}}</td>
          <td data-label="Valor Comprovado">{{project.valor_comprovado}}</td>
          <td data-label="Valor Captado">{{project.valor_captado}}</td>
          <td data-label="Etapa">{{project.etapa}}</td>
          <td data-label="Situação">{{project.situacao}}</td>
          <td data-label="Data Início">{{project.data_inicio}}</td>
          <td data-label="Data Fim">{{project.data_fim}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProponentsListCardContent",
  props: {
    metric: Object
  }
};
</script>
