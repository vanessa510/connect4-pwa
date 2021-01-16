import  axios from "axios";
import router from '../../router'
import $ from "jquery";
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  REGISTER
} from "../actions/auth";


const websocket = new WebSocket("ws://localhost:9000/games/websocket");


const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  crossdomain: true
};


const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  cookie: document.cookie,
  loggedIn: false,
  games: []

};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((reject) => {
      axios.post("http://localhost:9000/signIn", user, $.extend(axiosConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
        .then(resp => {
          commit('SET_COOKIE', document.cookie)
          localStorage.setItem("user-token", resp.token);
          commit(AUTH_SUCCESS, resp);
          commit('SET_LOGEDIN', true)
          router.push("lobby")
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      commit('SET_COOKIE', document.cookie)
      commit('SET_LOGEDIN', false)
      localStorage.removeItem("user-token");
      resolve();
    });
  },
  [REGISTER]: ({commit}, user) => {
    return new Promise(resolve => {
      axios.post("http://localhost:9000/signUp", user)
      .then(resp => {
        commit[REGISTER];
        router.push("login")
      })
      .catch(err => {
        commit(AUTH_ERROR, err);
      });
      
      
    });
  },
  logout({ commit }) {
    axios.get("http://" + "localhost:9000" + "/signOut", axiosConfig)
      .then(() => {
        router.push("/login");
        commit('SET_COOKIE', document.cookie)
      })
      .catch(() => {
        console.log("Something went wrong");
      })
  }

};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },

  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  },
  SET_COOKIE(state, cookie) {
    state.cookie = cookie
  },
  SET_LOGEDIN (state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  SET_GAMES(state, games, msg) {
    
    //state.games = JSON.parse()
    //console.log("test", JSON.parse(msg).games)
  }
};

getters: {
  loggedIn: state => {
    return state.isLoggedIn
  }
}

websocket.onopen = () => {
  console.log("Connected to Websocket");
};

websocket.onerror = () => {
  //router.push("login")
}



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
  mutations
};