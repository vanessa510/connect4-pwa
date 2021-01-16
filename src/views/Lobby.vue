<template>
<div class="lobby ma-6">
    <div class="container">
      <h1>Lobby</h1>
        <div class="newGameContainer"> 
            <p class="ma-0" v-if="games.length === 0">There are currently no open Games, be the first to start playing!</p><br>
            </div>
    <v-btn class="ml-16" color="primary" to="/newGame"> Start new Game </v-btn>

        
        <p  v-if="games.length >0">
            These are the currently active games, join one if you want!<br>
        </p>
        <v-card
    max-width="344"
    outlined
    v-for="game in games"
    :key="game.id"
  >
    <v-list-item two-line>
      <v-list-item-content>
          <v-list-item-title class="headline mb-1">
              Game {{game.id + 1}}
          </v-list-item-title>
        <div>{{game.player1}}</div>
        <div> {{game.player2}}</div>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        color="primary"
        to="game/"   
      >
        Join Game
      </v-btn>
    </v-card-actions>
  </v-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : 'Lobby',
    data()  {
        return {
            games : []
        }

    },
    created: function () {
       //this.getGames();
       //axios.get("http://localhost:9000/games/0/json").then(res => console.log(res)).catch(err => console.log(err));
    },
    methods : {
      mounted() {
    
  },
        /*getGames() {
            //let ws = new WebSocket("ws://localhost:9000/games/websocket")
            this.$store.websocket.onopen = e => {
                ws.send(JSON.stringify({_type : "getGames"}))
            };
            ws.onerror = e => {
              console.log(e)
              //this.$router.push("login")
              
            }
            ws.onmessage = e => {
                
                let msg = JSON.parse(e.data)
                if(msg.games){
                    this.games = JSON.parse(e.data).games
                    ws.close()
                }
                
            }
            
        }*/
    },
    mounted() {

    const cookie = document.cookie;
    if (!cookie.startsWith("authenticator=")) {
      this.$router.push("login");
    }
    this.$store.dispatch("getGames");
  },
}
</script>

<style>

h1 {
  margin-bottom: 20px;
}

</style>


