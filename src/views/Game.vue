<template>
<div class="game">
    <buttongroup @handle-click="handle"/>
    <board @col-clicked="play" @update-done="updated" :message="msg" />
</div>
</template>

<style>
.game {
    margin : auto;
    width: 50%;
}
</style>

<script>
import Board from '../components/Board.vue'

import Buttongroup from '../components/Buttongroup.vue'
import axios from 'axios'

export default {
    name : 'Game',
    components : {
        Buttongroup,
        Board
    },
    data() {
        return {
            ID : 0,
            SOCKET : WebSocket,
            board : Board,
            msg : "",
        }
    },
    created() {
        this.load()
    },
     methods : {
        load() {
    console.log(this.ID);
    this.SOCKET = new WebSocket(`ws://localhost:9000/games/${this.ID}/websocket`);
    
    this.SOCKET.onopen = () => {
        //SOCKET.send("Hey SERVER. IM HERE")
    }
    this.SOCKET.onmessage = (e) => {
        if (typeof e.data === "string" && e.data === "done") {
            this.msg = e.data;
        }
        if (typeof e.data === "string" && e.data === "quitGame") {
            this.SOCKET.close();
            location.href = "/games"
        }
    }
    this.SOCKET.onerror = (error) => console.log(error)
    this.SOCKET.onclose = () => console.log("Websocket closed!")
    console.log(this.SOCKET)
    //this.getJSON()     
    },

    play(col){
        console.log(col);
        let turn = {
        _type : "playTurn",
        _msg : "",
        _col : col
    }
    this.SOCKET.send(JSON.stringify(turn));
    },

    handle(type){
        let event = {
        _type :type,
        _msg : ""
    }
        this.SOCKET.send(JSON.stringify(event));
    },

    getJSON() {
        axios.get(`http://localhost:9000/games/${this.ID}/json`).then((res) => {
            this.board.json = res.data;
            })
    }, 
    updated() {
        this.msg = "";
    }


}
    }

</script>
