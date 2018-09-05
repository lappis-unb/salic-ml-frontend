<template>
    <div class="ui fedback form">
        <div class="header">Quanto essa informação é útil para você?</div>
        <div class="fields">    
            <div class="four wide field rating-star" @click="getRating(this)" v-on:click="setData()">
                <div class="ui massive star rating" name="itens_orcamentarios_rating"></div>
            </div>
            <div class="inline field">
                <input placeholder="Por quê?" size="50" type="text" name="itens_orcamentarios_text" v-model="text">
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "FeedbackForm",
  data: function() {
    return {
      rating: "",
      answer: "Teste",
      text: "",
      url: "https://salicml-api.lappis.rocks/indicators/send_metric_feedback"
    };
  },
  props: {
    user: Object,
    metric_id: Number,
    index: Number
  },
  watch: {
    // whenever question changes, this function will run
    text: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  mounted: function() {
    $(".ui.rating").rating({
      initialRating: 0,
      maxRating: 5
    });
  },
  methods: {
    getAnswer:  function () {
      //this.answer = 'Thinking...'
      var vm = this
      this.setData()
    },
    getRating: function() {
      var rating_values_list = $(".ui.rating").rating("get rating");
      var element = document.getElementsByClassName("rating-star");

      this.rating = rating_values_list[this.index];
      console.log(this.rating, "este é o rating");

      for (var i = 0, size = rating_values_list.length; i < size; ++i) {
        !rating_values_list[i] ? "" : this.rmRedBorder(element[i]);
      }
    },
    rmRedBorder: function(element) {
      element.classList.remove("red-border");
    },
    setData: function() {
      var self = this;
      console.log({
        user_email: self.user.email,
        metric_id: self.metric_id,
        metric_feedback_rating: self.rating,
        metric_feedback_text: self.text
      });
      axios
        .post(this.url, {
          user_email: self.user.email,
          metric_id: self.metric_id,
          metric_feedback_rating: self.rating,
          metric_feedback_text: self.text
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log("Não deu bom");
          console.log(error);
        });
    }
  }
};
</script>

<style>
/*************************** 
 ********** Forms **********
 ***************************/

.form .divider {
  margin-top: 2em !important;
}

.ui.form .header {
  display: block !important;
  margin-bottom: 1em !important;
}

.star.rating {
  padding-top: 6px;
  width: 90%;
}
.red-border {
  border: solid 2px red !important;
  border-radius: 5px !important;
}
</style>


