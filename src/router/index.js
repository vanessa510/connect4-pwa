import Vue from "vue";
import VueRouter from "vue-router";
import Rules from "../views/Rules.vue";
import Lobby from "../views/Lobby.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/lobby",
    name: "Lobby",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Lobby.vue"),
  },
  {
    path: "/",
    name: "Rules",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rules.vue"),
  },
  {
    path: "/newGame",
    name: "new Game",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewGameForm.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/Game.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
