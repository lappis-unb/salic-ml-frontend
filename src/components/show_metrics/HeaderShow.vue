<template>
    <div class="ui fixed inverted menu" id="ProjectID">
        <router-link to="/" class="ui icon inverted button" id="btBack">
            <i class="left arrow icon"></i>
        </router-link>
        <div class="ui tiny inverted statistic">
            <div class="label">PRONAC</div>
            <div class="value">{{ project.pronac }}</div>
        </div>
        <h1>{{ project.name }}</h1>
        <!-- 
        TODO -> Criar lógica para colocar se há ou não usuário 
        {% if user %}
        <div class="ui basic segment" id="LoggedUser">
            Avaliando como:
            <br />{{user.name}}
        </div>
        {% endif %} -->
    </div>
</template>

<script>
    export default {
        name: "HeaderShow",
        data: function() {
            return {
                project: {
                    name: "Qualquer",
                    pronac: "12345"
                }
            }
        }
        // props: {
        //     project: Object
        // }
    }
</script>