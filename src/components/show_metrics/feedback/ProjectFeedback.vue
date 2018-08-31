<template>
  <div class="ui basic segment" id="FinalForm">
        <form>
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
          <button class="scroll ui huge primary button" type="submit" v-on:click="validatePost()">
              Terminar Diagnóstico
          </button>
        </form>
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "ProjectFeedback",
  data: function() {
    return {
      url: "http://localhost:3000/projects",
      user_project_feedback: 0
    };
  },
  props: {
    user: Object,
    project: Object,
    project_feedback_list: Array
  },
  methods: {
    validatePost: function() {
      this.user_project_feedback == 0
        ? this.showMessage()
        : this.postData(
            this.project.pronac,
            this.user_project_feedback,
            this.user.email
          );
    },
    showMessage: function() {
      alert("Avalie o projeto!");
    },
    postData: function(pronac, user_rating, user_email) {
      console.log(pronac, user_rating, user_email);
      //   axios
      //     .post(this.url, {
      //       pronac: pronac,
      //       rating: user_rating,
      //       user_email: user_email
      //     })
      //     .then(function(response) {
      //       console.log(response);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
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
