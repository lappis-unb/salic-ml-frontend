<template>
  <div>
  <div v-if="(metrica.comprovantes).length!=0">
    <div
      v-for="(object, index) in metrica.comprovantes"
      :key="index+object+index"
      class="accordion"
    >
      <div class="title">
        <i class="dropdown icon"></i>
        Código do comprovante: {{object.id_comprovante}}
      </div>
      <div class="content">
        <div class="ui bulleted list">
          <table class="ui celled table striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nome do Fornecedor</th>
                <th>CPF / CNPJ do Fornecedor</th>
                <th>Valor Comprovado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in object.itens" :key="index+index+item" class="item">
                <td data-label="Nome" id="name-cell">{{item.item}}</td>
                <td data-label="Nome do Fornecedor" id="value-cell">{{item.nome_fornecedor}}</td>
                <td data-label="CPF / CNPJ" id="value-cell">{{item.cpf_cnpj_fornecedor}}</td>
                <td data-label="Valor Comprovado" id="value-cell">{{setMoneyFormat(item.valor_comprovado)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    <div v-else>
        <p>Não há comprovantes.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownListCardContent",
  props: {
    metrica: Object
  },
  methods: {
    setMoneyFormat(value) {
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(value);
    }
  }
};
</script>
<style scoped>
#title {
  text-transform: capitalize;
}
</style>

