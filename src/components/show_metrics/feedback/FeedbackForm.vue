<template>
    <div class="ui fedback form">
        <div class="header">Quanto essa informação é útil para você?</div>
        <div class="fields">
            <div class="four wide field rating-star">
                <div class="ui massive star rating" name="itens_orcamentarios_rating"></div>
            </div>
            <div class="inline field">
                <input placeholder="Por quê?" type="text" size="50" name="itens_orcamentarios_text">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FeedbackForm",
    mounted: function(){
        $('.ui.rating').rating({
            initialRating: 0,
            maxRating: 5
        });
    }
}
</script>

<style>
/*************************** 
 ********** Forms **********
 ***************************/

.form .divider{
	margin-top: 2em !important;
}

.ui.form .header{
	display: block !important;
	margin-bottom: 1em !important;
}

.star.rating{
	padding-top: 6px;
	width: 90%;
}
</style>


