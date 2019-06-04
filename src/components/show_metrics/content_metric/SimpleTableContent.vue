<template>
  <div>
    <div v-if="metrica.valor!=0">
    <table class="ui celled table striped">
      <thead>
        <tr>
          <th id="complexity-cell">Comp.</th>
          <th>Nome</th>
          <th id="value-cell">Valor Comprovado (R$)</th>
          <th id="value-cell">Valor Captado (R$)</th>
          <th id="complexity-cell">Sit.</th>
          <th>Período de execução</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in metrica.proponent_projects" :key="project+index">
          <td data-label="Complexidade" id="complexity-cell">{{ (project.complexidade) }}</td>
          <td data-label="Nome" id="name-cell">{{project.nome}} ({{project.pronac}})</td>
          <td
            data-label="Valor Comprovado"
            id="value-cell"
          >{{setMoneyFormat(project.valor_comprovado)}}</td>
          <td data-label="Valor Captado" id="value-cell">{{setMoneyFormat(project.valor_captado)}}</td>
          <td
            data-label="Sit."
            id="situation-cell"
            :data-tooltip="project.situacao"
            >{{project.situacao ? project.situacao.split(' ', 1)[0] : ''}}</td>
          <td
            data-label="Período de execução"
            id="period-cell"
          >{{formateDate(project.data_inicio, project.data_final)}}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-else>Não há projetos do mesmo proponente.</div>
  </div>
</template>

<script>
export default {
  name: "SimpleTableContent",
  props: {
    metrica: Object
  },
  data() {
    return {
      code: "",
      text: ""
    };
  },
  methods: {
    setMoneyFormat(value) {
        return Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
          .format(value)
          .replace("R$", "");
    },
    formateDate(begin, end) {
      if (begin && end) {
        let start = begin.slice(8, 10) + '/' + begin.slice(5, 7) + '/' + begin.slice(0, 4);
        let final = end.slice(8, 10) + '/' + end.slice(5, 7) + '/' + end.slice(0, 4);
        let date =  start + " à " + final;

        return date === "/ à /" ? "-" : date;
      }
      return "";
    }
  }
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
  max-width: 7em;
}

#name-cell {
  max-width: 18em;
}

#situation-cell {
  text-align: center;
}
</style>
