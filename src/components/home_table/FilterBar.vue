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
      message: false,
    };
  },
  methods: {
	 isValidPronac(pronac) {
	  return new Promise(resolve => {
		let existing_pronac = axios
          .get(API_PATH_PROJECT + pronac + "/details/")
          .then((response) => {
			return true;
          })
          .catch((/*error*/) => {
			return false;
          })
		  resolve(existing_pronac);
	  });
	},
    async doFilter() {
	  var result = await this.isValidPronac(this.filterText);
      if(result){
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
