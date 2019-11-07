import firebase from 'firebase/app'

export default {
  actions: {
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const userID = await dispatch('getUserID')

        // set fields: name and bill in the database on a dynamic path
        await firebase.database().ref(`/users/${userID}/info`).set({
          name,
          bill: 10000
        })
      } catch (error) {
        // "commit" method changes the value of the store using a mutation
        commit('setError', error)
        throw error
      }
    },

    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async logout() {
      await firebase.auth().signOut()
    },

    getUserID() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
