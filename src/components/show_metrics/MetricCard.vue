<template>
    <div>
     <!-- METRIC -->
    <!-- 1 Porcentagem de itens do projeto em relação a distribuição dos itens mais comuns para aquele segmento ou area -->
        <!-- {{indicator.metrics.1.outlier_check}} -->
        <div class="title active">
            <div class="ui ribbon label">
                <i class="icon"></i>
            </div>
            <!-- {{indicator.metrics.1.value}}% -->
            <span>Itens orçamentários inesperados: </span>
            <i class="dropdown icon"></i>
            <div class="helper">
                <i class="question circle outline icon"></i>
                <div class="ui floating message">
                    <p>Indica os itens orçamentários deste projeto que
                        <strong>não estão entre os mais comuns</strong> do segmento.</p>
                    <p>Também lista os itens que aparecem frequentemente em projetos do segmento, mas que
                        <strong>não aparecem neste projeto</strong>.</p>
                </div>
            </div>
        </div>
        <div class="content active">
            <div class="ui grid">
                <div class="eight wide column">
                    <div class="list header">Itens inesperados</div>
                    <div class="ui bulleted list">
                        <!-- {% for itens in indicator.metrics.1.expected_itens %}
                        <div class="item">
                            <a href="{{itens.link}}">{{itens.name}}</a>
                        </div>
                        {% endfor %} -->
                    </div>
                </div>
                <div class="eight wide column">
                    <div class="list header">Itens ausentes</div>
                    <div class="ui bulleted list">
                        <!-- {% for itens in indicator.metrics.1.missing_itens %}
                        <div class="item">
                            <a href="{{itens.link}}">{{itens.name}}</a>
                        </div>
                        {% endfor %} -->
                    </div>
                </div>
                <div class="ui fedback form">
                    <div class="ui divider"></div>
                    <div class="header">Quanto essa informação é útil para você?</div>
                    <div class="fields">
                        <div class="five wide field rating-star" onclick="rmRedBorder(this)">
                            <div class="ui massive star rating" name="itens_orcamentarios_fora_do_comum_rating"></div>
                        </div>
                        <div class="inline field">
                            <input placeholder="Por quê?" type="text" size="50" name="itens_orcamentarios_fora_do_comum_text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
//import "@/../public/static/js/semantic.min.js"

export default {
  name: "MetricCard",
  data: function() {
    return {};
  },
  mounted: function () {
      $(".ui.rating").rating({
        initialRating: 0,
        maxRating: 5
      });
      
      $(".ui.accordion").accordion({ exclusive: false });
  }
};

</script>