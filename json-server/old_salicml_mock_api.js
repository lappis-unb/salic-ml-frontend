var faker = require("faker");
const MAXPROJECTS = 10;
const PORCENTAGE_MAX = 100;

/////////////// Utils functions ///////////////////////////

const getRandomPercentage = () => {
  return Math.round(Math.random(PORCENTAGE_MAX) * 10000) / 100;
};

const getRandomInt = x => {
  return Math.round(Math.random(x) * 100);
};

const getRandomOutlier = () => {
  return Math.random() >= 0.5 ? "Metric-bad" : "Metric-good";
};

function getElementsList() {
  var element_list = [];
  for (var i = 0, size = getRandomInt(50); i < size; i++) {
    element_list[i] = {
      name: faker.name.title(),
      link: faker.internet.url()
    };
  }
  return element_list;
}

function getProponentsList() {
  var element_list = [];
  for (var i = 0, size = getRandomInt(50); i < size; i++) {
    element_list[i] = {
      pronac: getRandomInt(),
      name: faker.name.title(),
      link: faker.internet.url()
    };
  }
  return element_list;
}

function getProvidersList() {
  var element_list = [];
  for (var i = 0, size = getRandomInt(50); i < size; i++) {
    element_list[i] = {
      name: faker.name.title(),
      items: getElementsList()
    };
  }
  return element_list;
}

/////////////// Utils functions ///////////////////////////

function getBarFormatValues() {
  return {
    interval_start: getRandomInt(500),
    interval_end: getRandomInt(1000),
    interval: getRandomInt(700),
    max_value: getRandomInt(1000)
  };
}

function getItensOrcamentarios() {
  return {
    name: "itens_orcamentarios",
    name_title: "Itens orçamentários",
    helper_text:
      "Compara a quantidade de itens deste projeto com a quantidade mais comum de itens em projetos do mesmo segmento",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "bar",

    bar: getBarFormatValues(),

    reason: faker.lorem.paragraph()
  };
}

function getItensOrcamentariosForaDoComum() {
  return {
    name: "itens_orcamentarios_fora_do_comum",
    name_title: "Itens orçamentários inesperados",
    helper_text:
      "Indica os itens orçamentários deste projeto que \
            <strong>não estão entre os mais comuns</strong> do segmento.\
            Também lista os itens que aparecem frequentemente em projetos do segmento, \
            mas que <strong>não aparecem neste projeto</strong>.",
    value: getRandomPercentage() + "%",
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "items-list",

    common_items_not_in_project: getElementsList(),
    uncommon_items: getElementsList(),

    reason: faker.lorem.paragraph(),
    mean: "Entender o que é",
    std: "Entender o que é"
  };
}

function getComprovantesDePagamento() {
  return {
    name: "comprovantes_pagamento",
    name_title: "Comprovantes de pagamento",
    helper_text:
      "Compara a quantidade de comprovantes deste projeto com a \
           <strong>quantidade mais comum</strong> de comprovantes em projetos do mesmo segmento",
    value: getRandomPercentage() + "%",
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "bar",

    bar: getBarFormatValues(),

    reason: faker.lorem.paragraph()
  };
}

function getPrecosAcimaDaMedia() {
  return {
    name: "precos_acima_media",
    name_title: "Preços acima da média",
    helper_text:
      "<p>Verifica a quantidade de itens com valor acima da mediana histórica neste projeto e compara com a <strong>quantidade mais frequente</strong> de itens acima da mediana em projetos do mesmo segmento</p>",
    value: "R$ " + getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "item-list",

    items: "DESCOBRIR",
    total_items: "DESCOBRIR",
    maximum_expected: "DESCOBRIR",

    reason: faker.lorem.paragraph()
  };
}

function getValorComprovado() {
  return {
    name: "valor_comprovado",
    name_title: "Valor comprovado",
    helper_text:
      "<p>Compara o valor comprovado neste projeto com o <strong>valor mais frequentemente</strong> comprovado em projetos do mesmo segmento</p>",
    value: "R$ " + getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "bar",

    bar: getBarFormatValues(),

    reason: faker.lorem.paragraph()
  };
}

function getValorCaptado() {
  return {
    name: "valor_captado",
    name_title: "Valor captado",
    helper_text:
      "<p>Compara o valor captado neste projeto com o <strong>valor mais frequentemente</strong> captado em projetos do mesmo segmento</p>",
    value: "R$ " + getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "bar",

    bar: getBarFormatValues(),

    reason: faker.lorem.paragraph()
  };
}

function getProjetosDoMesmoProponente() {
  return {
    name: "projetos_mesmo_proponente",
    name_title: "Projetos do mesmo proponente",
    helper_text:
      "<p>Indica os projetos que o proponente já executou no passado.</p>",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "proponents-list",

    proponent_projects: getProponentsList(),
    reason: faker.lorem.paragraph()
  };
}

function getNovosFornecedores() {
  return {
    name: "novos_fornecedores",
    name_title: "Novos fornecedores",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "providers-list",
    reason: faker.lorem.paragraph(),

    providers: getProvidersList(),
    new_providers_percentage: "DESCOBRIR",
    segment_average_percentage: "DESCOBRIR",
    all_projects_average_percentage: "DESCOBRIR"
  };
}

function getValorAprovado() {
  return {
    name: "valor_aprovado",
    name_title: "Valor aprovado",
    helper_text:
      "<p>Indica a proporção de fornecedores que <strong>nunca participaram de projetos</strong> de incentivo antes em relação ao total de fornecedores envolvidos com o projeto.</p> <p>Também lista os itens orçamentários dos novos fornecedores.</p>",
    value: "R$ " + getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    type: "bar",

    bar: getBarFormatValues(),

    maximum_expected_funds: getRandomPercentage()
  };
}
function generateIndicators() {
  const project_indicators = [
    {
      id: 0,
      name: "complexidade_financeira",
      value: Math.round(getRandomPercentage()),
      metrics: [
        getItensOrcamentarios(),
        getItensOrcamentariosForaDoComum(),
        getComprovantesDePagamento(),
        getPrecosAcimaDaMedia(),
        getValorComprovado(),
        getValorCaptado(),
        getProjetosDoMesmoProponente(),
        getNovosFornecedores(),
        getValorAprovado()
      ]
    }
  ];
  return project_indicators;
}

function getUser() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email()
  };
}

function getProject() {
  var projects = [];
  for (var pronac = 0; pronac < MAXPROJECTS; pronac++) {
    var project = {
      id: pronac,
      pronac: pronac,
      name: faker.name.jobTitle(),
      analist: faker.name.firstName(),
      indicators: generateIndicators()
    };
    projects[pronac] = project;
  }
  return projects;
}

function getTable(){
    var table = {
        "total": 50,
        "per_page": 15,
        "current_page": 1,
        "last_page": 4,
        "next_page_url": "...",
        "prev_page_url": "...",
        "from": 1,
        "to": 15,
        "data": getProject()
      }
      return table
}

function generateData() {
  return {
    user: getUser(),
    table: getTable(),
    projects: getProject(),
  };
}

module.exports = generateData;
