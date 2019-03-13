
export function getFinancialMetrics(metricas){
  return {
    valor_a_ser_comprovado: getValorASerComprovado(metricas),
    itens_orcamentarios: getItensOrcamentarios(metricas),
    comprovantes_de_pagamento: getComprovantesDePagamento(metricas),
    comprovantes_com_extrapolacao_de_50: getComprovantesComExtrapolacaoDe50(metricas),
  }
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
  let texto_de_ajuda = "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento";

  return {
    nome: "Valor a ser comprovado",
    explicacao: texto_de_ajuda,
    tipo: "simples",
    valor: metricas.valor_a_ser_comprovado.valor,
    valor_formatado: "R$ "+ setMoneyFormat(metricas.valor_a_ser_comprovado.valor),
    valor_valido: metricas.valor_a_ser_comprovado.valor_valido,
    is_outlier: getColorStyle(metricas.valor_a_ser_comprovado.outlier, metricas.valor_comprovado.valor_valido),
    minimo_esperado: metricas.valor_a_ser_comprovado.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.valor_a_ser_comprovado.maximo_esperado),
    valor_indisponivel: (metricas.valor_a_ser_comprovado.valor) ? true : false,
  }
}

function getComprovantesComExtrapolacaoDe50(metricas){

  return {
    nome: "Comprovantes com extrapolação<br><span style='margin-left:85px;'>acima de 50% do aprovado</span>",
    explicacao: "Explicação da métricas",
    tipo: "lista-simples",
    valor: metricas.comprovantes_acima_de_50.valor,
    valor_fomatado: metricas.comprovantes_acima_de_50.valor,
    valor_valido: metricas.comprovantes_acima_de_50.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_acima_de_50.outlier, metricas.comprovantes_acima_de_50.valor_valido),
    minimo_esperado: metricas.comprovantes_acima_de_50.minimo_esperado,
    maximo_esperado: metricas.comprovantes_acima_de_50.maximo_esperado,
    valor_indisponivel: (metricas.comprovantes_acima_de_50.valor) ? true : false,

    vouchers_list: metricas.comprovantes_acima_de_50.lista_de_comprovantes
  }
}

function getComprovantesDePagamento(metricas){
  let texto_de_ajuda = "Compara a quantidade de comprovantes deste projeto com a \
           quantidade mais comum de comprovantes em projetos do mesmo segmento";

  return {
    nome: "Comprovantes de pagamento",
    explicacao: texto_de_ajuda,
    tipo: "simples",
    valor: metricas.comprovantes_de_pagamento.valor,
    valor_formatado: metricas.comprovantes_de_pagamento.valor + "%",
    valor_valido: metricas.comprovantes_de_pagamento.valor_valido,
    is_outlier: getColorStyle(metricas.comprovantes_de_pagamento.outlier, metricas.comprovantes_de_pagamento.valor_valido),
    minimo_esperado: metricas.comprovantes_de_pagamento.minimo_esperado,
    maximo_esperado: "R$ "+ setMoneyFormat(metricas.comprovantes_de_pagamento.maximo_esperado),
    valor_indisponivel: (metricas.comprovantes_de_pagamento.valor) ? true : false,
  }
}


















