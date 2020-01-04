<template>
  <div>
    <div class="page-title">
      <h3>{{'Record_NewRecord' | localize}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'Record_NoCategoriesYet' | localize}},
      <router-link to="/categories">{{'Record_AddNewCategory' | localize}}</router-link>
    </p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <select ref="select" v-model="currentCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>{{'Record_ChooseCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{'Record_Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{'Record_Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">{{'Record_Amount' | localize}}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >{{'Record_MinAmount'}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">{{'Record_Description' | localize}}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >{{'Record_EnterCategoryDescription'|localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Record_Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Title_Record')
    }
  },

  data: () => ({
    loading: true,
    select: null,
    categories: [],
    currentCategory: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),

  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },

  computed: {
    // add info field to data from VueX info module
    ...mapGetters(['info']),
    canCreateMethod() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateMethod) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.currentCategory,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })

          const message = localizeFilter('Record_RecordHasBeenCreated')
          this.$message(message)
          // reset the form's validation
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}
      } else {
        this.$message(
          `${localizeFilter('Record_NotEnoughMoneyToPay')}
          (${this.amount - this.info.bill})`
        )
      }
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.currentCategory = this.categories[0].id
    }

    // without setTimeout select doesn't has time to initialize
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
