import _ from 'lodash'

export default {
  data() {
    return {
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: 3, // elements per page
      pageCount: 0,
      allItems: [],
      currentPageItems: []
    }
  },

  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = this.allItems.length
      this.currentPageItems =
        this.allItems[this.currentPage - 1] || this.allItems[0]
    },

    pageChangeHandler() {
      this.$router.push(`${this.$route.path}?page=${this.currentPage}`)
      this.currentPageItems =
        this.allItems[this.currentPage - 1] || this.allItems[0]
    }
  }
}