export function createMetrics(metrics){
  return {
      budget_items_unusual: {
        nome: "Itens orçamentários inesperados",
        tipo: "items-list",
        explicacao:
          "Indica os itens orçamentários deste projeto que \
                não estão entre os mais comuns do segmento.\
                Também lista os itens que aparecem frequentemente em projetos do segmento, \
                mas que não aparecem neste projeto.",

        value: (metrics.itens_orcamentarios_inesperados.valor).toFixed(2),
        valor_fomatado: (metrics.itens_orcamentarios_inesperados.valor).toFixed(2) + "%",
        valor_valido: metrics.itens_orcamentarios_inesperados.valor_valido,
        is_outlier: getColorStyle(metrics.itens_orcamentarios_inesperados.outlier, metrics.itens_orcamentarios_inesperados.valor_valido),
        minimo_esperado: metrics.itens_orcamentarios_inesperados.minimo_esperado,
        maximo_esperado: metrics.itens_orcamentarios_inesperados.maximo_esperado,

        reason: "",

        common_items_not_in_project: metrics.itens_orcamentarios_inesperados.items_comuns_que_o_projeto_nao_possui,
        uncommon_items: metrics.itens_orcamentarios_inesperados.items_incomuns,
      },
      above_average_prices: {
        nome: "Preços acima da média",
        explicacao:
          "Verifica a quantidade de itens com valor acima da mediana histórica neste projeto e compara com a quantidade mais frequente de itens acima da mediana em projetos do mesmo segmento",
        value: metrics.precos_acima_da_media.valor,
        valor_fomatado: metrics.precos_acima_da_media.valor,
        valor_valido: metrics.precos_acima_da_media.valor_valido,
        is_outlier: getColorStyle(metrics.precos_acima_da_media.outlier, metrics.precos_acima_da_media.valor_valido),
        tipo: "above-average-prices-list",
        minimo_esperado: metrics.precos_acima_da_media.minimo_esperado,
        maximo_esperado: metrics.precos_acima_da_media.maximo_esperado,

        items: metrics.precos_acima_da_media.items,

        reason: ""
      },
      proven_value: {
        nome: "Valor comprovado",
        explicacao:
          "Compara o valor comprovado neste projeto com o valor mais frequentemente comprovado em projetos do mesmo segmento",
        value: metrics.valor_comprovado.valor,
        valor_fomatado: "R$ "+ setMoneyFormat(metrics.valor_comprovado.valor),
        valor_valido: metrics.valor_comprovado.valor_valido,
        is_outlier: getColorStyle(metrics.valor_comprovado.outlier, metrics.valor_comprovado.valor_valido),
        minimo_esperado: metrics.valor_comprovado.minimo_esperado,
        maximo_esperado: "R$ "+ setMoneyFormat(metrics.valor_comprovado.maximo_esperado),
        tipo: "bar",

        bar: {}
      },
      captured_value: {
        nome: "Valor captado",
        explicacao:
          "Compara o valor captado neste projeto com o valor mais frequentemente captado em projetos do mesmo segmento",
        value: metrics.valor_captado.valor,
        valor_fomatado: "R$ " + setMoneyFormat(metrics.valor_captado.valor),
        valor_valido: metrics.valor_captado.valor_valido,
        is_outlier: getColorStyle(metrics.valor_captado.outlier, metrics.valor_captado.valor_valido),
        minimo_esperado: metrics.valor_captado.minimo_esperado,
        maximo_esperado: "R$ "+ setMoneyFormat(metrics.valor_captado.maximo_esperado),
        tipo: "bar",

        bar: {},
      },
      projects_same_proponent: {
        nome: "Projetos do mesmo proponente",
        explicacao:
          "Indica os projetos que o proponente já executou no passado.",
        value: metrics.projetos_do_mesmo_proponente.valor,
        valor_fomatado: metrics.projetos_do_mesmo_proponente.valor,
        valor_valido: metrics.projetos_do_mesmo_proponente.valor_valido,
        is_outlier: getColorStyle(metrics.projetos_do_mesmo_proponente.outlier, metrics.projetos_do_mesmo_proponente.valor_valido),
        minimo_esperado: metrics.projetos_do_mesmo_proponente.minimo_esperado,
        maximo_esperado: metrics.projetos_do_mesmo_proponente.maximo_esperado,
        tipo: "proponents-list",

        proponent_projects: metrics.projetos_do_mesmo_proponente.projetos_submetidos,
        reason: ""
      },
      new_providers: {
        nome: "Novos fornecedores",
        value: metrics.novos_fornecedores.valor,
        valor_fomatado: metrics.novos_fornecedores.valor,
        valor_valido: metrics.novos_fornecedores.valor_valido,
        is_outlier: getColorStyle(metrics.novos_fornecedores.outlier, metrics.novos_fornecedores.valor_valido),
        minimo_esperado: metrics.novos_fornecedores.minimo_esperado,
        maximo_esperado: metrics.novos_fornecedores.maximo_esperado,
        tipo: "providers-list",
        reason: "",

        list: metrics.novos_fornecedores.lista_de_novos_fornecedores,
      } ,
      approved_value: {
        nome: "Valor aprovado",
        explicacao:
          "Indica a proporção de fornecedores que nunca participaram de projetos de incentivo antes em relação ao total de fornecedores envolvidos com o projeto. Também lista os itens orçamentários dos novos fornecedores.",
        value: metrics.valor_aprovado.valor,
        valor_fomatado: "R$ " + setMoneyFormat(metrics.valor_aprovado.valor),
        valor_valido: metrics.valor_aprovado.valor_valido,
        is_outlier: getColorStyle(metrics.valor_aprovado.outlier, metrics.valor_aprovado.valor_valido),
        minimo_esperado: metrics.valor_aprovado.minimo_esperado,
        maximo_esperado: "R$ "+ setMoneyFormat(metrics.valor_aprovado.maximo_esperado),
        tipo: "bar",

        bar: {},
      },
      vouchers_by_operation_code: {
        nome: "Comprovantes por código de operação",
        explicacao:
          "Explicação da métricas",
        value: 2,
        valor_fomatado: setMoneyFormat(metrics.valor_aprovado.valor),
        valor_valido: true,
        is_outlier: getColorStyle(metrics.valor_aprovado.outlier, metrics.valor_aprovado.valor_valido),
        minimo_esperado: metrics.valor_aprovado.minimo_esperado,
        maximo_esperado: metrics.valor_aprovado.maximo_esperado,

        tipo: "operation-code-list",
        operation_list: [{nome: "TED", codigos_de_operacao:[{nome: "Codigo 1 fdas fdsa fdsa fdsa fdsa fdsa fdsafdsafdsa fdas fds afd sa", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}, {nome: "Boleto", codigos_de_operacao:[{nome: "Codigo 1", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}, {nome: "Cheque", codigos_de_operacao:[{nome: "Codigo 1 fdas fdsa fdsa fdsa fdsa fdsa fdsafdsafdsa fdas fds afd sa", comprovantes: [{nome: "comprovante", link: "#" }, {nome: "comprovante", link: "#"}]}]}],
      },
  }
}



function setMoneyFormat(value){
    return (value).toFixed(2).replace('.',',').replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

function getColorStyle(isOutlier, valid){
  let color = "Metric-invalid";

  if(valid) {
    color = (isOutlier && valid) ? "Metric-bad" : "Metric-good";
  }

  return color;
}
