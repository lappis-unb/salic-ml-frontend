<template>
  <div class="container-application">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/show">show</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px !important;
}

.container-application {
  margin: auto;
  max-width: 1200px;
  padding: 100px 50px 25px;
}

</style>
