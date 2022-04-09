import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, TabsPlugin } from 'bootstrap-vue'
import linkify from 'vue-linkify'
Vue.directive('linkified', linkify)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(TabsPlugin)

new Vue({
  el: '#app',
  ...App,
}).$mount('#app')

