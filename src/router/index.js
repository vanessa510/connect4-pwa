import Vue from "vue";
import VueRouter from "vue-router";
import Rules from "../views/Rules.vue";
import Lobby from "../views/Lobby.vue";
import OAuth from "../components/OAuth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/oauth/:provider",
    name: "oauth",
    component: OAuth,
    props: (route) => ({
      provider: route.params.provider,
    }),
  },
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
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
