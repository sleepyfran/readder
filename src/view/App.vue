<template>
    <div id="app" :class="activeTheme">
        <div class="app-container">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '@view/components/Footer'
import themeTypes from '@store/modules/theme/theme-types'
import { getTheme, setTheme } from '@/infrastructure/storage'
import { CHANGE_THEME } from '@store/modules/theme/mutation-types'
import { mapMutations } from 'vuex'

export default {
    components: {
        Footer,
    },
    computed: {
        activeTheme: function() {
            return this.$store.state.theme.activeTheme === themeTypes.light ? 'light' : 'dark'
        },
    },
    watch: {
        activeTheme: function(val, oldVal) {
            // Dirty workaround to add the class to the body so that when we scroll past the viewport size
            // we don't get just a white background.
            document.body.classList.remove(oldVal)
            document.body.classList.add(val)
        },
    },
    created: function() {
        /**
         * Sets a color scheme for the website.
         * We firstly check if a color scheme is already saved
         * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
         */
        const savedThemePreference = getTheme()

        if (savedThemePreference) {
            this.changeTheme(savedThemePreference)
        } else {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            const isLightMode =
                window.matchMedia('(prefers-color-scheme: light)').matches ||
                window.matchMedia('(prefers-color-scheme: no-preference)').matches

            window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && this.activateDarkMode())
            window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && this.activateLightMode())
            window
                .matchMedia('(prefers-color-scheme: no-preference)')
                .addListener(e => e.matches && this.activateLightMode())

            if (isDarkMode) this.activateDarkMode()
            if (isLightMode) this.activateLightMode()
        }
    },
    methods: {
        ...mapMutations('theme', [CHANGE_THEME]),
        activateLightMode: function() {
            this.changeTheme(themeTypes.light)
            setTheme(themeTypes.light)
        },
        activateDarkMode: function() {
            this.changeTheme(themeTypes.dark)
            setTheme(themeTypes.dark)
        },
    },
}
</script>

<style lang="scss">
@import '~@view/styles/_theme';
@import '~@view/styles/_fonts';
@import '~@view/styles/_animations';

body {
    margin: 0;
    background-color: var(--background);
}

#app {
    color: var(--primary);
    background-color: var(--background);
    font-family: $default-fonts;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: $default-transition;

    input {
        transition: $default-transition;
    }

    h1 {
        font-family: $title-font, $default-fonts;
    }
}

.app-container {
    flex: 1;
}

/* Used in text and icons that are interactive. */
.hoverable {
    &:hover {
        cursor: default;
        color: var(--hovered);
    }
}

/* Base style for any text input in the app. */
.text-input {
    border: none;
    outline: none;
    font-size: $text-input-font-size;
    text-align: center;
    background-color: var(--background);
    border-bottom: 2px solid var(--primary);
    color: var(--primary);
}
</style>
