<template>
    <div id="app" :class="activeTheme">
        <div class="app-container">
            <router-view />
        </div>
    </div>
</template>

<script>
import themeTypes from '@store/modules/theme/theme-types'

export default {
    computed: {
        activeTheme: function () {
            return this.$store.state.theme.activeTheme === themeTypes.light
                ? 'theme-light'
                : 'theme-dark'
        }
    }
}
</script>


<style lang="scss">
@import '~@view/styles/_theme';
@import '~@view/styles/_fonts';

body {
    margin: 0;
}

#app {
    font-family: $default-fonts;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;

    h1 {
        font-family: $title-font, $default-fonts;
    }
}

.app-container {
    height: 100vh;

    @include applyTheme() {
        color: themed('primary');
        background-color: themed('background');
    }
}

/* Used in text and icons that are interactive. */
.hoverable {
    &:hover {
        transition: 0.5s;
        cursor: default;

        @include applyTheme() {
            color: themed('hovered');
        }
    }
}

</style>
