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
  return Math.random() >= 0.5 ? true : false;
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

function getAboveAveragePricesList(){
  var items_price = []
  for(var item_id = 0; item_id < 20; item_id++){
    items_price[item_id] = {
      id: item_id,
      name: faker.name.firstName(),
      has_receipt: getRandomOutlier(),
      link: faker.internet.url()
    }
  }
  return items_price;
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
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: getRandomInt(500),
    maximun_expected: getRandomInt(1000),

    bar: getBarFormatValues(),
  };
}

function getItensOrcamentariosForaDoComum() {
  return {
    name: "itens_orcamentarios_fora_do_comum",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    common_items_not_in_project: getElementsList(),
    uncommon_items: getElementsList(),

    mean: "Entender o que é",
    std: "Entender o que é"
  };
}

function getComprovantesDePagamento() {
  return {
    name: "comprovantes_pagamento",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    bar: getBarFormatValues(),
  };
}

function getPrecosAcimaDaMedia() {
  return {
    name: "precos_acima_media",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    items: getAboveAveragePricesList(),
    total_items: "DESCOBRIR",
    maximum_expected: "DESCOBRIR",
  };
}

function getValorComprovado() {
  return {
    name: "valor_comprovado",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    bar: getBarFormatValues(),
  };
}

function getValorCaptado() {
  return {
    name: "valor_captado",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    bar: getBarFormatValues(),
  };
}

function getProjetosDoMesmoProponente() {
  return {
    name: "projetos_mesmo_proponente",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    proponent_projects: getProponentsList(),
  };
}

function getNovosFornecedores() {
  return {
    name: "novos_fornecedores",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

    providers: getProvidersList(),
    new_providers_percentage: "DESCOBRIR",
    segment_average_percentage: "DESCOBRIR",
    all_projects_average_percentage: "DESCOBRIR"
  };
}

function getValorAprovado() {
  return {
    name: "valor_aprovado",
    value: getRandomPercentage(),
    value_is_valid: true,
    is_outlier: getRandomOutlier(),
    minimun_expected: 0,
    maximun_expected: getRandomInt(1000),

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
      metrics: {
        budget_items: getItensOrcamentarios(),
        budget_items_unusual: getItensOrcamentariosForaDoComum(),
        proof_payment: getComprovantesDePagamento(),
        above_average_prices: getPrecosAcimaDaMedia(),
        proven_value: getValorComprovado(),
        captured_value: getValorCaptado(),
        projects_same_proponent: getProjetosDoMesmoProponente(),
        new_providers: getNovosFornecedores(),
        approved_value: getValorAprovado()
      }
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
