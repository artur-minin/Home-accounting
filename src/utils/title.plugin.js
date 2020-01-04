import localizeFilter from '@/filters/localize.filter'

// plugin for Vue.js, which replaces the title in the browser tab
export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE
      return `${localizeFilter(titleKey)} | ${localizeFilter(appName)}`
    }
  }
}
