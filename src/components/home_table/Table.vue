
<template>
  <div class="ui container">
    <filter-bar></filter-bar>
    <div style="cursor: pointer;">
        <vuetable ref="vuetable"
          :fields="fields"
      	  :api-mode="false"
      	  :data="projects_list"
          :per-page="15"
          :multi-sort="true"
          :sort-order="sortOrder"
          :append-params="moreParams"
          pagination-path=""
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
import Vue from 'vue'
import VueEvents from 'vue-events'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import FilterBar from './FilterBar'
import {API_PATH_PROJECT_LIST} from '@/utils/variables.js'
import axios from "axios";


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
      api_path: API_PATH_PROJECT_LIST,
      pronac: "",
	    projects: [],
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
      moreParams: {}
    }
  },
  mounted () {
    var self = this;
    axios
      .get(API_PATH_PROJECT_LIST)
      .then(function(response) {
        // handle success
        var projects = JSON.parse(JSON.stringify(response.data));
        self.projects = projects;
      })
      .catch(function(error) {
        // handle error
        // console.log("Get error", error);
      })
      .then(function() {
        self.loading = false;
        // always executed
      });

    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
        // this.$events.$on('filter-reset', e => this.onFilterReset())
  },
  computed:{
    projects_list: function(){
        let data = this.projects;
				var transformed = {}

				if(data.next!=undefined){
						let per_page_number = 15;
						let current_page = parseInt(parseInt((data.next).split('offset=')[1]) / per_page_number);
						console.log(current_page)
						transformed = {
							total: parseInt(data.count),
							per_page: per_page_number,
							current_page: parseInt(current_page),
							last_page: parseInt(data.count / per_page_number),
							next_page_url: data.next,
							prev_page_url: data.previous,
              from: current_page,
              to: current_page + 1,
              data: data.results,
						}
				}

        return transformed;
    }
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
    // onAction (action, data, index) {
      // console.log('slot action: ' + action, data.project_name, index)
    // },
    onCellClicked (data) {
      // window.location.href = "http://salic.cultura.gov.br/consultardadosprojeto/index?idPronac=" + (data.pronac).toString()
      this.$refs.vuetable.toggleDetailRow(data.id)
      this.$router.push({ name: 'show', params: { pronac: (data.pronac).toString() }})
    },
    onFilterSet (filterText) {
      // console.log(filterText)
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
