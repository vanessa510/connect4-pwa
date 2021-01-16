/*import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import Vuex, { mapGetters } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
  })*/
/*export default new Vuex.Store({
  state: {
  },
  mutations: {
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
  },
  actions: {

    
      
  },
  modules: {
    login
    
  }
})*/


import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
Vue.use(Vuex);


const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth
  },
  strict: debug
});


/*const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      apiCall({ url: "http://localhost:9000/signIn", data: user, method: "POST" })
        .then(resp => {
          localStorage.setItem("user-token", resp.token);
          
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
}

const mutations = {
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  }
}*/
