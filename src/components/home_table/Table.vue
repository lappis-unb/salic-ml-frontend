
<template>
  <div class="ui container">
<!-- api-url="http://localhost:3000/projects" -->
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      api-url="https://vuetable.ratiw.net/api/users"
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
      fields: [
        {
          name: 'pronac',
          sortField: 'pronac',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'pronacLabel'
        },
        {
          name: 'complexity',
          sortField: 'complexity',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
        }, 
        {
          name: 'name',
          sortField: 'name'
        },
        {
          name: 'assignee',
          sortField: 'assignee',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
        }
      ],
      sortOrder: [
        {
          field: 'name',
          sortField: 'name',
          direction: 'asc'
        }
      ],
      moreParams: {}
    }
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
  },
  methods: {
    pronacLabel(value) {
      return '<router-link to="/show" class="ui teal label">'+ 1234 +'</router-link>'
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onAction (action, data, index) {
      console.log('slot action: ' + action, data.name, index)
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      //this.$refs.vuetable.toggleDetailRow(data.id)
      this.$router.push({ path: `/show` }) 
    },
    onFilterSet (filterText) {
      this.moreParams.filter = filterText
      console.log('Entrou aqui')
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    onFilterReset () {
      delete this.moreParams.filter
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>