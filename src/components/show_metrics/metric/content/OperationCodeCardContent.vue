<template>
  <div>
    <div v-for="(provider, index) in metric.operation_list" :key="index+provider+index" class="accordion">
      <div class="title">
        <i class="dropdown icon"></i>
        {{provider.nome}}
      </div>
      <div class="content">
        <div class="ui bulleted list">                          
          <div v-for="(code, index) in provider.codigos_de_operacao" :key="index+index+code" class="accordion">
              <div class="title">
                <i class="dropdown icon"></i>
                {{code.nome}}
              </div>
              <div class="content">
                <div class="ui bulleted list">                          
                  <div v-for="(comprovante, index) in code.comprovantes" :key="index+index+comprovante" class="item">
                    <a href="comprovante.link">{{comprovante.nome}}</a>
                  </div>
                </div> 		
              </div>
            </div>
          </div>
        </div> 		
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperationCodeCardContent",
  props: {
    metric: Object
  }
};
</script>
