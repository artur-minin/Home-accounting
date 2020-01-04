// pseudo plugin for Vue.js that shows a notification with the given text
export default {
  // install method is required for registration plugin in Vue
  install(Vue, options) {
    // simply notification
    Vue.prototype.$message = function(html) {
      // "M" - materialize-css' object
      // "toast" - materialize-css' method that displays a pop-up notification
      M.toast({ html })
    }

    // error notification
    Vue.prototype.$error = function(html) {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  }
}
