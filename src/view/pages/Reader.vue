<template>
    <div class="reader">
        <Header
            :title="postTitle"
            :subtitle="postSubreddit"
            @titleClicked="redirectToPost"
            @subtitleClicked="redirectToSubreddit" />

        <Content :content="postContent" />
    </div>
</template>

<script>
import Header from '@view/components/Header'
import Content from '@view/components/Content'
import { isEmpty } from 'lodash'

export default {
    name: 'reader',
    components: {
        Header,
        Content
    },
    data: function () {
        return {
            postIndex: 0
        }
    },
    methods: {
        redirectToPost: function () {
            window.open(this.currentPost.url)
        },

        redirectToSubreddit: function () {
            window.open(this.currentPost.subredditUrl)
        }
    },
    computed: {
        currentPost: function () {
            return this.$store.state.posts.results[this.postIndex]
        },

        postTitle: function () {
            return this.currentPost
                ? this.currentPost.title
                : ''
        },

        postSubreddit: function () {
            return this.currentPost
                ? this.currentPost.community
                : ''
        },

        postContent: function () {
            return this.currentPost
                ? this.currentPost.html
                : ''
        }
    },

    /* Hooks */
    created: function () {
        // If we have nothing to show, redirect home.
        if (isEmpty(this.$store.state.posts.results)) {
            this.$router.replace('/')
        }
    }
}
</script>
