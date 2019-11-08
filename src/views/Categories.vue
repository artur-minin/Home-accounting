<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @category-created="addNewCategory" />

        <CategoryEdit />
      </div>
    </section>
  </div>
</template>


<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',

  components: {
    CategoryCreate,
    CategoryEdit
  },

  data: () => ({
    loading: true,
    categories: []
  }),

  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    }
  }
}
</script>
