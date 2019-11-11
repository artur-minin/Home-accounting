import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const userID = await dispatch('getUserID')
        const categories = (await firebase.database().ref(`/users/${userID}/categories`).once('value')).val() || {}

        return Object.keys(categories).map(categoryID => ({
          ...categories[categoryID],
          id: categoryID
        }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const userID = await dispatch('getUserID')
        const category = await firebase.database().ref(`/users/${userID}/categories`).push({ title, limit })

        return { title, limit, id: category.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const userID = await dispatch('getUserID')
        await firebase.database().ref(`/users/${userID}/categories`).child(id).update({ title, limit })

      } catch (error) {
        commit('setError', error)
        throw error
      }
    }

  }
}
