<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий нет
      <br />
      <router-link to="/categories">Добавить новую категорию</router-link>
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
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Минимальная сумма {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Введите описание категории</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',

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

          this.$message('Запись успешно создана!')
          // reset the form's validation
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
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
