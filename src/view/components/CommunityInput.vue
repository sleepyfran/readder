<template>
    <div class="community-input">
        <div class="text-input">
            <div class="selected-community" v-if="selectedCommunity">{{ selectedCommunity.keyword }}</div>
            <input
                type="text"
                v-model="inputText"
                @keydown.enter="onEnter"
                @keydown.delete="removeCommunity"
                @keydown.down="nextIndex"
                @keydown.up="previousIndex"
                @click="inputClicked = true"
            />
        </div>
        <div class="suggestions" v-if="showSuggestions">
            <ul>
                <li
                    v-for="(suggestion, index) in suggestions"
                    :key="suggestion.keyword"
                    @click="selectCommunity()"
                    @mouseover="selectedIndex = index"
                    :class="[selectedIndex === index ? 'selected' : '']"
                >
                    <span>({{ suggestion.keyword }})</span>
                    <span>{{ suggestion.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { includes } from 'lodash'

const communityMatches = (community, input) => includes(community.name, input) || includes(community.keyword, input)
const findCommunities = (communities, query) => communities.filter(c => communityMatches(c, query))

export default {
    communities: [
        {
            keyword: 'r/',
            name: 'reddit',
        },
        {
            keyword: 'dev#',
            name: 'dev.to',
        },
    ],
    data: () => ({
        inputText: '',
        inputClicked: false,
        selectedCommunity: undefined,
        selectedIndex: 0,
    }),
    computed: {
        suggestions: function() {
            const communityAlreadySelected = this.selectedCommunity
            if (communityAlreadySelected) return []

            return findCommunities(this.$options.communities, this.inputText)
        },

        showSuggestions: function() {
            return this.inputText.length > 0 || this.inputClicked
        },
    },
    methods: {
        onEnter: function() {
            const communityAlreadySelected = this.selectedCommunity
            if (communityAlreadySelected) return this.notifyEnter()

            this.selectCommunity()
        },

        selectCommunity: function(community) {
            this.selectedCommunity = this.suggestions[this.selectedIndex]
            this.inputText = ''
            this.selectedIndex = 0
        },

        removeCommunity: function() {
            const canRemove = this.selectedCommunity && this.inputText.length === 0
            if (canRemove) {
                this.selectedCommunity = undefined
            }
        },

        nextIndex: function() {
            const withinBounds = this.selectedIndex + 1 < this.suggestions.length
            if (!withinBounds) return

            this.selectedIndex += 1
        },

        previousIndex: function() {
            const withinBounds = this.selectedIndex - 1 >= 0
            if (!withinBounds) return

            this.selectedIndex -= 1
        },

        notifyEnter: function() {
            this.$emit('enterPressed')
        },
    },
    watch: {
        suggestions: function(val) {
            this.selectedIndex = 0
        },

        selectedCommunity: function(val) {
            this.$emit('update:community', val)
        },

        inputText: function(val) {
            const noCommunitySelected = !this.selectedCommunity
            if (noCommunitySelected) return

            this.$emit('update:subcommunity', val)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@view/styles/_fonts.scss';

.community-input {
    position: relative;

    & input {
        background-color: var(--background-color);
        border: none;
        color: var(--primary);
        font-size: $text-input-font-size;
        max-width: 70%;
        outline: none;
    }

    & .selected-community {
        display: inline-block;
        padding: 0 15px;
    }

    & .suggestions {
        background-color: var(--primary);
        color: var(--background);
        position: absolute;
        opacity: 0.9;
        width: 100%;

        & ul {
            list-style: none;
            margin: 0;
            padding: 0;

            & li {
                user-select: none;

                & > :first-child {
                    margin-right: 15px;
                }

                @mixin selected() {
                    background-color: var(--hovered);
                }

                &.selected {
                    @include selected();
                }
            }
        }
    }
}
</style>
