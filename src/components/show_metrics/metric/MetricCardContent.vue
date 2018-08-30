<template>
    <div>
			<!-- <div class="ui pointing below label" id="MedianDisplay-Project">
				Este projeto
			</div>
			<div class="ui progress" :data-value="metric.bar.interval" :data-total="metric.bar.max_value"
					id="MedianDisplay-TotalItems">
					<div class="bar" id="barra">
							<div class="progress">{{metric.interval_start}} de {{metric.interval_end}} Média de itens</div>
					</div>
			</div> -->
			<p>{{metric.reason}}</p>
	</div>
</template>

<script>
export default {
  name: "MetricCardContent",
  props: {
    metric: Object
  }
};
</script>

<style>
</style>


