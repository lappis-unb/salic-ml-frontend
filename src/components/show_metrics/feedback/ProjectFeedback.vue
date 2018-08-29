<template>
  <div class="ui basic segment" id="FinalForm">
        <div class="ui equal width form project-feedback-container">
            <div class="header">
                Na sua opinião, como você avalia
                <!-- <em>&ldquo;{{ project.name }}&rdquo;</em>: -->
            </div>
            <div class="inline fields">
                <!-- {% for grade in project_feedback_list %}
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" required name="project_feedback_grade" value={{forloop.counter}}>
                        <label>{{ grade }}</label>
                    </div>
                </div>
                {% endfor %} -->
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
};
</script>
