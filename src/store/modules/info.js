import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const userID = await dispatch('getUserID')
        const info = (await firebase.database().ref(`/users/${userID}/info`).once('value')).val()

        commit('setInfo', info)
      } catch (error) { }
    }
  },
  getters: {
    info: state => state.info
  }
}
