function createBaseMetric(metric_name, name, helper, type) {
  let metric = {};

  try {
    metric.valor = metric_name.valor;
    metric.valor_formatado = metric_name.valor;
    metric.valor_valido = metric_name.valor_valido;
    metric.is_outlier = getColorStyle(metric_name.is_outlier, metric_name.valor_valido);
    metric.minimo_esperado = metric_name.minimo_esperado;
    metric.maximo_esperado = parseInt(metric_name.maximo_esperado);
  }
  catch {
    metric = getMetricTemplate();
  }

  metric.nome = name;
  metric.explicacao = helper;
  metric.tipo = type;

  return metric;
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
}

function setMoneyFormat(value) {
  return (value).toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

function getColorStyle(isOutlier, valid) {
  let color = "Metric-invalid";

  if (valid) color = (isOutlier && valid) ? "Metric-bad" : "Metric-good";

  return color;
}

export function getItensOrcamentarios(metricas) {
  let name = "Itens orçamentários";
  let helper = "Compara a quantidade de itens deste projeto com a quantidade mais comum de itens em projetos do mesmo segmento";
  let type = "simples";

  return createBaseMetric(metricas["itens_orcamentarios"], name, helper, type);
}

export function getComprovantesComExtrapolacaoDe50(metricas) {
  let name = "Comprovantes que extrapolaram mais de 50% do aprovado";
  let helper = "Quantidade de comprovantes com valor maior que o limite de extrapolação previsto na Lei (valor aprovado + extrapolação de 50%)";
  let type = "lista-simples";

  let metric = createBaseMetric(metricas["comprovantes_acima_de_50"], name, helper, type);

  try {
    metric.lista_de_comprovantes = metricas.comprovantes_acima_de_50.data.lista_de_comprovantes
    metric.link_da_planilha = metricas.comprovantes_acima_de_50.data.link_da_planilha
  }
  catch {
    metric.lista_de_comprovantes = []
  }

  return metric;
}

export function getProjetosDoMesmoProponente(metricas) {
  let name = "Projetos do mesmo proponente";
  let helper = "Indica a complexidade dos projetos que o proponente já executou no passado";
  let type = "tabela-simples";

  let metric = createBaseMetric(metricas["projetos_mesmo_proponente"], name, helper, type);

  try {
    metric.proponent_projects = metricas.projetos_mesmo_proponente.data.projetos_submetidos;
  }
  catch {
    metric.proponent_projects = []
  }
  return metric;
}

export function getValorASerComprovado(metricas) {
  let name = "Valor a ser comprovado*";
  let helper = "Valor total de itens orçamentários que não tem comprovantes de pagamento associados. Valores negativos indicam comprovação maior do que o valor executado.";
  let type = "tabela-de-itens";
  let sinais = '';

  let metric = createBaseMetric(metricas["valor_a_ser_comprovado"], name, helper, type);
  metric.valor_formatado = "R$ " + sinais + parseFloat(metric.valor).toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
  metric.maximo_esperado = "R$ " + setMoneyFormat(metric.maximo_esperado);

  try {
    metric.list = [{ nome: "Item", pronac: 1234, valor_captado: 30 }];
  } catch {
    metric.list = [];
  }
  return metric;
}

export function getNovosFornecedores(metricas) {
  let name = "Novos fornecedores";
  let helper = "Lista fornecedores que estão participando do incentivo cultural pela primeira vez";
  let type = "lista-com-dropdown";

  let metric = createBaseMetric(metricas["novos_fornecedores"], name, helper, type);

  try {
    metric.list = metricas.novos_fornecedores.data.lista_de_novos_fornecedores;
  } catch {
    metric.list = [];
  }

  return metric;
}

export function getComprovantesDeTransferencia(metricas) {
  let name = "Transferência com vários comprovantes*";
  let helper = "Quantidade de transferências bancárias que comprovam o pagamento de dois ou mais itens orçamentários";
  let type = "lista-com-dropdown-tabela";

  let metric = createBaseMetric(metricas["comprovantes_de_transferencia"], name, helper, type);

  metric.list = [
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

  return metric;
}

export function getComprovantesDeSaque(metricas) {
  let name = "Saque com vários comprovantes*";
  let helper = "Quantidade de saques que comprovam o pagamento de dois ou mais itens orçamentários";
  let type = "lista-com-dropdown-tabela";

  let metric = createBaseMetric(metricas["comprovantes_de_saque"], name, helper, type);

  metric.list = [
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
    }
  ];

  return metric;
}

//Trocar isso
export function getComprovantesDeCheque(metricas) {
  let name = "Cheque com vários comprovantes*";
  let helper = "Quantidade de cheques que comprovam o pagamento de dois ou mais itens orçamentários";
  let type = "lista-com-dropdown-tabela";

  metricas.comprovantes_de_cheque = {
      valor: 0,
      valor_formatado: 0,
      valor_valido: true,
      is_outlier: true,
      minimo_esperado: 0,
      maximo_esperado: 0,
  }

  let metric = createBaseMetric(metricas["comprovantes_de_cheque"], name, helper, type);

  try {
    metric.comprovantes = metricas.comprovantes_de_cheque.data.comprovantes;
  } catch {
    metric.comprovantes =
      [
        {
          'id_comprovante': 5413,
          'itens': [
            {
              'nome': 'Coordenação editorial',
              'nome_fornecedor': 'QUEM DIRIA EDIÇÃO DE LIVROS LTDA',
              'cpf_cnpj_fornecedor': 'xxxxxxxx',
              'valor_comprovado': '3000.00'
            },
          ]
        },
        {
          'id_comprovante': 5413,
          'itens': [
            {
              'nome': 'Coordenação editorial',
              'nome_fornecedor': 'QUEM DIRIA EDIÇÃO DE LIVROS LTDA',
              'cpf_cnpj_fornecedor': 'xxxxxxxx',
              'valor_comprovado': '3000.00'
            },
          ]
        },
        {
          'id_comprovante': 5413,
          'itens': [
            {
              'nome': 'Coordenação editorial',
              'nome_fornecedor': 'QUEM DIRIA EDIÇÃO DE LIVROS LTDA',
              'cpf_cnpj_fornecedor': 'xxxxxxxx',
              'valor_comprovado': '3000.00'
            },
          ]
        }
      ];
  }

  return metric;
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


