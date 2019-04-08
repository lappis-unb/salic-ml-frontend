export function getFinancialMetrics(metricas) {
  return {
    valor_a_ser_comprovado: getValorASerComprovado(metricas),
    itens_orcamentarios: getItensOrcamentarios(metricas),
    comprovantes_com_extrapolacao_de_50: getComprovantesComExtrapolacaoDe50(metricas),
    projetos_mesmo_proponente: getProjetosDoMesmoProponente(metricas),
    novos_fornecedores: getNovosFornecedores(metricas),
    comprovantes_de_transferencia: getComprovantesDeTransferencia(metricas),
    comprovantes_de_saque: getComprovantesDeSaque(metricas),
    comprovantes_de_cheque: getComprovantesDeCheque(metricas),
    //comprovantes_pagamento: getComprovantesDePagamento(metricas),
  }
}

function getMetricTemplate() {
  return {
    valor: 0,
    valor_formatado: 0,
    valor_valido: false,
    is_outlier: "Metric-invalid",
    minimo_esperado: 0,
    maximo_esperado: 0,
  }
};

function setMoneyFormat(value) {
  return (value).toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

function getColorStyle(isOutlier, valid) {
  let color = "Metric-invalid";

  if (valid) {
    color = (isOutlier && valid) ? "Metric-bad" : "Metric-good";
  }

  return color;
}

function getItensOrcamentarios(metricas) {

  let itens_orcamentarios = {};

  try {
    itens_orcamentarios.valor = metricas.itens_orcamentarios.valor;
    itens_orcamentarios.valor_formatado = metricas.itens_orcamentarios.valor;
    itens_orcamentarios.valor_valido = metricas.itens_orcamentarios.valor_valido;
    itens_orcamentarios.is_outlier = getColorStyle(metricas.itens_orcamentarios.is_outlier, metricas.itens_orcamentarios.valor_valido);
    itens_orcamentarios.minimo_esperado = metricas.itens_orcamentarios.minimo_esperado;
    itens_orcamentarios.maximo_esperado = parseInt(metricas.itens_orcamentarios.maximo_esperado);
  }
  catch {
    itens_orcamentarios = getMetricTemplate();
  }

  itens_orcamentarios.nome = "Itens orçamentários";
  itens_orcamentarios.explicacao = "Compara a quantidade de itens deste projeto com a quantidade mais comum de itens em projetos do mesmo segmento";
  itens_orcamentarios.tipo = "simples";

  return itens_orcamentarios;
}

function getValorASerComprovado(metricas) {
  let texto_de_ajuda = "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento";
  let sinais = '';

  let template_base = {};

  try {
    template_base.valor = metricas.valor_a_ser_comprovado.valor;
    template_base.valor_formatado = "R$ " + sinais + parseFloat(metricas.valor_a_ser_comprovado.valor).toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
    template_base.valor_valido = metricas.valor_a_ser_comprovado.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.valor_a_ser_comprovado.is_outlier, metricas.valor_a_ser_comprovado.valor_valido);
    template_base.minimo_esperado = metricas.valor_a_ser_comprovado.minimo_esperado;
    template_base.maximo_esperado = "R$ " + setMoneyFormat(metricas.valor_a_ser_comprovado.maximo_esperado);
    template_base.valor_indisponivel = (metricas.valor_a_ser_comprovado.valor) ? true : false;
    template_base.list = [{ nome: "Item", pronac: 1234, valor_captado: 30 }]
  }
  catch {
    template_base = getMetricTemplate();
    template_base.list = []
  }

  template_base.nome = "Valor a ser comprovado*";
  template_base.explicacao = texto_de_ajuda;
  template_base.tipo = "tabela-de-items";

  return template_base;
}

