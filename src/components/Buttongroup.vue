<template>
<v-btn-toggle
class="d-flex"
          rounded>
         <v-btn v-for="button in this.buttons" v-bind:key="button.id" v-bind:id="button.id" color="primary" class="flex-grow-1"> {{button.text}} </v-btn>
</v-btn-toggle>
</template>

<script>
export default {
    name : "ButtonGroup",
    data() {
        return {
            buttons : [
                {text : 'Restart Game', id : 'btn_restart'},
                {text : 'Quit Game', id: 'btn_quit'},
                {text : 'Save Game', id : 'btn_save'},
                {text : 'Undo', id : 'btn_undo'},
                {text : 'Redo', id: 'btn_redo'}
                ]
        }
        
    }
}
</script>