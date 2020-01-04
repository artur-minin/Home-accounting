import localizeFilter from '@/filters/localize.filter'

// plugin for Vue.js, which shows a notification with the given text
export default {
  // install method is required for registration plugin in Vue
  install(Vue, options) {
    // message notification
    Vue.prototype.$message = function(html) {
      // "M" - materialize-css' object
      // "toast" - materialize-css' method that displays a pop-up notification
      M.toast({ html })
    }

    // error notification
    Vue.prototype.$error = function(html) {
      const text = `[${localizeFilter('Error')}]: ${html}`
      M.toast({ html: text })
    }
  }
}
