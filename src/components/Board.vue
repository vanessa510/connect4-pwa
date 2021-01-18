
<template>
<div>
    <div class='board'>
        <div class ='boardrow' v-for="row in cells" v-bind:key="row.id">
        <cell v-for="cell in row"
         :key="`row-${cell.row}-col-${cell.col}`"
         :row="cell.row"
         :col="cell.col"
         :id="`row-${cell.row}-col-${cell.col}`"
         :needsScale="cell.needsScale"
         :color="cell.color"
         :needsPrev="cell.needsPrev"
         @cell-clicked="clicked"
         @cell-zoomed-out="zoomOut"
         @cell-zoomed-in="zoomIn"
         ></cell>
        </div>
        
    </div>
   
</div>
    
</template>


<style>
.board {

    background-image: url("~@/assets/wood_background.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
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
import axios from 'axios';
export default {
  components: { Cell },
    name : 'Board',
    props : {
        message: String,
    },
    watch : {
       'message' : function() {
           if(this.message === "done");
           this.update();
       }
    },
    data() {
        return {
            json : JSON,
        rows : Number,
        cols : Number,
        cells : [],
        }
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
        zoomIn(col){
            const idx = this.findIdx(col);
            console.log(idx);
            for(let i = 0; i < this.cells.length; i++){
                const newRow = this.cells[i].slice(0);
                newRow[col].needsScale = true;
                if(i === idx) {
                    newRow[col].color = this.json.players[this.json.currentPlayerIndex].color.color
                    newRow[col].needsPrev = true;
                }
                this.$set(this.cells, i, newRow);
            }

            
        },
        zoomOut(col){
            const idx = this.findIdx(col);
            for(let i = 0; i < this.cells.length; i++){
                const newRow = this.cells[i].slice(0);
                newRow[col].needsScale = false;
                if(i === idx) {
                    newRow[col].color = "";
                    newRow[col].needsPrev = false;
                }
                this.$set(this.cells, i, newRow);
            }
        },
        clicked(col){
            this.$emit('col-clicked', col);

        },
        findIdx(col){
            let idx = 0;
            for(let i=0; i < this.cells.length; i++){
                if(this.cells[i][col].cell.isSet) break;
                idx++;
            }
            return idx-1;
        },
        update(){
            let that = this;
            const LOCAL = false;
            const SERVER = "wt-connect4.herokuapp.com";
            const SERVER_URL = `https://${LOCAL ? "localhost:9000" : SERVER}`;
             axios.get(`${SERVER_URL}/games/0/json`).then((res) => {
                 console.log(res.data.players[res.data.currentPlayerIndex].name);
            if(res.data.state === "PlayerWinState"){
                this.$emit('player-won',res.data.players[res.data.currentPlayerIndex].name )
            }
            this.json = res.data;
            this.rows = res.data.board.row
            this.cols = res.data.board.col
            this.cells = []
            for(let i = 0; i < this.rows; i++){
                this.cells.push([]);
                this.cells[i].push(new Array(this.cols));
            }
            this.json.board.cells.forEach(element => {
                element.color = element.cell.color.color
                this.cells[element.row][element.col] = element;
            });
            for(let i=0; i < this.cells.length; i++){
                const row = this.cells[i].slice(0);
                this.$set(this.cells, i, row);
            }
            this.$emit('update-done');
            console.log(this.cells);
            })
    }, 

   
}, 
 mounted() {
     this.update();
 }
}
</script>