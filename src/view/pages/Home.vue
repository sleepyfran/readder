<template>
  <div class="home">
        <Header title="Readder" />
        <PreferenceSelection
            :suggestedCommunities="suggestedCommunities"
            :minutes.sync="selectedMinutes"
            :community.sync="selectedCommunity" />
        <LoadingButton
            text="Show me!"
            :isLoading="isLoading"
            :isDisabled="isDisabled"
            @buttonClicked="onButtonClicked" />
  </div>
</template>

<script>
import Header from '@view/components/Header'
import PreferenceSelection from '@view/components/PreferenceSelection'
import LoadingButton from '@view/components/LoadingButton'
import loadingTypes from '@store/modules/posts/loading-types'
import { mapActions } from 'vuex'

export default {
    name: 'home',
    components: {
        Header,
        PreferenceSelection,
        LoadingButton
    },
    data: function() {
        return {
            selectedMinutes: 0,
            selectedCommunity: '',
            isDisabled: false
        }
    },
    methods: {
        ...mapActions('posts', {
            loadPosts: 'loadPostsFor'
        }),

        onButtonClicked: function () {
            this.loadPosts({
                minutes: this.selectedMinutes,
                subreddit: this.selectedCommunity
            }).then(() => {
                this.$router.push('/reader')
            })
        }
    },
    computed: {
        suggestedCommunities: function() {
            return ['nosleep', 'lifeofnorman', 'philosophy', 'history'] // TODO: Move this somewhere else.
        },

        isLoading: function () {
            return this.$store.state.posts.loadingStatus === loadingTypes.loading
        }
    }
}
</script>

<style lang="scss" scoped>

.home {
    display: flex;
    flex-direction: column;

    & .preference-selection {
        align-self: center;
        margin-top: 5%;
    }

    & .loading-button {
        align-self: center;
        margin-top: 2%;
    }
}

</style>
