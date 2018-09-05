<template>
    <div>
      <span v-if="metric.value!=0 && metric.type=='bar'">
        <div class="ui pointing below label" :class="metric.outlier_check" id="MedianDisplay-Project">
          Este projeto
        </div>
        <div class="ui progress" :data-value="metric.bar.interval" :data-total="metric.bar.max_value" id="bar">
          <div class="bar" id="barra">
            <div class="progress"></div>
          </div>
        </div>
      </span>
      <span v-else-if="metric.type=='items-list'">
        <div class="ui grid">
						<div class="eight wide column">
							<div class="list header" v-if="metric.uncommon_items.length != 0">Itens inesperados</div>
							<div class="ui bulleted list">                          
								<div v-for="(item, index) in metric.uncommon_items" :key="item+index" class="item">
                  <a :href="item.link">{{item.name}}</a>
                </div>
							</div>
						</div>
						<div class="eight wide column">
							<div class="list header" v-if="metric.common_items_not_in_project.length != 0" >Itens ausentes</div>
							<div class="ui bulleted list">                          
								<div v-for="(item, index) in metric.common_items_not_in_project" :key="item+index+index" class="item">
                <a :href="item.link">{{item.name}}</a></div>
							</div>
						</div>
        </div>
      </span>
      <span v-else-if=" metric.type=='proponents-list'">
        <div class="ui bulleted list">
          <div v-for="(project, index) in metric.proponent_projects" :key="project+index" class="item">
            <a href="proponent.link">{{project.pronac}} - {{project.name}} </a>
          </div>
        </div>
      </span>
      <span v-else-if="metric.type=='providers-list'">
        <div v-for="(provider, index) in metric.providers" :key="index+provider+index" class="accordion">
            <div class="title">
              <i class="dropdown icon"></i>
              {{provider.provider_name}}
            </div>
            <div class="content">
              <div class="ui bulleted list">                          
                <div v-for="(item, index) in provider.provider_items" :key="index+index+item" class="item">
                  <a href="item.item_link">{{item.item_name}}</a>
                </div>
              </div> 		
            </div>
          </div>
        </span>
       
			<p>{{metric.reason}}</p>
	</div>
</template>

<script>
export default {
  name: "MetricCardContent",
  data: function() {
    return {
      // metric: {
      //   type: 'list-proponents',
      //   interval_start: 30,
      //   interval_end: 70,
      //   bar: {
      //     interval: 50,
      //     max_value: 100
      //   }
      // }
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
    }
    */
  },
  props: {
    metric: Object
  }
};
</script>

<style>
</style>


