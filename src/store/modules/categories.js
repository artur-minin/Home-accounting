import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const userID = await dispatch('getUserID')
        const category = await firebase.database().ref(`/users/${userID}/categories`).push({ title, limit })

        return { title, limit, id: category.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
