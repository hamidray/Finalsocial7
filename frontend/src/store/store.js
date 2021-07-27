import Vue from 'vue'
import Vuex from 'vuex'
import Router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
        },
       mutations: {
            updateAccessToken (state, token) {
                state.token = token
                if(token) {
                   state.isUserLoggedIn = true
                } else {
                    state.isUserLoggedIn = false
                }
            },

            updateUserData (state, user) {
                state.user = user
            },
        //    setUser (state, user) {
        //        state.user = user
        //    },

           logout (state) {
            state.accessToken = null
            state.isUserLoggedIn = false
          }
        },
        actions: {
        fetchAccessToken ({ commit }) {
            commit('updateAccessToken', { token: localStorage.getItem('authToken') })
        },
        setToken ({commit}, token) {

            commit('setToken', token)
         },
         setUser ({commit}, user) {
          commit('setUser', user)
        },
        dologout ({ commit }) {
            localStorage.removeItem('authToken')
            commit('logout')
            Router.push('/login').catch(() => {})
        }
     }
})
