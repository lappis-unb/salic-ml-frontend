<template>
  <div class="filter-bar ui basic segment grid">
    <div class="ui form">
      <div class="inline field">
        <label>Pesquisar por:</label>
        <input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="nome, pronac">
        <button class="ui primary button search-button" @click="doFilter">Procurar</button>
        <!--<button class="ui button" @click="resetFilter">Reset</button>-->
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

