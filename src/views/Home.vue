<template>
  <div class="home">
    <div class="ui fixed inverted menu" id="ProjectID">
      <h1>Projetos com Diagnóstico de complexidade</h1>
    </div>
    <div class="ui container">
      <vuetable></vuetable>
    </div>
  </div>
</template>

<script>
import Vuetable from "@/components/home_table/Table.vue";

export default {
  components: {
    Vuetable
  }
};
</script>

<style>
.home {
  margin-top: 55px;
}
</style>
