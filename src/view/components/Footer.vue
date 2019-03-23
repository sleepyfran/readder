<template>
    <div class="footer">
        <p class="item">made with <span class="heart">&lt;3</span> by <a href="https://github.com/sleepyfran" target="_blank">Fran González</a></p>
        <a class="item" href="https://github.com/sleepyfran/readder" target="_blank">source code</a>
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
        color: var(--anchors);

        &:active {
            color: var(--anchors);
        }
    }

    .heart {
        color: var(--heart);
    }

    .item:not(:first-child) {
        border-left: solid 1px var(--primary);
        margin-left: 10px;
        padding-left: 10px;
    }
}

</style>
