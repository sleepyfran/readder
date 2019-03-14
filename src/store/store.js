import Vue from 'vue'
import Vuex from 'vuex'
import posts from '@store/modules/posts/posts'
import theme from '@store/modules/theme/theme'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        posts,
        theme
    }
})
