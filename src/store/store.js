import Vue from 'vue'
import Vuex from 'vuex'
import posts from '@store/modules/posts/posts'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        posts
    }
})
