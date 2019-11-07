<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/common/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },

  watch: {
    error(firebaseError) {
      // $error - custom property from @/common/message.plugin.js
      this.$error(messages[firebaseError.code] || 'Что-то пошло не так :(')
    }
  }
}
</script>
