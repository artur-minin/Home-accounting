<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Register_HomeAccounting' | localize}}</span>

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
        >{{'Register_FillEmailField' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Register_EnterValidEmailAddress' | localize}}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'Register_Password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'Register_EnterPassword' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'Register_PasswordMinLength' | localize}} {{passwordMinLength}}</small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">{{'Register_Name' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Register_EnterYourName' | localize}}</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{'Register_IAgreeWithRules' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Register_Register'}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Register_HaveAccountAlready'}}?
        <router-link to="/login">{{'Register_Login' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Title_Registration')
    }
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    agree: false
  }),

  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
    name: { required },
    agree: { checked: v => v }
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
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {}
    }
  }
}
</script>
