<template>
  <div>
    <div v-if="metrica.valor_indisponivel" v-for="(object, index) in metrica.list" :key="index+object+index" class="accordion">
      <div class="title">
        <i class="dropdown icon"></i>
        {{object.name}}
      </div>
      <div class="content">
        <div class="ui bulleted list">
          <div v-for="(item, index) in object.items" :key="index+index+item" class="item">
            <a href="item.salic_url">{{item.name}}</a>
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
    metrica: Object,
    text_exception: String
  }
};
</script>
