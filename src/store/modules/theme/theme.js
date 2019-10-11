import themeTypes from './theme-types'
import { setTheme } from '@/infrastructure/storage'
import { CHANGE_THEME, SWITCH_THEME } from './mutation-types'

const state = {
    activeTheme: themeTypes.light,
}

const mutations = {
    [CHANGE_THEME](state, theme) {
        state.activeTheme = theme
    },
}

const actions = {
    [SWITCH_THEME]({ commit }) {
        const switchedTheme = state.activeTheme === themeTypes.light ? themeTypes.dark : themeTypes.light

        commit(CHANGE_THEME, switchedTheme)
        setTheme(switchedTheme)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
