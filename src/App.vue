<template>
  <v-app src="assets/background.jpeg">
    <div src="assets/background.jpeg" id="app">
    <v-navigation-drawer 
    v-model="drawer"
    app>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in this.navItems"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold d-inline-flex">C<v-img class="img mr-0" src="./assets/connect4.jpg" max-height="10" max-width="10"> </v-img>nnect 4</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn to="/login"> Sign In</v-btn>
      <v-btn to="/register"> Sign Up </v-btn>
    </v-app-bar>

    <v-main>
      <!--  -->
       <router-view></router-view>
    </v-main>
    </div>
 
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      navItems : [
        {title: "Lobby", icon : 'mdi-account-group', to: "/lobby"},
        {title: "Rules", icon : 'mdi-help-circle', to: "/"}] }),
  }
</script>

<style lang="scss" scoped>
  .v-toolbar__title {
    display: flex;
  }

  .img {
    margin-top: 11px;
  }

  #app {
    background-image: url("assets/background.jpeg") !important;
    background-size: cover;
    
  }
</style>

