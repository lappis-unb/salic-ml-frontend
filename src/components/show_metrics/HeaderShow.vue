<template>
    <div class="ui fixed inverted menu" id="ProjectID">
        <router-link to="/" class="ui icon inverted button" id="btBack">
            <i class="left arrow icon"></i>
        </router-link>
        
        <div class="ui tiny inverted statistic">
            <div class="label">PRONAC</div>
            <div class="value">{{ project.pronac }}</div>
        </div>
        
        <h1>{{ project.name }}</h1>

        <div :v-if="user.name!={}" class="ui basic segment" id="LoggedUser">
            Avaliando como:<br />
            {{user.name}}
        </div>
    </div>
</template>

<script>
export default {
  name: "HeaderShow",
  // data: function() {
  //   return {
  //     project: {
  //       name: "Qualquer",
  //       pronac: "12345"
  //     },
  //     user: {
  //       name: "Ferdinando"
  //     }
  //   };
  // },
  props: {
      project: Object,
      user: Object
  }
};
</script>

<style>
/*************************** 
 ******* Sticky Menu *******
 ***************************/

.ui.fixed.inverted.menu {
  align-items: center;
  background-color: #1b5e20;
  color: #fff;
  padding: 15px 0;
  justify-content: center;
}

.ui.fixed.inverted.menu .ui.inverted.button {
  font-size: 1.2em;
  left: 1em;
  box-shadow: none !important;
  position: absolute;
}

.ui.fixed.inverted.menu .ui.statistic {
  margin: 0 2em;
}

.ui.fixed.inverted.menu h1 {
  font-size: 1.2em;
  height: auto;
  margin: auto 0;
  width: auto;
  max-width: 40%;
}

.ui.fixed.inverted.menu #LoggedUser {
  bottom: 0;
  font-size: 0.8em;
  width: 15%;
  position: absolute;
  right: 0;
  text-align: right;
  padding: 1.5em;
}
</style>
