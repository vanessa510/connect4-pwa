import axios from "axios";
import router from "../../router";
import $ from "jquery";
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  REGISTER,
} from "../actions/auth";

const LOCAL = false;
const SERVER = "wt-connect4.herokuapp.com";
const SERVER_URL = `https://${LOCAL ? "localhost:9000" : SERVER}`;
const websocket = new WebSocket(
  `wss://${LOCAL ? "localhost:9000" : SERVER}/games/websocket`
);

const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  crossdomain: true,
};

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  cookie: document.cookie,
  loggedIn: false,
  games: [],
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((reject) => {
      axios
        .post(
          `${SERVER_URL}/signIn`,
          user,
          $.extend(axiosConfig, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
        )
        .then((resp) => {
          commit("SET_COOKIE", document.cookie);
          localStorage.setItem("user-token", resp.token);
          commit(AUTH_SUCCESS, resp);
          commit("SET_LOGEDIN", true);
          router.push("lobby");
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      commit("SET_COOKIE", document.cookie);
      commit("SET_LOGEDIN", false);
      localStorage.removeItem("user-token");
      resolve();
    });
  },
  [REGISTER]: ({ commit }, user) => {
    return new Promise((resolve) => {
      axios
        .post(`${SERVER_URL}/signUp`, user)
        .then((resp) => {
          commit[REGISTER];
          router.push("login");
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
        });
    });
  },
  logout({ commit }) {
    axios
      .get(`${SERVER_URL}/signOut`, axiosConfig)
      .then(() => {
        router.push("/login");
        commit("SET_COOKIE", document.cookie);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  },
  googleLogIn({ commit }) {
    window.location.href =
      "https://wt-connect4.herokuapp.com/authenticate/google";

    /* const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = SERVER + "/authenticate/google";
    $.ajax({
      url: proxyurl + url,
      type: "GET",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "https://wt-connect4.herokuapp.com/",
        "Content-Type": "application/x-www-form-urlencoded",
        Mode: "no-cors",
      },
      xhrFields: {
        withCredentials: true,
      },
      success: function(result) {
        console.log(JSON.stringify(result));
      },
    });
  },

  /*
    window.opener()
    window.location =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=456507613062-8o95kesvmbc22okoj0sa2o52015bfq20.apps.googleusercontent.com&redirect_uri=https://wt-connect4.herokuapp.com/frontend/&response_type=code&scope=https://www.googleapis.com/auth/contacts";
    axios
      .get(
        `${SERVER_URL}/authenticate/google`,
        $.extend(axiosConfig, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Header": "Access-Control-Allow-Origin",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
      )
      .then(function(response) {
        commit("SET_COOKIE", document.cookie);
        localStorage.setItem("user-token", resp.token);
        commit(AUTH_SUCCESS, resp);
        commit("SET_LOGEDIN", true);
        router.push("lobby");
      })
      .catch(function(response) {
        console.log(response);
        console.log("Something went wrong");
      });
  },*/
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },

  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = "";
  },
  SET_COOKIE(state, cookie) {
    state.cookie = cookie;
  },
  SET_LOGEDIN(state, loggedIn) {
    state.isLoggedIn = loggedIn;
  },
  SET_GAMES(state, games, msg) {
    //state.games = JSON.parse()
    //console.log("test", JSON.parse(msg).games)
  },
};

getters: {
  loggedIn: (state) => {
    return state.isLoggedIn;
  };
}

websocket.onopen = () => {
  console.log("Connected to Websocket");
};

websocket.onerror = () => {
  //router.push("login")
};

/*websocket.onmessage = e => {
  let msg = JSON.parse(e.data)
  
  if(msg.games) {
    console.log(msg.games[0])
    return msg.games
    //state.games = JSON.parse(e.data).games
    //mutations.SET_GAMES(state.games, msg.games, msg)
}

}*/

export default {
  state,
  getters,
  actions,
  mutations,
};
