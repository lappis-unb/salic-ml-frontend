<template>
  <div>
    <div v-if="metrica.valor!=0">
      <div v-for="(object, index) in metrica.list" :key="index+object+index" class="accordion">
        <div class="title">
          <i class="dropdown icon"></i>
          <span id="title">{{object.nome}}</span>
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
      <!--<a :href="metrica.link">Acesse a Planilha</a>-->
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

<style scoped>
#title {
  text-transform: capitalize;
}

a {
  font-weight: bold; 
  color: #0099a8 !important;
}

a:hover {
  color: #003f70 !important;
  text-decoration: underline !important;
}

</style>

