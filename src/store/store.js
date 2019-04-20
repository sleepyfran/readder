import Vue from 'vue'
import Vuex from 'vuex'
import posts from '@store/modules/posts/posts'
import theme from '@store/modules/theme/theme'
import { services } from '@services/service-connector'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        communities: services,
    },
    modules: {
        posts,
        theme,
    },
})
