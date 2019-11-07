import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import info from './modules/info'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchCurrency() {
      const accessKey = process.env.VUE_APP_FIXER_KEY
      const url = `http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=USD,EUR,RUB`

      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve(fetch(url))
        }, 500)
      })
      return await response.json()
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    info
  }
});
