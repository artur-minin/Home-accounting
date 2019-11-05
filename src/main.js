import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import dateFilter from './filters/date.filter'

Vue.config.productionTip = false;

//register custom filter function as "date" filter
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
