<template>
<div>
   <div class="ui segment basic right aligned">
      <div v-if="message" class="ui message compact" id="warning-layout">
          <div class="header">
            PRONAC não encontrado
          </div>
      </div>
        <div class="ui form">
          <div class="inline field">
            <label>Ir para o projeto:</label>
            <input
              type="text"
              v-model="filterText"
              @keyup.enter="doFilter"
              placeholder="PRONAC"
              oninput="this.value = this.value.replace(/[^0-9]/g,'');"
              size="8"
            >
            <button class="ui primary button search-button" @click="doFilter">Ir</button>
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
