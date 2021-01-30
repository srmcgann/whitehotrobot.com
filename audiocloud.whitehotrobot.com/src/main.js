import { createApp } from 'vue'
import linkify from 'vue-linkify'

import App from './App.vue'
const myApp = createApp(App)

myApp.directive('linkified', linkify)
myApp.mount('#app')

