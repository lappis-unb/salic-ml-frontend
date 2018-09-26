<template>
  <div>
    <div class="ui bulleted list">
      <div v-for="(project, index) in metric.proponent_projects" :key="project+index" class="item">
        <a href="proponent.link">{{project.pronac}} - {{project.name}} </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProponentsListCardContent",
  props: {
    metric: Object
  }
};
</script>
