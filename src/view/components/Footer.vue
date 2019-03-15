<template>
    <div class="footer">
        <p class="item">made with <span class="heart">&lt;3</span> by <a href="https://github.com/sleepyfran" target="_blank">Fran González</a></p>
        <a class="item" href="https://github.com/sleepyfran/readder-web" target="_blank">source code</a>
    </div>
</template>

<script>
export default {
    name: 'app-footer'
}
</script>


<style lang="scss" scoped>
@import '~@view/styles/_theme';

.footer {
    display: flex;
    align-items: center;
    justify-content: center;

    & a {
        text-decoration: none;

        @include applyTheme() {
            color: themed('anchors');

            &:active {
                color: themed('anchors');
            }
        }
    }

    .heart {
        @include applyTheme() {
            color: themed('heart');
        }
    }

    .item:not(:first-child) {
        border-left: solid 1px themed('primary');
        margin-left: 10px;
        padding-left: 10px;
    }
}

</style>
