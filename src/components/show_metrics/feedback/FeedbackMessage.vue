<template>
    <div class="ui message" :class="message.type">
    <i class="close icon"></i>
    <div class="header">
        {{message.title}}
    </div>
    <ul class="list">
        <li>{{message.text}}</li>
    </ul>
</div>
</template>

<script>
export default {
  name: "SuccessMessage",
  mounted: function() {
    $(".message .close").on("click", function() {
      $(this)
        .closest(".message")
        .transition("fade");
    });
  },
  props: {
    message: Object
  }
};
</script>
