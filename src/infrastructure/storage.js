const themeKey = 'themePreference'

export const getTheme = () => localStorage[themeKey]
export const setTheme = value => (localStorage[themeKey] = value)
