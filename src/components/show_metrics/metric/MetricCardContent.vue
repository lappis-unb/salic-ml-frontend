<template>
    <div>
      <span v-if="metric.type=='bar'">
      oi
      <!--
			<div class="ui pointing below label" id="MedianDisplay-Project">
				Este projeto
			</div>
			<div class="ui progress" :data-value="metric.bar.interval" :data-total="metric.bar.max_value" id="bar">
				<div class="bar" id="barra">
					<div class="progress"></div>
				</div>
			</div>
      -->
      </span>
      <span v-else-if="metric.type=='list-items'">
        <div class="ui grid">
						<div class="eight wide column">
							<div class="list header">Itens inesperados</div>
							<div class="ui bulleted list">                          
								<div class="item"><a href="#">Nome do Item 1</a></div>
							</div>
						</div>
						<div class="eight wide column">
							<div class="list header">Itens ausentes</div>
							<div class="ui bulleted list">                          
								<div class="item"><a href="#">Nome do Item 1</a></div>
							</div>
						</div>
        </div>
      </span>
      <span v-else-if="metric.type=='list-proponents'">
        <div class="ui bulleted list">
          <div class="item"><a href="#">Nome do projeto 1</a></div>
          <div class="item"><a href="#">Nome do projeto 2</a></div>
          <div class="item"><a href="#">Nome do projeto 3</a></div>
        </div>
      </span>
      <span v-else-if="metric.type=='list-fornecedores'">
        <div class="accordion">
            <div class="title">
              <i class="dropdown icon"></i>
              Novo Fornecedor A
            </div>
            <div class="content">
              <div class="ui bulleted list">                          
                <div class="item"><a href="#">Nome do item 1</a></div>   
                <div class="item"><a href="#">Nome do item 2</a></div>   
                <div class="item"><a href="#">Nome do item 3</a></div>   
              </div> 		
            </div>
            <div class="title">
              <i class="dropdown icon"></i>
              Novo Fornecedor B
            </div>
            <div class="content">
              <div class="ui bulleted list">                          
                <div class="item"><a href="#">Nome do item 1</a></div>   
                <div class="item"><a href="#">Nome do item 2</a></div>   
                <div class="item"><a href="#">Nome do item 3</a></div>   
              </div> 		
            </div>
          </div>
        </span>
       
			<p>{{metric.reason}}-</p>
	</div>
</template>

<script>
export default {
  name: "MetricCardContent",
  data: function() {
    return {
      metric: {
        type: 'list-proponents',
        interval_start: 30,
        interval_end: 70,
        bar: {
          interval: 50,
          max_value: 100
        }
      }
    };
  },
  mounted: function() {
		/*
    var self = this
    $("#bar").progress({
      label: "ratio",
      text: {
        ratio: self.metric.interval_start + " de " + self.metric.interval_end + " Média de itens"
      }
    });
    $("#MedianDisplay-TotalItems").progress("increment");

    var mark_project = document.getElementById("MedianDisplay-Project");
    mark_project.addEventListener(
      "load",
      changeWidthBar(mark_project, document.getElementById("barra"))
    );
    function changeWidthBar(x, y) {
      // Barra
      y.style.left = "10" + "%";
      // Project
      var value = "50";
      x.style.left = value - 3 + "%";
    }*/
  }
  // props: {
  //   metric: Object
  // }
};
</script>

<style>
</style>


