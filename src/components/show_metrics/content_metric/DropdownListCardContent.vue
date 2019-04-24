<template>
  <div>
      <a  class="Link" href="metrica.link" id="fdsa"><strong>Acesse a Planilha</strong></a>
    <div v-if="metrica.length!=0">
      <pre>
        </pre>
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

.Link {
  font-weight: bold; 
  cursor: pointer;
  color: #0099a8;
}

.Link:hover {
  color: #003f70;
  text-decoration: underline;
}


</style>

