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

export default {
    components: {
        Footer
    },
    computed: {
        activeTheme: function () {
            return this.$store.state.theme.activeTheme === themeTypes.light
                ? 'light'
                : 'dark'
        }
    },
    watch: {
        activeTheme: function(val, oldVal) {
            // Dirty workaround to add the class to the body so that when we scroll past the viewport size
            // we don't get just a white background.
            document.body.classList.remove(oldVal)
            document.body.classList.add(val)
        }
    }
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

</style>
