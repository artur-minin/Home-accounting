<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile_Profile' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{'Profile_Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Profile_EnterName' | localize}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Profile_Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('Title_Profile')
    }
  },

  data: () => ({
    name: '',
    isRuLocale: true
  }),

  validations: {
    name: { required }
  },

  computed: {
    // add info field to data from VueX info module
    ...mapGetters(['info'])
  },

  methods: {
    ...mapActions(['updateInfo']), // add "updateInfo" action to methods from VueX
    async submitHandler() {
      // "$v" is an alias for vuelidate
      // if the form didn't pass validation
      if (this.$v.$invalid) {
        // then activate vuelidate
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (error) {}
    }
  },

  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
