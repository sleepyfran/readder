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

.content {
    font-size: 1.2em;
    text-align: left;
    padding: 0 20%;
}

</style>
