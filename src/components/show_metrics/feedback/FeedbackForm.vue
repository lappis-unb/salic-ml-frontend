<template>
    <div class="ui fedback form">
        <div class="header">Quanto essa informação é útil para você?</div>
        <div class="fields">
            <div class="four wide field rating-star" @click="getRating(this)">
                <div class="ui massive star rating" name="itens_orcamentarios_rating"></div>
            </div>
            <div class="inline field">
                <input placeholder="Por quê?" size="50" type="text" name="itens_orcamentarios_text" v-model="text">
            </div>
            <button class="ui primary button"  v-on:click="setData()">
              Save
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "FeedbackForm",
  data: function(){
    return {
      rating: "",
      text: "",
      url: "http://localhost:3000/user"
    }
  },
  props: {
    user: Object,
    metric_id: Number,
    index: Number
  },
  mounted: function() {
    $(".ui.rating").rating({
      initialRating: 0,
      maxRating: 5
    });
  },
  methods: {
    getRating: function() {
      var rating_values_list = $(".ui.rating").rating("get rating");
      var element = document.getElementsByClassName("rating-star");

      this.rating = rating_values_list[this.index]
      console.log(this.rating, "este é o rating");

      for (var i = 0, size = rating_values_list.length; i < size; ++i) {
        !rating_values_list[i] ? "" : this.rmRedBorder(element[i]);
      }
    },
    rmRedBorder: function(element) {
      element.classList.remove("red-border");
    },
    setData: function() {
      var self = this
      axios
        .post(this.url, {
          user: self.user,
          rating: self.rating,
          text: self.text,
          metric_id: self.metric_id          
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


