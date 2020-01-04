import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const userID = await dispatch('getUserID')
        return await firebase
          .database()
          .ref(`/users/${userID}/records`)
          .push(record)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchRecords({ dispatch, commit }) {
      try {
        const userID = await dispatch('getUserID')
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${userID}/records`)
              .once('value')
          ).val() || {}

        return Object.keys(records).map(recordID => ({
          ...records[recordID],
          id: recordID
        }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },

    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const userID = await dispatch('getUserID')
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${userID}/records`)
              .child(id)
              .once('value')
          ).val() || {}

        return { ...record, id }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
