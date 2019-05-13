<template>
  <div class="helper">
    <i class="question circle outline icon"></i>
    <div class="ui floating message">
      <p>{{ helper_text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelperMetric",
  props: {
    helper_text: String
  }
};
</script>

<style>
/***************************
 ****** Help Message *******
 ***************************/
.helper {
  display: inline !important;
}

.helper .question.icon {
  color: #999;
  font-size: 1em;
  margin-left: 0.5em;
}

.helper:hover .question.icon {
  color: #2185d0;
}

.helper .ui.message {
  background-color: #dff0ff;
  border-color: #2185d0;
  color: #2185d0;
  font-size: 0.6em;
  font-weight: normal;
  left: 25%;
  margin: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transition: opacity 1s;
  visibility: hidden;
  width: 50%;
  z-index: 999;
}

.helper:hover .ui.message {
  opacity: 1;
  visibility: visible;
}
</style>
