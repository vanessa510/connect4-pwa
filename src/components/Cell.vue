<template>
    <div @click="setCell" @mouseenter="zoomIn" @mouseleave="zoomOut" class="cell" v-bind:class="{unset : !set , red : color === 'red', yellow : color === 'yellow', scaled : needsScale, preview : needsPrev}" ></div>
</template>

<script>
export default {
    name : 'Cell',
    props : {
        row : Number,
        col : Number,
        color : String,
        set : Boolean,
        needsScale : Boolean,
        needsPrev : Boolean
    },
    methods : {
        zoomIn()  {
            this.$emit('cell-zoomed-in', this.col);
        },
        zoomOut()  {
           this.$emit('cell-zoomed-out', this.col);

        },
        setCell()  {
            this.$emit('cell-clicked',this.col);
            //this.setCol('red');
        },
        setCol(color) {
            this.color = color;
        },
        test(){
            console.log('pressed');
        }
    }
}
</script>