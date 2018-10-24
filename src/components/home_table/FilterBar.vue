<template>
  <div class="filter-bar ui basic segment grid">
    <div class="ui form">
      <div class="inline field">
        <label>Pesquisar por PRONAC:</label>
        <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="PRONAC">
        <button class="ui primary button search-button" @click="doFilter">Filtrar</button>
        <button class="ui button search-button" @click="resetFilter">Limpar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
      console.log(this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
      console.log(this.filterText)
    }
  }
}
</script>

<style>
.search-button {
  margin-left: 10px !important;
}
</style>

