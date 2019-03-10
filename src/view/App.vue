<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:500');
@import '~@view/styles/colors';
@import '~@view/styles/fonts';

#app {
    font-family: $default-fonts;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-text-color;

    h1 {
        font-family: $title-font, $default-fonts;
    }
}

/* Used in text and icons that are interactive. */
.hoverable {
    &:hover {
        color: $hovered-text-color;
        cursor: default;
    }
}

</style>
