import Vue from 'vue'

import VueResource from 'vue-resource';
Vue.use(VueResource);
//Vue.http.options.root = '/api/v0'
Vue.http.options.credentials = true

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
