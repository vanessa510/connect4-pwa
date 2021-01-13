<template>
<v-btn-toggle
class="d-flex"
          rounded>
         <v-btn v-for="button in this.buttons" @click="() => handle(button.id)" v-bind:key="button.id" v-bind:id="button.id" color="primary" class="flex-grow-1"> {{button.text}} </v-btn>
</v-btn-toggle>
</template>

<script>
export default {
    name : "ButtonGroup",
    data() {
        return {
            buttons : [
                {text : 'Restart Game', id : 'btn_restart', },
                {text : 'Quit Game', id: 'btn_quit'},
                {text : 'Save Game', id : 'btn_save'},
                {text : 'Undo', id : 'btn_undo'},
                {text : 'Redo', id: 'btn_redo'}
                ]
        }
        
    }, 
    methods : {
        handle(id){
            switch(id){
                case 'btn_restart':
                    this.$emit('handle-click', 'restart');
                    break;
                case 'btn_quit':
                    this.$emit('handle-click', 'quit');
                    break;
                case 'btn_save':
                    this.$emit('handle-click', 'save');
                    break;
                case 'btn_undo':
                    this.$emit('handle-click', 'undo');
                    break;
                case 'btn_redo' : 
                    this.$emit('handle-click', 'redo');
                    break;

            }
        }
    }
}
</script>