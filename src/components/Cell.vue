<template>
    <div class="cell" v-bind:class="{unset : !set , red : color === 'red', yellow : color === 'yellow', scaled : needsScale}" ></div>
</template>

<script>
export default {
    name : 'Cell',
    props : {
        row : Number,
        col : Number,
        color : String,
        set : Boolean,
        needsScale : Boolean
    },
    methods : {
        zoomIn(color)  {
            if(!this.set){
                this.color = color;
                this.needsScale = true;
            }
        },
        zoomOut()  {
            if(!this.set){
                this.color = '';
            }
            this.needsScale = false;

        },
        set(val)  {
            this.set = val;
        },
        setCol(color) {
            this.color = color;
        }
    }
}
</script>