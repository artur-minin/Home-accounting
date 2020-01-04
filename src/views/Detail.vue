<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Detail_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">{{ record.text | localize }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card red" :class="[record.color]">
            <div class="card-content white-text">
              <p>{{'Detail_Description' | localize}}: {{ record.description }}</p>
              <p>{{'Detail_Amount' | localize}}: {{ record.amount | currency('RUB') }}</p>
              <p>{{'Detail_Category' | localize}}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с данным id не найдена</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Title_Detail')
    }
  },

  data: () => ({
    loading: true,
    category: null
  }),

  async mounted() {
    const recordId = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', recordId)
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )

    this.record = {
      ...record,
      categoryName: category.title,
      color: record.type === 'income' ? 'green' : 'red',
      text: record.type === 'income' ? 'Income' : 'Outcome'
    }

    this.loading = false
  }
}
</script>
