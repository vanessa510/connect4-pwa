<template>
<div class="rules pa-6">
 <div class="header"><h1>Rules</h1></div>
    <div class="container"></div>
        <div id="overview">
            <h2> <v-img class="img" src="../assets/connect4.jpg" max-height="10" max-width="10"> </v-img> Overview</h2>
            <p>
                Connect 4 is a two player, turnbased strategy game.<br>
                You and your opponent take turns filling up the game board with your tokens of your color.<br>
                Your Goal is to build up consecutive lines of tokens to ultimately get 4 tokens in a row and win the game.<br>
                These rows can be vertical, horizontal or even diagonal! But beware, your enemy can and will disrupt your plans.
            </p>
        </div>
        <div id="turn">
            <h2> <v-img class="img" src="../assets/connect4.jpg" max-height="10" max-width="10"> </v-img> Play a Turn</h2>
            <p>
                At the start of the Game each of you picks a color, you'll get 21 Tokens of that color to try and win the game with.<br>
                If it's your turn you choose a Column to put in your token, the token then falls down until it either reaches the edge of the board or another Token<br>
                After your token has fallen down your opponent's turn begins.<br>
                    <img src="" alt="ADD FALLING TOKEN GIF">
            </p>
        </div>
        <div id="end">
            <h2> <v-img class="img" src="../assets/connect4.jpg" max-height="10" max-width="10"> </v-img>End of Game</h2>
            <p>
                The Game ends as soon there is a consecutive row of 4 Tokens in the same color. This can happen either horizontally<br>
                    <img src="" alt="ADD HORIZONZAL WIN">
                    <br>
                Or vertically<br>
                    <img src="" alt="ADD VERTICAL WIN">
                    <br>
                or even diagonally!<br>
                    <img src="" alt="ADD DIAGONAL WIN">
                <br>
                The Game ends in a draw if both players happen to run out of Tokens and all 42 Fields in the Board are filled without 4 of the same color in a row.
                    <img src="" alt="ADD FILLED BOARD">
            </p>
        </div>
        <p>Well, let's get started shall we? Check out the <a href="/games">Lobby</a></p>
    </div>
</template>

<script>


export default {
  name: 'Rules'
}
</script>


<style>
    h2 {
        display: flex;
    }

    .img {
        margin-right: 5px;
    }
</style>