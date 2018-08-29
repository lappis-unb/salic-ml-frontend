<template>
    <div class="ui info message">
    <i class="close icon"></i>
    <div class="header">
        Sucesso ao enviar o feedback
    </div>
    <ul class="list">
        <li>Agradecemos pelo seu feedback!</li>
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
  }
};
</script>
