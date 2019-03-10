<template>
  <div class="home">
      <Header title="Readder" />
      <PreferenceSelection
        :suggestedCommunities="suggestedCommunities"
        :minutes.sync="selectedMinutes"
        :community.sync="selectedCommunity" />
  </div>
</template>

<script>
import Header from '@view/components/Header'
import PreferenceSelection from '@view/components/PreferenceSelection'

export default {
    name: 'home',
    components: {
        Header,
        PreferenceSelection
    },
    data: function() {
        return {
            selectedMinutes: 0,
            selectedCommunity: ''
        }
    },
    computed: {
        suggestedCommunities: function() {
            return ['nosleep', 'lifeofnorman', 'philosophy', 'history'] // TODO: Move this somewhere else.
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
}

</style>
