import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const userID = await dispatch('getUserID')
        return await firebase.database().ref(`/users/${userID}/records`).push(record)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
