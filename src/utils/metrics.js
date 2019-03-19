export function getFinancialMetrics(metricas){
  return {
    valor_a_ser_comprovado: getValorASerComprovado(metricas),
    itens_orcamentarios: getItensOrcamentarios(metricas),
    comprovantes_pagamento: getComprovantesDePagamento(metricas),
    comprovantes_com_extrapolacao_de_50: getComprovantesComExtrapolacaoDe50(metricas),
    projetos_mesmo_proponente: getProjetosDoMesmoProponente(metricas),
    novos_fornecedores: getNovosFornecedores(metricas)
  }
}

function setMoneyFormat(value){
  return (value).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

function getColorStyle(isOutlier, valid){
  let color = "Metric-invalid";

  if(valid) {
    color = (isOutlier && valid) ? "Metric-bad" : "Metric-good";
  }

  return color;
}


function getItensOrcamentarios(metricas){
  return {
      nome: "Itens orçamentários",
      explicacao: "Compara a quantidade de itens deste projeto com a quantidade mais comum de itens em projetos do mesmo segmento",
      tipo: "simples",
      valor: metricas.itens_orcamentarios.valor,
      valor_formatado: metricas.itens_orcamentarios.valor,
      valor_valido: metricas.itens_orcamentarios.valor_valido,
      is_outlier: getColorStyle(metricas.itens_orcamentarios.outlier, metricas.itens_orcamentarios.valor_valido),
      minimo_esperado: metricas.itens_orcamentarios.minimo_esperado,
      maximo_esperado: parseInt(metricas.itens_orcamentarios.maximo_esperado),
      valor_indisponivel: (metricas.itens_orcamentarios.valor) ? true : false,
  }
}

function getValorASerComprovado(metricas){
    let texto_de_ajuda = "Exibe valores dos items que não estão de acordo com o valor aprovado.";
    let sinais = '';
    ((metricas.valor_a_ser_comprovado.valor>0) ? sinais='+' : sinais='')


  return {
    nome: "Valores indevidos",
    explicacao: texto_de_ajuda,
    tipo: "tabela-de-items",
    valor: metricas.valor_a_ser_comprovado.valor,
    valor_formatado: "R$ "+ sinais + setMoneyFormat(metricas.valor_a_ser_comprovado.valor),
    valor_valido: metricas.valor_a_ser_comprovado.valor_valido,
    is_outlier: getColorStyle(metricas.valor_a_ser_comprovado.outlier, metricas.valor_a_ser_comprovado.valor_valido),
    minimo_esperado: metricas.valor_a_ser_comprovado.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_a_ser_comprovado.maximo_esperado),
    valor_indisponivel: (metricas.valor_a_ser_comprovado.valor) ? true : false,

    proponent_projects: metricas.projetos_mesmo_proponente.projetos_submetidos,
  }
}

function getComprovantesComExtrapolacaoDe50(metricas){

  return {
    nome: "Comprovantes com extrapolação<br><span style='margin-left:85px;'>acima de 50% do aprovado</span>",
    explicacao: "Explicação da métricas",
    tipo: "lista-simples",
    valor: metricas.comprovantes_acima_de_50.valor,
    valor_formatado: metricas.comprovantes_acima_de_50.valor,
    valor_valido: metricas.comprovantes_acima_de_50.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_acima_de_50.outlier, metricas.comprovantes_acima_de_50.valor_valido),
    minimo_esperado: metricas.comprovantes_acima_de_50.minimo_esperado,
    maximo_esperado: metricas.comprovantes_acima_de_50.maximo_esperado,
    valor_indisponivel: (metricas.comprovantes_acima_de_50.valor) ? true : false,

    vouchers_list: metricas.comprovantes_acima_de_50.data.lista_de_comprovantes
  }
}

function getComprovantesDePagamento(metricas){
  let texto_de_ajuda = "Compara a quantidade de comprovantes deste projeto com a \
           quantidade mais comum de comprovantes em projetos do mesmo segmento";

  return {
    nome: "Comprovantes de pagamento",
    explicacao: texto_de_ajuda,
    tipo: "simples",
    valor: metricas.comprovantes_pagamento.valor,
    valor_formatado: metricas.comprovantes_pagamento.valor + "%",
    valor_valido: metricas.comprovantes_pagamento.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_pagamento.outlier, metricas.comprovantes_pagamento.valor_valido),
    minimo_esperado: metricas.comprovantes_pagamento.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.comprovantes_pagamento.maximo_esperado),
    valor_indisponivel: (metricas.comprovantes_pagamento.valor) ? true : false,
  }
}

