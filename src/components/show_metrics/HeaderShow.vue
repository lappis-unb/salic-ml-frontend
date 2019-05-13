<template>
  <div
    class="ui fixed inverted menu"
    :class="getBackgroundClass"
    id="ProjectID"
  >
    <router-link to="/" class="ui icon inverted button" id="btBack">
      <i class="left arrow icon"></i>
    </router-link>
    <div class="ui small inverted statistic">
      <div class="value">{{ value | rounded }}</div>
      <div class="label">{{ getSubtitle }}</div>
    </div>
    <p>{{ project.nome }} ({{ project.pronac }})</p>
  </div>
</template>

<script>
export default {
  name: "HeaderShow",
  props: {
    project: Object,
    value: Number
  },
  computed: {
    getSubtitle: function() {
      if (this.value >= 7) return "Muito Complexo";
      else if (this.value >= 4) return "Complexo";
      else return "Normal";
    },
    getBackgroundClass: function() {
      if (this.value >= 7) return "verycomplex";
      else if (this.value >= 4) return "complex";
      else return "";
    }
  },
  filters: {
    rounded: function(value) {
      return !value ? 0 : Number(value);
    }
  },
  methods: {
    handleScroll: function() {
      $(window).scrollTop() > 150
        ? $("#ProjectID").fadeIn(300)
        : $("#ProjectID").fadeOut(300);
    }
  },
  mounted() {
    $("#ProjectID").hide();
  },
  created: function() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
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

.ui.fixed.inverted.menu.complex {
  background-color: #f2b01c;
}

.ui.fixed.inverted.menu.verycomplex {
  background-color: #db2828;
}

.ui.fixed.inverted.menu .ui.inverted.button {
  font-size: 1.2em;
  left: 1em;
  box-shadow: none !important;
  position: absolute;
}

.ui.fixed.inverted.menu .ui.statistic {
  margin: 0 3em;
}

.ui.fixed.inverted.menu p {
  font-size: 1.5em;
  font-style: italic;
  line-height: 1.2em;
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
