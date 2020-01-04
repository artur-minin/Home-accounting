<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning_Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{'Planning_NoCategoriesYet' | localize}},
      <router-link to="/categories">{{'Planning_AddNewCategory' | localize}}</router-link>
    </p>

    <section v-else>
      <div v-for="category of categories" :key="category.categoryId">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency('RUB')}} {{'Planning_Of' | localize}} {{category.limit | currency('RUB')}}
        </p>
        <div class="progress" v-tooltip.nolocalize="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: `${category.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Title_Planning')
    }
  },

  data: () => ({
    loading: true,
    categories: []
  }),

  computed: {
    // add info field to data from VueX info module
    ...mapGetters(['info'])
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          return (total += Number(record.amount))
        }, 0)

      const percent = (100 * spend) / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = category.limit - spend
      const tooltip = `${
        tooltipValue < 0
          ? localizeFilter('Planning_ExcessBy')
          : localizeFilter('Planning_Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
