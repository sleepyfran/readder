<template>
    <div class="preference-selection">
        <div class="preference-item">
            <p>I have</p>
            <input class="text-input minutes-input" type="number" v-model.number="minutes" />
            <p>{{ minutesText }}</p>
        </div>
        <div class="preference-item">
            <p>to read from</p>
            <CommunityInput
                :community.sync="community"
                :subcommunity.sync="subcommunity"
                @enterPressed="onEnterPressed"
            />
        </div>
    </div>
</template>

<script>
import CommunityInput from '@view/components/CommunityInput'
import { sample } from 'lodash'

export default {
    name: 'preferences-selection',
    components: {
        CommunityInput,
    },
    data: function() {
        return {
            minutes: 5,
            community: undefined,
            subcommunity: '',
        }
    },
    computed: {
        minutesText: function() {
            return this.minutes == 1 ? 'minute' : 'minutes'
        },
    },
    created: function() {
        this.$emit('update:minutes', this.minutes)
    },
    methods: {
        onEnterPressed: function() {
            this.$emit('enterPressed')
        },
    },
    watch: {
        minutes: function(val) {
            this.$emit('update:minutes', val)
        },

        community: function(val) {
            this.$emit('update:community', val)
        },

        subcommunity: function(val) {
            this.$emit('update:subcommunity', val)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '~@view/styles/_theme';

$min-column-size: 900px;
.preference-selection {
    display: flex;
    flex-direction: column;

    .preference-item {
        display: flex;
        font-size: 3em;
        align-self: center;

        & * {
            margin: 0 10px;
        }

        &:nth-child(2) p {
            margin: 0;
        }

        & .minutes-input {
            max-width: 100px;

            @media (max-width: $min-column-size) {
                max-width: 50px;
            }

            /* Disables the increase/decrease buttons. */
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                appearance: none;
            }
        }

        &:first-child {
            margin-bottom: 10px;
        }

        @media (max-width: $min-column-size) {
            &:nth-child(2) {
                flex-direction: column;
            }
        }

        @media (max-width: 500px) {
            font-size: 2em;
        }
    }

    @media (max-width: $min-column-size) {
        margin: 20px;
    }
}
</style>
