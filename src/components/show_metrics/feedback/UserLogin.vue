<template>
    <div class="ui ten column centered grid" style="margin-top:50px;">
    <div class="ui raised segment" id="LoginArea">
        <div class="ui form">
            <div class="header">
                Preencha seus dados para avaliar este projeto (ou para continuar uma avaliação interrompida):
            </div>
            <div class="three fields">
                <div class="six wide field">
                    <input required placeholder="Nome Completo" type="text" name="user_first_name" v-model="user.name">
                </div>
                <div class="seven wide field">
                    <div class="ui right labeled input">
                        <input required placeholder="Email" type="text" name="user_email"  v-model="user.email">
                        <div class="ui label">
                            @cultura.gov.br
                        </div>
                    </div>
                </div>
                <input type="hidden" name="project_pronac" >
                <div class="two wide field">
                    <input class="ui submit button primary" type="submit" value="Enviar"  v-on:click="updateUser()">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "UserLogin",
  data: function() {
    return {
      user: {
        name: "",
        email: ""
      },
      url: "http://localhost:3000/user"
    };
  },
  methods: {
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
          console.log(error);
        });
    }
  }
};
</script>