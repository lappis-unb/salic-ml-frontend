<template>
  <div class="ui basic segment" id="FinalForm">
    <div class="ui equal width form project-feedback-container">
      <div class="header">
        Na sua opinião, como você avalia <em>"{{ project.name }}"</em>:
      </div>
      <div class="inline fields">
        <div class="field" v-for="(grade, index) in project_feedback_list" :key="grade+index">
          <div class="ui radio checkbox">
            <input type="radio" :required="true" :id="index" :value="index+1" v-model="user_project_feedback">
            <label>{{ grade }}</label>
          </div>
        </div>
      </div>
    </div>
     <div class="ui modal" id="erro-star">
        <div class="header">Pendência de avaliações</div>
        <div class="content">
            <p>Por favor, avalie o projeto e todas as métricas através das estrelinhas.</p>
        </div>
        <div class="actions">
            <button class="ui primary cancel button" id="confirmation-rating">Ok, avaliarei!</button>
        </div>
      </div>
    <button class="scroll ui huge primary button" type="submit" v-on:click="validatePost()">
        Terminar Diagnóstico
    </button>
  </div>
</template>

<script>
//import $ from "jquery";
import axios from "axios";
export default {
  name: "ProjectFeedback",
  data: function() {
    return {
      url: "http://192.168.1.102:8080/indicators/send_project_feedback",
      user_project_feedback: 0
    };
  },
  props: {
    user: Object,
    project: Object,
    project_feedback_list: Array
  },
  mounted() {
    var toTop = document.getElementById("confirmation-rating");
    toTop.addEventListener("click", function () {
        scrollToTop(2000);
    });
     function scrollToTop(scrollDuration) {
        var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function () {
          if (window.scrollY != 0) {
              window.scrollBy(0, scrollStep);
          }
          else clearInterval(scrollInterval);
        }, 15);
    }
  },
  methods: {
    validatePost: function() {
      (this.getRating() || this.user_project_feedback == 0)
        ? this.showMessage()
        : this.postData(
            this.project.pronac,
            this.user_project_feedback,
            this.user.email
          );
    },
    showMessage: function() {
      $('#erro-star').modal('show')
    },
    getRating: function() {
      console.log("Marcando as estrelinhas");
      var rating_values_list = $(".ui.rating").rating("get rating");
      var element = document.getElementsByClassName("rating-star");
      var classNameAdd = "red-border";

      var found = false;
      for (var i = 0, size = rating_values_list.length; i < size; ++i) {
        if (!rating_values_list[i]) {
          element[i].classList.add(classNameAdd)
          found = true;
        }
        else this.rmRedBorder(element[i]);
      }
      console.log(found)
      return found;
    },
    rmRedBorder: function(element) {
      element.classList.remove("red-border");
    },
    postData: function(pronac, user_rating, user_email) {
      // console.log(
      // {
      //   pronac: pronac,
      //   project_feedback_grade: user_rating,
      //   user_email: user_email}
      // );
      axios
        .post(this.url, {
          pronac: pronac,
          project_feedback_grade: user_rating,
          user_email: user_email
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$router.push({ name: 'home', params: { message: true }}) 
    }
  }
};
</script>
<style>
#FinalForm {
  margin: 3em !important;
  text-align: center !important;
}

#FinalForm .header {
  font-size: 1.2em !important;
}

.project-feedback-container {
  margin-bottom: 4em !important;
}
</style>
