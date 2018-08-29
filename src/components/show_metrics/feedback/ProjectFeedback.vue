<template>
  <div class="ui basic segment" id="FinalForm">
        <div class="ui equal width form project-feedback-container">
            <div class="header">
                Na sua opinião, como você avalia
                <em>&ldquo;{{ project.name }}&rdquo;</em>:
            </div>
            <div class="inline fields">
                <div class="field" v-for="(grade, index) in project_feedback_list" :key="grade+index">
                    <div class="ui radio checkbox">
                        <input type="radio" required name="project_feedback_grade">
                        <label>{{ grade }}</label>
                    </div>
                </div>
            </div>
        </div>
        <!-- onmouseover="getRating()" href="#first-star"  -->
        <button class="scroll ui huge primary button" type="submit">
            Terminar Diagnóstico
        </button>
    </div>
</template>

<script>
export default {
  name: "ProjectFeedback",
  data: function() {
    return {
      project: {
        name: "Qualquer"
      },
      project_feedback_list:  ['Muito simples', 'Simples', 'Normal', 'Complexo', 'Muito complexo']
    };
  }
  //   props: {
  //       project: Object
  //   }
};
</script>
<style>
#FinalForm{
	margin: 3em !important;
    text-align: center !important;
}

#FinalForm .header{
    font-size: 1.2em !important;
}

.project-feedback-container{
	margin-bottom: 4em !important;
}
</style>