function getComprovantesComExtrapolacaoDe50(metricas) {

  let template_base = {}

  try {
    template_base.valor = metricas.comprovantes_acima_de_50.valor;
    template_base.valor_formatado = metricas.comprovantes_acima_de_50.valor;
    template_base.valor_valido = metricas.comprovantes_acima_de_50.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.comprovantes_acima_de_50.is_outlier, metricas.comprovantes_acima_de_50.valor_valido);
    template_base.minimo_esperado = metricas.comprovantes_acima_de_50.minimo_esperado;
    template_base.maximo_esperado = metricas.comprovantes_acima_de_50.maximo_esperado;
    template_base.valor_indisponivel = (metricas.comprovantes_acima_de_50.valor) ? true : false;

    template_base.lista_de_comprovantes = metricas.comprovantes_acima_de_50.data.lista_de_comprovantes
  }
  catch {
    template_base = getMetricTemplate();
  }

  template_base.nome = "Comprovantes com extrapolação<br><span style='margin-left:85px;'>acima de 50% do aprovado</span>";
  template_base.explicacao = "Explicação da métricas";
  template_base.tipo = "lista-simples";

  return template_base;
}

function getComprovantesDePagamento(metricas) {
  let texto_de_ajuda = "Compara a quantidade de comprovantes deste projeto com a \
  quantidade mais comum de comprovantes em projetos do mesmo segmento";

  return {
    nome: "Comprovantes de pagamento",
    explicacao: texto_de_ajuda,
    tipo: "simples",
    valor: metricas.comprovantes_pagamento.valor,
    valor_formatado: metricas.comprovantes_pagamento.valor + "%",
    valor_valido: metricas.comprovantes_pagamento.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_pagamento.is_outlier, metricas.comprovantes_pagamento.valor_valido),
    minimo_esperado: metricas.comprovantes_pagamento.minimo_esperado,
    maximo_esperado: "R$ " + setMoneyFormat(metricas.comprovantes_pagamento.maximo_esperado),
    valor_indisponivel: (metricas.comprovantes_pagamento.valor) ? true : false,
  }
}

function getProjetosDoMesmoProponente(metricas) {
  let template_base = {};

  try {
    template_base = {
      valor: metricas.projetos_mesmo_proponente.valor,
      valor_formatado: metricas.projetos_mesmo_proponente.valor,
      valor_valido: metricas.projetos_mesmo_proponente.valor_valido,
      is_outlier: getColorStyle(metricas.projetos_mesmo_proponente.is_outlier, metricas.projetos_mesmo_proponente.valor_valido),
      minimo_esperado: metricas.projetos_mesmo_proponente.minimo_esperado,
      maximo_esperado: metricas.projetos_mesmo_proponente.maximo_esperado,
      valor_indisponivel: (metricas.projetos_mesmo_proponente.valor) ? true : false,

      proponent_projects: metricas.projetos_mesmo_proponente.data.projetos_submetidos,
    }
  }
  catch {
    template_base = getMetricTemplate();
  }

  template_base.nome = "Projetos do mesmo proponente";
  template_base.explicacao = "Indica os projetos que o proponente já executou no passado.";
  template_base.tipo = "tabela-simples";

  return template_base;
}

function getNovosFornecedores(metricas) {

  let template_base = {};

  try {
    template_base.valor = metricas.novos_fornecedores.valor;
    template_base.valor_formatado = metricas.novos_fornecedores.valor;
    template_base.valor_valido = metricas.novos_fornecedores.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.novos_fornecedores.is_outlier, metricas.novos_fornecedores.valor_valido);
    template_base.minimo_esperado = metricas.novos_fornecedores.minimo_esperado;
    template_base.maximo_esperado = metricas.novos_fornecedores.maximo_esperado;
    template_base.valor_indisponivel = (metricas.novos_fornecedores.valor) ? true : false;

    template_base.list = metricas.novos_fornecedores.data.lista_de_novos_fornecedores;
  }
  catch {
    template_base = getMetricTemplate();
  }

  template_base.nome = "Novos fornecedores";
  template_base.explicacao = "Informa uma lista dos novos fornecedores";
  template_base.tipo = "lista-com-dropdown";

  return template_base;
}

