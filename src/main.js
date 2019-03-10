import Vue from 'vue'
import App from '@view/App.vue'
import router from './router'
import store from '@vuex/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import configureIcons from '@view/icons'

Vue.config.productionTip = false

// FontAwesome configuration
configureIcons(library)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
