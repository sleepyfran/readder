<template>
    <div class="preference-selection">
        <div>
            <p>I have</p>
            <input type="number" v-model.number="minutes" />
            <p>{{ minutesText }}</p>
        </div>
        <div>
            <p>to read from r/</p>
            <input type="text" v-model="community" />
        </div>
    </div>
</template>

<script>
import { sample } from 'lodash'

export default {
    name: 'preferences-selection',
    props: {
        suggestedCommunities: {
            type: Array,
            required: true
        },
    },
    data: function() {
        return {
            minutes: 5,
            community: ''
        }
    },
    watch: {
        minutes: function(value) {
            this.$emit('update:minutes', value)
        },
        community: function(value) {
            this.$emit('update:community', value)
        }
    },
    computed: {
        minutesText: function() {
            return this.minutes == 1 ? 'minute' : 'minutes'
        }
    },
    created: function() {
        this.$emit('update:minutes', this.minutes)
        this.community = sample(this.suggestedCommunities)
    }
}
</script>

<style lang="scss" scoped>
@import '~@view/styles/colors';

.preference-selection {
    display: flex;
    flex-direction: column;

    & div {
        display: flex;
        font-size: 3em;

        & * {
            margin: 0 10px;
        }

        &:nth-child(2) p {
            margin: 0;
        }

        & input {
            border: none;
            border-bottom: 2px solid $primary-color;
            outline: none;
            font-size: 1em;
            color: $primary-color;
        }

        &:first-child {
            margin-bottom: 10px;
        }
    }
}

</style>
