<template>
  <div>
    <table v-if="metrica.valor!=0" class="ui celled table striped">
      <thead>
        <tr>
          <th id="complexity-cell">Comp.</th>
          <th>Nome</th>
          <th id="center-cell">Valor Comprovado (R$)</th>
          <th id="value-cell">Valor Captado (R$)</th>
          <th id="complexity-cell">Sit.</th>
          <th>Período de execução</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in proponent_list" style="cursor: pointer;" :key="project+index" v-on:click="changePage(project)">
          <td data-label="Complexidade" id="complexity-cell">{{ project.complexidade }}</td>
          <td data-label="Nome" id="name-cell">{{project.nome}} ({{project.pronac}})</td>
          <td
            data-label="Valor Comprovado"
            id="value-cell"
          >{{setMoneyFormat(project.valor_comprovado)}}</td>
          <td data-label="Valor Captado" id="value-cell">{{setMoneyFormat(project.valor_captado)}}</td>
          <td
            data-label="Sit."
            id="center-cell"
            :data-tooltip="(project.situacao).replace((project.situacao).split(' ', 1)[0] + ' - ', '')"
          >{{(project.situacao).split(" ", 1)[0]}}</td>
          <td
            data-label="Período de execução"
            id="period-cell"
          >{{formateDate(project.data_inicio, project.data_final)}}</td>
        </tr>
      </tbody>
    </table>
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
      text: "",
      proponent_list: ((this.metrica.proponent_projects).sort((a, b) => ((new Date(a.data_final)) > (new Date(b.data_final))) ? 1 : -1))
    };
  },
  methods: {
    changePage(project){ 
        this.$router.push(project.pronac);
        window.location.reload(true);
    },
    setMoneyFormat(value) {
      if (value)
        return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "BRL"
        })
          .format(value)
          .replace("R$", "");
      else return "-";
    },
    formateDate(begin, end) {
      if (begin && end) {
        let start = begin.slice(5, 7) + "/" + begin.slice(0, 4);
        let final = end.slice(5, 7) + "/" + end.slice(0, 4);
        let date = start + " à " + final;

        return date === "/ à /" ? "-" : date;
      } else return "-";
    },
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

#center-cell {
  text-align: center;
}
</style>