function getProjetosDoMesmoProponente(metricas){

  return {
    nome: "Projetos do mesmo proponente",
    explicacao: "Indica os projetos que o proponente já executou no passado.",
    tipo: "tabela-simples",
    valor: metricas.projetos_mesmo_proponente.valor,
    valor_formatado: metricas.projetos_mesmo_proponente.valor,
    valor_valido: metricas.projetos_mesmo_proponente.valor_valido,
    is_outlier: getColorStyle(metricas.projetos_mesmo_proponente.outlier, metricas.projetos_mesmo_proponente.valor_valido),
    minimo_esperado: metricas.projetos_mesmo_proponente.minimo_esperado,
    maximo_esperado: metricas.projetos_mesmo_proponente.maximo_esperado,
    valor_indisponivel: (metricas.projetos_mesmo_proponente.valor) ? true : false,

    proponent_projects: metricas.projetos_mesmo_proponente.data.projetos_submetidos,
  }
}

function getNovosFornecedores(metricas){

  return {
    nome: "Novos fornecedores",
    explicacao: "Colocar explicação da métrica aqui",
    tipo: "lista-com-dropdown",
    valor: metricas.novos_fornecedores.valor,
    valor_formatado: metricas.novos_fornecedores.valor,
    valor_valido: metricas.novos_fornecedores.valor_valido,
    is_outlier: getColorStyle(metricas.novos_fornecedores.outlier, metricas.novos_fornecedores.valor_valido),
    minimo_esperado: metricas.novos_fornecedores.minimo_esperado,
    maximo_esperado: metricas.novos_fornecedores.maximo_esperado,
    valor_indisponivel: (metricas.novos_fornecedores.valor) ? true : false,

    list: metricas.novos_fornecedores.data.lista_de_novos_fornecedores,
  }
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
    is_outlier: getColorStyle(metricas.precos_acima_da_media.outlier, metricas.precos_acima_da_media.valor_valido),
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
    is_outlier: getColorStyle(metricas.itens_orcamentarios_inesperados.outlier, metricas.itens_orcamentarios_inesperados.valor_valido),
    minimo_esperado: metricas.itens_orcamentarios_inesperados.minimo_esperado,
    maximo_esperado: metricas.itens_orcamentarios_inesperados.maximo_esperado,
    valor_indisponivel: (metricas.itens_orcamentarios_inesperados.valor) ? true : false,

    common_items_not_in_project: metricas.itens_orcamentarios_inesperados.data.items_comuns_que_o_projeto_nao_possui,
    uncommon_items: metricas.itens_orcamentarios_inesperados.data.items_incomuns,
  }
}

function getComprovantesDeTransferencia(metricas){

  return {
    nome: "Comprovantes de transferência",
    explicacao: "Explicação da métricas",
    tipo: "operation-code-list",
    valor: metricas.comprovantes_de_transferencia.valor,
    valor_formatado: setMoneyFormat(metricas.comprovantes_de_transferencia.valor),
    valor_valido: metricas.comprovantes_de_transferencia.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_de_transferencia.outlier, metricas.comprovantes_de_transferencia.valor_valido),
    minimo_esperado: metricas.comprovantes_de_transferencia.minimo_esperado,
    maximo_esperado: metricas.comprovantes_de_transferencia.maximo_esperado,
    valor_indisponivel: (metricas.comprovantes_de_transferencia.valor) ? true : false,
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
      is_outlier: getColorStyle(metricas.valor_comprovado.outlier, metricas.valor_comprovado.valor_valido),
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
      is_outlier: getColorStyle(metricas.valor_captado.outlier, metricas.valor_captado.valor_valido),
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
      is_outlier: getColorStyle(metricas.valor_aprovado.outlier, metricas.valor_aprovado.valor_valido),
      minimo_esperado: metricas.valor_aprovado.minimo_esperado,
      maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_aprovado.maximo_esperado),
      tipo: "bar",

      bar: {},
    }
  }
}

*/
