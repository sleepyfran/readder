<template>
    <div class="content" v-html="unescapedContent">

    </div>
</template>

<script>
import { unescape } from 'lodash'

export default {
    name: 'post-content',
    props: {
        content: {
            type: String,
            required: true
        }
    },
    computed: {
        unescapedContent: function () {
            return unescape(this.content)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@view/styles/_theme';

.content {
    font-size: 1.2em;
    text-align: left;
    padding: 0 20%;

    @media (max-width: 1300px) {
        padding: 0 10%;
    }

    @media (max-width: 800px) {
        padding: 0 5%;
    }
}

</style>
