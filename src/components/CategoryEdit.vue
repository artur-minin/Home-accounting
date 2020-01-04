<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'CategoryEdit_Edit' | localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{category.title}}</option>
          </select>
          <label>{{'CategoryEdit_SelectCategory' | localize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'CategoryEdit_Title' | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{'CategoryEdit_EnterCategoryName' | localize}}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">{{'CategoryEdit_Limit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{'CategoryEdit_MinValue' | localize}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'CategoryEdit_Update' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    select: null,
    title: '',
    limit: 100,
    currentCategory: null
  }),

  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },

  watch: {
    currentCategory(currentCategoryID) {
      const { title, limit } = this.categories.find(
        category => category.id === currentCategoryID
      )

      this.title = title
      this.limit = limit
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.currentCategory,
          title: this.title,
          limit: this.limit
        }

        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('CategoryEdit_CategoryHasBeenUpdated'))
        this.$emit('category-updated', categoryData)
      } catch (error) {}
    }
  },

  created() {
    const { id, title, limit } = this.categories[0]

    this.currentCategory = id
    this.title = title
    this.limit = limit
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
