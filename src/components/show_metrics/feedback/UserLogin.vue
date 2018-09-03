<template>
<div class="ui ten column centered grid" style="margin-top:50px;">
    <feedback-message v-if="message.show_message" :message="message" />
    <div class="ui raised segment" id="LoginArea">
        <div class="ui form">
            <div class="header">
                Preencha seus dados para avaliar este projeto (ou para continuar uma avaliação interrompida):
            </div>
            <form @submit.prevent="validateUser">
                <div class="three fields">
                    <div class="six wide field">
                        <input :required="true" placeholder="Nome Completo" type="text" name="user_first_name" v-model="user.name">
                    </div>
                    <div class="seven wide field">
                        <div class="ui right labeled input">
                            <input :required="true" placeholder="Email" type="text" name="user_email"  v-model="user.email">
                            <div class="ui label">
                                @cultura.gov.br
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="project_pronac" >
                    <div class="two wide field">
                        <input class="ui submit button primary" type="submit" value="Enviar"  v-on:click="validateUser()">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import FeedbackMessage from './FeedbackMessage.vue';
export default {
  name: "UserLogin",
  data: function() {
    return {
      user: {
        name: "",
        email: ""
      },
      url: "http://localhost:3000/user",
      message: {
        show_message: false,
        title: "Erro",
        type: "error", 
        text:
          "Não foi possível conectar com a API, por favor verificar a conexão com a internet."
      }
    };
  },
  components: {
      "feedback-message": FeedbackMessage
  },
  methods: {
    validateUser: function() {
      this.user.name && this.user.email ? this.updateUser() : console.log("");
    },
    updateUser: function() {
      this.$emit("setUser", this.user);
      console.log(this.user);
      var self = this;

      axios
        .post(this.url, {
          name: self.user.name,
          email: self.user.email
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log("Não deu bom");
          console.log(error);
          self.message.show_message = true;
        });
    }
  }
};
</script>