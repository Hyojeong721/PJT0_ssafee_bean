import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(vueMoment)