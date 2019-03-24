import loadingTypes from './loading-types'
import { LOADING_POSTS, POSTS_LOADED, NO_RESULTS, ERROR } from './mutation-types'
import ServiceConnector from '@services/service-connector.js'

const state = {
    loadingStatus: null,
    results: []
}

const mutations = {
    [LOADING_POSTS] (state) {
        state.loadingStatus = loadingTypes.loading
    },

    [POSTS_LOADED] (state, posts) {
        state.loadingStatus = loadingTypes.success
        state.results = posts
    },

    [NO_RESULTS] (state) {
        state.loadingStatus = loadingTypes.noResults
        state.results = []
    },

    [ERROR] (state) {
        state.loadingStatus = loadingTypes.error
        state.results = []
    }
}

const actions = {
    async loadPostsFor ({ commit }, filter) {
        commit(LOADING_POSTS)

        return ServiceConnector.loadFrom(
            filter,
            (posts) => { commit(POSTS_LOADED, posts) },
            (error) => { commit(ERROR) },
            () => { commit(NO_RESULTS) }
        )
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}