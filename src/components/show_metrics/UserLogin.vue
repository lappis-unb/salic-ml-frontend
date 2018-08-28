<template>
    <div class="ui ten column centered grid" style="margin-top:50px;">
    <div class="ui raised segment" id="LoginArea">
        <div class="ui form">
            <div class="header">
                Preencha seus dados para avaliar este projeto (ou para continuar uma avaliação interrompida):
            </div>
            <form action="/user_info" method="post">
                <div class="three fields">
                    <div class="six wide field">
                        <input required placeholder="Nome Completo" type="text" name="user_first_name">
                    </div>
                    <div class="seven wide field">
                        <div class="ui right labeled input">
                            <input required placeholder="Email" type="text" name="user_email">
                            <div class="ui label">
                                @cultura.gov.br
                            </div>
                        </div>
                    </div>
                    <!-- value="{{ project.pronac }}" -->
                    <input type="hidden" name="project_pronac" >
                    <div class="two wide field">
                        <input class="ui submit button primary" type="submit" value="Enviar">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'UserLogin'
    }
</script>