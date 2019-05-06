<template>
  <div>
      <div v-if="message" class="ui message" id="warning-layout">
          <div class="header">
            PRONAC não encontrado, tente outro.
          </div>
      </div>
      <div class="filter-bar ui basic segment grid">
        <div class="ui form">
          <div class="inline field">
            <label>Pesquisar por PRONAC:</label>
            <input
              type="text"
              v-model="filterText"
              class="three wide column"
              @keyup.enter="doFilter"
              placeholder="Apenas números. Ex: 090105"
              oninput="this.value = this.value.replace(/[^0-9]/g,'');"
            >
            <button class="ui primary button search-button" @click="doFilter">Filtrar</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { API_PATH_PROJECT } from "@/utils/variables.js";
import axios from "axios";

export default {
  data() {
    return {
      filterText: "",
      url: API_PATH_PROJECT + this.$route.params.pronac + "/details/",
      message: false
    };
  },
  methods: {
    doFilter() {
      //this.$events.fire("filter-set", this.filterText);

      if(this.validatePronac(this.filterText)){
          let routeData = this.$router.resolve({
            name: "indicador_financeiro",
            params: { pronac: this.filterText }
          });
          window.open(routeData.href, "_blank");
        this.message = false;
      } else { 
        this.message = true;
      }
    },
    validatePronac(){
        var valide_pronac = false;
        axios
          .get(this.url)
          .then(function(response) {
            valide_pronac = true;
          })
          .catch(function(/*error*/) {
            // console.log("Get error", error);
          })
          .then(function() {
            // always executed
          });

          return valide_pronac;
    }
  }
};
</script>

<style>
.search-button {
  margin-left: 10px !important;
}

#warning-layout {
  margin-bottom: 20px;
}
</style>
