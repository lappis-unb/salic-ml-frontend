<template>
    <!-- TODO Colocar o cicle progress bar -->  
    <div class="ui clearing basic segment" id="Summary">
        <div class="clearfix">
            <!-- <div id="indicatorContainer"></div> -->
        </div>
        <h1 class="ui header">
            Diagnóstico de complexidade da prestação de contas
        </h1>
    </div>
</template>

<script>
export default {
  name: "ComplexityTitle",
  data: function() {
    return {};
  }
};
</script>

<style>

/*************************** 
 ********* Summary *********
 ***************************/

#Summary{
	display: table;
}

#Summary .c100{
	margin: 0 0.2em 0 0;
}

#Summary .ui.header{
	display: table-cell;
	font-size: 4em;
	font-style: italic;
	margin: 0;
	vertical-align: middle;
}

</style>
