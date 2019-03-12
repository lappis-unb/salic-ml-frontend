<template>
  <div>
    <div v-if="metric.valor!=0" v-for="(object, index) in metric.list" :key="index+object+index" class="accordion">
      <div class="title">
        <i class="dropdown icon"></i>
        {{object.nome}}
      </div>
      <div class="content">
        <div class="ui bulleted list">                          
          <div v-for="(item, index) in object.items" :key="index+index+item" class="item">
            <a href="item.link">{{item.nome}}</a>
          </div>
        </div> 		
      </div>
    </div>
    <div v-else>{{text_exception}}</div>
  </div>
</template>

<script>
export default {
  name: "DropdownListCardContent",
  props: {
    metric: Object,
    text_exception: String
  }
};
</script>
