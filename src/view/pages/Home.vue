<template>
    <div class="home">
        <Header title="Readder" />
        <PreferenceSelection
            :suggestedCommunities="suggestedCommunities"
            :minutes.sync="selectedMinutes"
            :community.sync="selectedCommunity"
            :subcommunity.sync="selectedSubcommunity"
            @enterPressed="loadPosts"
        />
        <LoadingButton :text="buttonText" :loading="loading" :disabled="disabled" @buttonClicked="loadPosts" />
    </div>
</template>

<script>
import Header from '@view/components/Header'
import PreferenceSelection from '@view/components/PreferenceSelection'
import LoadingButton from '@view/components/LoadingButton'
import loadingTypes from '@store/modules/posts/loading-types'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
    name: 'home',
    components: {
        Header,
        PreferenceSelection,
        LoadingButton,
    },
    data: function() {
        return {
            selectedMinutes: 0,
            selectedCommunity: undefined,
            selectedSubcommunity: undefined,
        }
    },
    computed: {
        loading: function() {
            return this.$store.state.posts.loadingStatus === loadingTypes.loading
        },

        disabled: function() {
            return !this.selectedCommunity || isEmpty(this.selectedSubcommunity)
        },

        buttonText: function() {
            if (!this.selectedCommunity) return 'Specify a community'
            if (!this.selectedSubcommunity) return 'Specify a subcommunity'

            return 'Show me!'
        },
    },
    methods: {
        ...mapActions('posts', ['loadPostsFor']),

        loadPosts: function() {
            this.loadPostsFor({
                minutes: this.selectedMinutes,
                community: this.selectedCommunity.name,
                subcommunity: this.selectedSubcommunity,
            }).then(() => {
                this.toReaderPage()
            })
        },

        toReaderPage: function() {
            this.$router.push('/reader')
        },
    },
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
