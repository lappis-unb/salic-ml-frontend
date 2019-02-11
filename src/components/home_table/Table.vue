
<template>
  <div class="ui container">
    <filter-bar></filter-bar>
    <div style="cursor: pointer;">
        <vuetable ref="vuetable"
          api-url="http://localhost:3000/projetos_lista"
          :fields="fields"
          pagination-path=""
          :per-page="20"
          :multi-sort="true"
          :sort-order="sortOrder"
          :append-params="moreParams"
          @vuetable:cell-clicked="onCellClicked"
          @vuetable:pagination-data="onPaginationData"
        >
        </vuetable>
    </div>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vue from 'vue'
import VueEvents from 'vue-events'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import FilterBar from './FilterBar'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      pronac: "",
      fields: [
        {
          name: 'pronac',
          // sortField: 'pronac',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'pronacLabel'
        },
        {
          name: 'complexidade',
          // sortField: 'complexity',
          titleClass: 'center aligned',
          callback: 'complexityLabel',
          dataClass: 'center aligned'
        }, 
        {
          name: 'nome',
          // sortField: 'project_name'
        },
        {
          name: 'responsavel',
          // sortField: 'analist',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
        }
      ],
      sortOrder: [],
      moreParams: {

      }
    }
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
  },
  methods: {
    pronacLabel(value) {
      this.pronac = value
      return '<p class="ui teal label">'+ value +'</p>'
    },
    complexityLabel(value) {
      this.complexity = value
      var color = "#DB2828";
      if(value>=80) color = "#DB2828";
      else (value>=30) ? color = "#F2B01C" : color = "#1B5E20";

      return '<strong style="color: ' + color + '; font-size: 20px;">' + (value) + '</strong>'
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onAction (action, data, index) {
      console.log('slot action: ' + action, data.project_name, index)
    },
    onCellClicked (data, field, event) {
      //window.location.href = "http://salic.cultura.gov.br/consultardadosprojeto/index?idPronac=" + (data.pronac).toString()
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.$router.push({ name: 'show', params: { pronac: (data.pronac).toString() }}) 
    },
    onFilterSet (filterText) {
      console.log(filterText)
      this.moreParams.filter = filterText
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    onFilterReset () {
      delete this.moreParams.filter
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>
