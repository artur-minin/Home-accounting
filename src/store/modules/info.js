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
      state.info = {
        locale: state.info.locale
      }
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const userID = await dispatch('getUserID')
        const info = (
          await firebase
            .database()
            .ref(`/users/${userID}/info`)
            .once('value')
        ).val()

        commit('setInfo', info)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateInfo({ dispatch, commit, getters }, newData) {
      try {
        const userID = await dispatch('getUserID')
        const updateData = { ...getters.info, ...newData }

        await firebase
          .database()
          .ref(`/users/${userID}/info`)
          .update(updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
