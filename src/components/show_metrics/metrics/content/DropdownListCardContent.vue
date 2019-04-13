<template>
  <div>
    <div v-if="metrica.length!=0">
      <div v-for="(object, index) in metrica.list" :key="index+object+index" class="accordion">
        <div class="title">
          <i class="dropdown icon"></i>
          {{object.nome}} <a href="metrica.link">(Link dos itens)</a>
        </div>
        <div class="content">
          <div class="ui bulleted list">
            <div v-for="(item, index) in object.itens" :key="index+index+item" class="item">
              <div v-if="item.tem_comprovante">
                <p>{{item.nome}}</p>
              </div>
              <div v-else>{{item.nome}}</div>
            </div>
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

<style>
.title {
  text-transform: capitalize;
}
</style>

