<template>
  <div class="ui container">
    <filter-bar></filter-bar>
    <div style="cursor: pointer;">
      <vuetable ref="vuetable" :fields="fields" :api-url="api_path" :sort-params="getSortParam" :query-params="{ sort: 'order_by', page: 'page', perPage: 'perPage' }" :per-page="15" :append-params="moreParams" :sort-order="sortOrder" pagination-path @vuetable:cell-clicked="onCellClicked"
        @vuetable:pagination-data="onPaginationData"></vuetable>
    </div>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo" info-template="Mostrando {from} a {to} projetos de {total}"></vuetable-pagination-info>
      <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueEvents from "vue-events";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import FilterBar from "./FilterBar";
import { API_PATH_PROJECT_LIST } from "@/utils/variables.js";
import axios from "axios";

Vue.use(VueEvents);
Vue.component("filter-bar", FilterBar);

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data() {
    return {
      api_path: API_PATH_PROJECT_LIST,
      projects: [],
      fields: [{
              name: "pronac",
              title: "PRONAC",
              sortField: "pronac",
              titleClass: "center aligned",
              dataClass: "center aligned",
              width: "10%",
              callback: "pronacLabel"
          },
          {
              name: "complexidade",
              sortField: "complexidade",
              titleClass: "center aligned",
              width: "15%",
              callback: "complexityLabel",
              dataClass: "center aligned"
          },
          {
              name: "nome",
              width: "55%",
              sortField: "nome"
          },
          {
              name: "responsavel",
              title: "Responsável",
              width: "20%",
              sortField: "responsavel",
              titleClass: "center aligned",
              callback: "responsavelLabel"
          }
      ],
      moreParams: {},
      sortOrder: [{
          field: 'complexidade',
          direction: 'desc'
      }]
    };
  },
  mounted() {
      var self = this;
      axios
          .get(API_PATH_PROJECT_LIST)
          .then(function(response) {
              var projects = JSON.parse(JSON.stringify(response.data));
              self.projects = projects;
          })
          .catch(function( /*error*/ ) {
              // handle error
              // console.log("Get error", error);
          })
          .then(function() {
              self.loading = false;
          });
  },
  methods: {
      pronacLabel(value) {
          return '<p class="ui teal label">' + value + "</p>";
      },
      responsavelLabel(value) {
          return value != " " ? value : "Não há responsável";
      },
      complexityLabel(value) {
          this.complexity = value;
          let color = "#1B5E20";

          if (value > 6) color = "#DB2828";
          else if (value > 3) color = "#F2B01C";

          return (
              '<strong style="color: ' +
              color +
              '; font-size: 20px;">' +
              value +
              "</strong>"
          );
      },
      getSortParam(sortOrder) {
          return sortOrder.map(function(sort) {
              return (sort.direction === 'desc' ? '-' : '') + sort.field;
          }).join(',')
      },
      onPaginationData(paginationData) {
          this.$refs.pagination.setPaginationData(paginationData);
          this.$refs.paginationInfo.setPaginationData(paginationData);
      },
      onChangePage(page) {
          this.$refs.vuetable.changePage(page);
      },
      onCellClicked(data) {
          // window.location.href = "http://salic.cultura.gov.br/consultardadosprojeto/index?idPronac=" + (data.pronac).toString()

          this.$refs.vuetable.toggleDetailRow(data.id);
          let routeData = this.$router.resolve({
              name: "indicador_financeiro",
              params: { pronac: data.pronac.toString() }
          });

          window.open(routeData.href, "_blank");
      }
  }
};
</script>
