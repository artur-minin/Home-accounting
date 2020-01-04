<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Login_HomeAccounting' | localize}}</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'Login_FillEmailField' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Login_EnterValidEmailAddress' | localize}}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'Login_Password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'Login_EnterPassword' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'Login_PasswordMinLength' | localize}} {{passwordMinLength}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Login_Login' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Login_NoAccount' | localize}}?
        <router-link to="/register">{{'Login_Register' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/common/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('Title_Login')
    }
  },

  data: () => ({
    email: '',
    password: ''
  }),

  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required }
  },

  computed: {
    passwordMinLength: function() {
      return this.$v.password.$params.minLength.min
    }
  },

  methods: {
    async submitHandler() {
      // "$v" is an alias for vuelidate
      // if the form didn't pass validation
      if (this.$v.$invalid) {
        // then activate vuelidate
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (error) {}
    }
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      // $message - custom property from @/common/message.plugin.js
      const message = localizeFilter(messages[this.$route.query.message])
      this.$message(message)
    }
  }
}
</script>
