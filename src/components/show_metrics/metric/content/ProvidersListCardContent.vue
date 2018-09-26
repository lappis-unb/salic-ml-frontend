<template>
  <div>
    <div v-for="(provider, index) in metric.providers" :key="index+provider+index" class="accordion">
      <div class="title">
        <i class="dropdown icon"></i>
        {{provider.name}}
      </div>
      <div class="content">
        <div class="ui bulleted list">                          
          <div v-for="(item, index) in provider.items" :key="index+index+item" class="item">
            <a href="item.link">{{item.name}}</a>
          </div>
        </div> 		
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProvidersListCardContent",
  props: {
    metric: Object
  }
};
</script>