function getComprovantesDeTransferencia(metrics) {
  // Deletar isso depois
  let metricas = { comprovantes_de_transferencia: { valor: 123, valor_valido: true, is_outlier: false, maximo_esperado: 0, minimo_esperado: 0 } }
  let template_base = {};
  try {

    template_base.valor = metricas.comprovantes_de_transferencia.valor;
    template_base.valor_formatado = metricas.comprovantes_de_transferencia.valor;
    template_base.valor_valido = metricas.comprovantes_de_transferencia.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.comprovantes_de_transferencia.is_outlier, metricas.comprovantes_de_transferencia.valor_valido);
    template_base.minimo_esperado = metricas.comprovantes_de_transferencia.minimo_esperado;
    template_base.maximo_esperado = metricas.comprovantes_de_transferencia.maximo_esperado;
    template_base.valor_indisponivel = (metricas.comprovantes_de_transferencia.valor) ? true : false;

    template_base.list = [
      {
        "cnpj_cpf": 99714833000,
        "nome": "Alexsandro da Silva Maciel",
        "itens": [
          { "id": 842881, "nome": "Instrutor", "link": "#" },
          {
            "id": 842896,
            "nome": "Contribui\u00e7\u00e3o Patronal",
            "link": "#"
          }
        ]
      },
    ];
  }
  catch{
    template_base = getMetricTemplate();
  }

  template_base.nome = "Comprovantes de transferência*";
  template_base.explicacao = "Explicação da métricas";
  template_base.tipo = "lista-com-dropdown";

  return template_base;
}

function getComprovantesDeSaque(metrics) {
  // Deletar isso depois
  let metricas = { comprovantes_de_saque: { valor: 123, valor_valido: true, is_outlier: false, maximo_esperado: 0, minimo_esperado: 0 } }
  let template_base = {};
  try {

    template_base.valor = metricas.comprovantes_de_saque.valor;
    template_base.valor_formatado = metricas.comprovantes_de_saque.valor;
    template_base.valor_valido = metricas.comprovantes_de_saque.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.comprovantes_de_saque.is_outlier, metricas.comprovantes_de_saque.valor_valido);
    template_base.minimo_esperado = metricas.comprovantes_de_saque.minimo_esperado;
    template_base.maximo_esperado = metricas.comprovantes_de_saque.maximo_esperado;
    template_base.valor_indisponivel = (metricas.comprovantes_de_saque.valor) ? true : false;

    template_base.list = [
      {
        "cnpj_cpf": 99714833000,
        "nome": "Alexsandro da Silva Maciel",
        "itens": [
          { "id": 842881, "nome": "Instrutor", "link": "#" },
          {
            "id": 842896,
            "nome": "Contribui\u00e7\u00e3o Patronal",
            "link": "#"
          }
        ]
      },
    ];
  }
  catch{
    template_base = getMetricTemplate();
  }

  template_base.nome = "Comprovantes de saque*";
  template_base.explicacao = "Explicação da métricas";
  template_base.tipo = "lista-com-dropdown";

  return template_base;
}

function getComprovantesDeCheque(metrics) {
  // Deletar isso depois
  let metricas = { comprovantes_de_cheque: { valor: 123, valor_valido: true, is_outlier: false, maximo_esperado: 0, minimo_esperado: 0 } }
  let template_base = {};
  try {

    template_base.valor = metricas.comprovantes_de_cheque.valor;
    template_base.valor_formatado = metricas.comprovantes_de_cheque.valor;
    template_base.valor_valido = metricas.comprovantes_de_cheque.valor_valido;
    template_base.is_outlier = getColorStyle(metricas.comprovantes_de_cheque.is_outlier, metricas.comprovantes_de_cheque.valor_valido);
    template_base.minimo_esperado = metricas.comprovantes_de_cheque.minimo_esperado;
    template_base.maximo_esperado = metricas.comprovantes_de_cheque.maximo_esperado;
    template_base.valor_indisponivel = (metricas.comprovantes_de_cheque.valor) ? true : false;

    template_base.list = [
      {
        "cnpj_cpf": 99714833000,
        "nome": "Alexsandro da Silva Maciel",
        "itens": [
          { "id": 842881, "nome": "Instrutor", "link": "#" },
          {
            "id": 842896,
            "nome": "Contribui\u00e7\u00e3o Patronal",
            "link": "#"
          }
        ]
      },
    ];
  }
  catch{
    template_base = getMetricTemplate();
  }

  template_base.nome = "Comprovantes de cheque*";
  template_base.explicacao = "Explicação da métricas";
  template_base.tipo = "lista-com-dropdown";

  return template_base;
}


// As métricas abaixo não estão sendo utilizadas para a analise de complexidade financeira

