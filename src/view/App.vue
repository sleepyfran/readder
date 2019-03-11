<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@view/styles/_colors';
@import '~@view/styles/_fonts';

#app {
    font-family: $default-fonts;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-color;

    h1 {
        font-family: $title-font, $default-fonts;
    }
}

/* Used in text and icons that are interactive. */
.hoverable {
    &:hover {
        color: $hovered-color;
        transition: 0.5s;
        cursor: default;
    }
}

</style>
