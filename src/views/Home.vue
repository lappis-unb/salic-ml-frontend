<template>
  <div class="home">
    <div class="ui fixed inverted menu" id="ProjectID">
      <h1>Projetos com Diagnóstico de complexidade</h1>
    </div>
    <div class="ui container">
      <feedback-message v-if="message_show" :message="message_obj"/>
      <vuetable></vuetable>
    </div>

  </div>
</template>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vuetable from '@/components/home_table/Table.vue'
import FeedbackMessage from '@/components/show_metrics/feedback/FeedbackMessage.vue'

export default {
  components: {
    Vuetable,
    'feedback-message': FeedbackMessage
  },
  data: function(){
    return {
      message_obj: {
        title: "Sucesso ao enviar o feedback",
        text: "Obrigado por contribuir!"
      },
      message_show: (false || this.message)
    }
  },
  props: {
    message: Boolean
  }
}
</script>