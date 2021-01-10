<template>
    <div class='board'>
        <div class ='boardrow' v-for="row in rows" v-bind:key="row">
            
        </div>
        <cell v-for="cell in cells" v-bind:key="`row-${cell.row}-col-${cell.col}`" v-bind:row="cell.row" v-bind:col="cell.col" />
        <div v-for="cell in cells" v-bind:key="cell">{{cell.row}}</div>
        {{rows}}
    </div>
</template>


<style>
.board {

 
    border: 10px solid #331A00;
}


.boardrow {
    display: flex;
    height:15%;
    margin: 2ex;
}

.cell:empty:before {
    content: "\200b"; /* unicode zero width space character */
}

.cell {
    display: inline-block;
    vertical-align: top;
    width : calc(100%/7);
    height: calc(100%/7);
    min-height : 100px;
    border: 1px solid black;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    color: azure;
    text-align: center;
    vertical-align: center;
    transition: transform .2s;
    background-color: #f7eed5;
}


.cell.red {
    border-color : black;
    background-color: darkred;
}

.cell.yellow {
    border-color: black;
    background-color: goldenrod;
}

.cell.scaled {
    transform: scale(1.5);
}

.cell.preview {
    filter: brightness(80%) saturate(60%);
}
</style>

<script>
import Cell from './Cell.vue';
export default {
  components: { Cell },
    name : 'Board',
    data : {
        rows : Number,
        cols : Number,
        cells : []
    },
    computed : {
        data(){
            return { 
                rows : 0,
            cols : 0,
            cells : []
            }
        }
    },
    methods : {
        zoomIn(col, id){
            console.log('called!')
        },
        init() {
            this.rows = []
            for(i = 0; i < this.amountRow; i++){
                rows.push([]);
                for(j = 0; j < this.amountCell; j++){
                    rows[i].push(new Cell());
                }
            }
        },
        update(json){
            console.log(json)
            this.rows = json.row
            this.cols = json.col
            this.cells = json.cells;
            console.log(this.cells);
            console.log(this.rows)
            console.log(this.cols)
    }

   
}
}
</script>