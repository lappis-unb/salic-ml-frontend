
<template>
  <div class="ui container">
<!-- api-url="http://localhost:3000/projects" -->
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      api-url="http://localhost:3000/table"
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
        // {
        //   name: 'complexity',
        //   sortField: 'complexity',
        //   titleClass: 'center aligned',
        //   dataClass: 'center aligned',
        // }, 
        {
          name: 'name',
          // sortField: 'project_name'
        },
        {
          name: 'analist',
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
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      // console.log(page, "olha eu aqui")
      this.$refs.vuetable.changePage(page)
    },
    onAction (action, data, index) {
      console.log('slot action: ' + action, data.project_name, index)
    },
    onCellClicked (data, field, event) {
      //this.$refs.vuetable.toggleDetailRow(data.id)
      //console.log(this.pronac)
      //console.log("VERIFICAR ISSO", data , field, event)
      this.$router.push({ name: 'show', params: { pronac: (data.pronac).toString() }}) 
    },
    onFilterSet (filterText) {
      this.moreParams.filter = filterText
      console.log('Entrou aqui', filterText)
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    onFilterReset () {
      delete this.moreParams.filter
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>