/*
function precosAcimaDaMedia(metricas){

  return {
  nome: "Preços acima da média",
    explicacao: "Verifica a quantidade de itens com valor acima da mediana histórica neste projeto e compara com \
  a quantidade mais frequente de itens acima da mediana em projetos do mesmo segmento",
    valor: metricas.precos_acima_da_media.valor,
    valor_formatado: metricas.precos_acima_da_media.valor,
    valor_valido: metricas.precos_acima_da_media.valor_valido,
    is_outlier: getColorStyle(metricas.precos_acima_da_media.is_outlier, metricas.precos_acima_da_media.valor_valido),
    tipo: "above-average-prices-list",
    minimo_esperado: metricas.precos_acima_da_media.minimo_esperado,
    maximo_esperado: metricas.precos_acima_da_media.maximo_esperado,
    valor_indisponivel: (metricas.precos_acima_da_media.valor) ? true : false,

    items: metricas.precos_acima_da_media.data.items,
}
}

function getItensOrcamentariosInesperados(metricas){

  return {
  nome: "Itens orçamentários inesperados",
    explicacao:
  "Indica os itens orçamentários deste projeto que \
  não estão entre os mais comuns do segmento.\
  Também lista os itens que aparecem frequentemente em projetos do segmento, \
  mas que não aparecem neste projeto.",
    tipo: "items-list",
    valor: (metricas.itens_orcamentarios_inesperados.valor).toFixed(2),
    valor_formatado: (metricas.itens_orcamentarios_inesperados.valor).toFixed(2) + "%",
    valor_valido: metricas.itens_orcamentarios_inesperados.valor_valido,
    is_outlier: getColorStyle(metricas.itens_orcamentarios_inesperados.is_outlier, metricas.itens_orcamentarios_inesperados.valor_valido),
    minimo_esperado: metricas.itens_orcamentarios_inesperados.minimo_esperado,
    maximo_esperado: metricas.itens_orcamentarios_inesperados.maximo_esperado,
    valor_indisponivel: (metricas.itens_orcamentarios_inesperados.valor) ? true : false,

    common_items_not_in_project: metricas.itens_orcamentarios_inesperados.data.items_comuns_que_o_projeto_nao_possui,
    uncommon_items: metricas.itens_orcamentarios_inesperados.data.items_incomuns,
}
}

// Deprecated Metrics
function oldMetrics(metrica){

  return {
  proven_value: {
  nome: "Valor comprovado",
    explicacao:
  "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento",
    value: metricas.valor_comprovado.valor,
    valor_formatado: "R$ "+ setMoneyFormat(metricas.valor_comprovado.valor),
    valor_valido: metricas.valor_comprovado.valor_valido,
    is_outlier: getColorStyle(metricas.valor_comprovado.is_outlier, metricas.valor_comprovado.valor_valido),
    minimo_esperado: metricas.valor_comprovado.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_comprovado.maximo_esperado),
    tipo: "bar",

    bar: {}
},
    captured_value: {
  nome: "Valor captado",
    explicacao:
  "Compara o valor captado neste projeto com o valor mais frequentemente captado em projetos do mesmo segmento",
    value: metricas.valor_captado.valor,
    valor_formatado: "R$ " + setMoneyFormat(metricas.valor_captado.valor),
    valor_valido: metricas.valor_captado.valor_valido,
    is_outlier: getColorStyle(metricas.valor_captado.is_outlier, metricas.valor_captado.valor_valido),
    minimo_esperado: metricas.valor_captado.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_captado.maximo_esperado),
    tipo: "bar",

    bar: {},
},
    approved_value: {
  nome: "Valor aprovado",
    explicacao:
  "Indica a proporção de fornecedores que nunca participaram de projetos de incentivo antes em relação ao total de fornecedores envolvidos com o projeto. Também lista os itens orçamentários dos novos fornecedores.",
    value: metricas.valor_aprovado.valor,
    valor_formatado: "R$ " + setMoneyFormat(metricas.valor_aprovado.valor),
    valor_valido: metricas.valor_aprovado.valor_valido,
    is_outlier: getColorStyle(metricas.valor_aprovado.is_outlier, metricas.valor_aprovado.valor_valido),
    minimo_esperado: metricas.valor_aprovado.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_aprovado.maximo_esperado),
    tipo: "bar",

    bar: {},
}
}
}

*/
