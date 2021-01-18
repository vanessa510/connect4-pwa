<template>
<div class="game">
    <buttongroup @handle-click="handle"/>
    <board  v-if="playerWon === 'none'" @col-clicked="play" @update-done="updated" :message="msg" @player-won="winstate" />
    <div v-if="playerWon !== 'none'">Congrats you have won: {{playerWon}}</div>
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
            LOCAL : false,
            SERVER : "wt-connect4.herokuapp.com",
            SERVER_URL : `http://${LOCAL ? "localhost:9000" : SERVER}`,
            ID : 0,
            SOCKET : WebSocket,
            board : Board,
            msg : "",
            playerWon: "none",
        }
    },
    mounted() {

    const cookie = document.cookie;
    if (!cookie.startsWith("authenticator=")) {
      this.$router.push("login");
    }
  },

    created() {
        this.load()
        console.log(this.playerWon)
    },
     methods : {
        load() {
            
    console.log(this.ID);
    this.SOCKET = new WebSocket(`wss://${this.LOCAL ? 'localhost:9000' : this.SERVER}/games/${this.ID}/websocket`);
    
    this.SOCKET.onopen = () => {
        //SOCKET.send("Hey SERVER. IM HERE")
    }
    this.SOCKET.onmessage = (e) => {
        console.log(e);
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
        axios.get(`http://${this.SERVER_URL}/games/${this.ID}/json`).then((res) => {
            this.board.json = res.data;
            })
    }, 
    updated() {
        this.msg = "";
    },

    winstate(player){
        console.log(`Player won: ${player}`)
        this.playerWon = player;
    }


}
    }

</script>
