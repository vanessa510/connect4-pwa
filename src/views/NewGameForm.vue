<template>
    <div class="container pa-6">
       <h1>Welcome! </h1>
       <h4>Please enter your names: </h4>
       <v-form>
         <v-text-field
            placeholder="player1"
            label="Name"
            v-model="player1"
            clearable
            filled
          ></v-text-field>
          <v-text-field
            placeholder="player2"
            label="Name"
            v-model="player2"
            clearable
            filled
          ></v-text-field>
          <div class="button-container">
          <v-btn class="btn" color="primary" to="/lobby"> <v-icon left>mdi-arrow-left</v-icon> Back to Lobby </v-btn>
          <v-btn  color="primary" v-on:click="createGame()"> Start Game <v-icon >mdi-dice-multiple</v-icon> </v-btn>
          </div>

       </v-form>
        
         </div>
</template>

<script>
export default {
    name : 'newGame',

    data() {
        
        return {
            player1 : '',
            player2 : ''
        }
        
        

    },

    methods : {
        createGame() {
        let ws = new WebSocket("ws://localhost:9000/games/websocket")
        ws.onopen = e => {
            ws.send(JSON.stringify({_type : "createGame", player1 : this.player1, player2 : this.player2}))
        };
        ws.onmessage = e => {
            ws.close()
        }
        this.$router.push('game');
        }
        
    }
}
</script>


<style>
    .container {
        margin: auto;
        position: absolute;
        top:0;
	    bottom: 0;
	    left: 0;
	    right: 0; 
        
    }

    .btn {
        margin-right: 10px;
    }

    .v-text-field {
        width: 50%;
    }

  



</style>