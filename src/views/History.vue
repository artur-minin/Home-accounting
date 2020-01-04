<template>
  <div>
    <div class="page-title">
      <h3>{{'History_RecordsHistory' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{'History_NoRecordsYet' | localize}},
      <router-link to="/record">{{'History_AddFirstRecord' | localize}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="currentPageItems" />

      <Pagination
        v-model="currentPage"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  extends: Pie,
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],

  data: () => ({
    loading: true,
    records: []
  }),

  methods: {
    async setup() {
      const categories = await this.$store.dispatch('fetchCategories')
      this.records = await this.$store.dispatch('fetchRecords')

      const finalRecords = this.records.reverse().map(record => {
        return {
          ...record,
          categoryName: categories.find(
            category => category.id === record.categoryId
          ).title,
          recordColor: record.type === 'income' ? 'green' : 'red',
          recordText: record.type === 'income' ? 'Income' : 'Outcome'
        }
      })

      this.setupPagination(finalRecords) // method from "paginationMixin"

      this.renderChart({
        labels: categories.map(category => category.title),
        datasets: [
          {
            data: categories.map(category => {
              // sum all category's records
              return this.records.reduce((total, record) => {
                const isOutcome = record.type === 'outcome'
                if (record.categoryId === category.id && isOutcome) {
                  total += Number(record.amount)
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(255, 0, 0, 0.5)',
              'rgba(255, 153, 0, 0.5)',
              'rgba(255, 238, 0, 0.5)',
              'rgba(0, 255, 13, 0.5)',
              'rgba(0, 255, 174, 0.5)',
              'rgba(0, 255, 255, 0.5)',
              'rgba(0, 132, 255, 0.5)',
              'rgba(157, 0, 255, 0.5)',
              'rgba(255, 0, 255, 0.5)',
              'rgba(255, 0, 123, 0.5)'
            ],
            borderColor: [
              'rgba(255, 0, 0, 1)',
              'rgba(255, 153, 0, 1)',
              'rgba(255, 238, 0, 1)',
              'rgba(0, 255, 13, 1)',
              'rgba(0, 255, 174, 1)',
              'rgba(0, 255, 255, 1)',
              'rgba(0, 132, 255, 1)',
              'rgba(157, 0, 255, 1)',
              'rgba(255, 0, 255, 1)',
              'rgba(255, 0, 123, 1)'
            ],
            borderWidth: 1
          }
        ]
      })

      this.loading = false
    }
  },

  mounted() {
    this.setup()
  }
}
</script>
