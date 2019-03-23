<template>
    <div class="header">
        <div class="titles">
            <h1 class="hoverable" @click="onTitleClicked">{{ title }}</h1>
            <h3 class="hoverable" v-if="subtitle" @click="onSubtitleClicked">{{ subtitle }}</h3>
        </div>

        <div class="settings">
            <font-awesome-icon class="hoverable" @click="onThemeChangeClicked" icon="moon" />
            <font-awesome-icon class="hoverable" @click="onFontChangeClicked" icon="font" />
        </div>
    </div>
</template>

<script>
import { SWITCH_THEME } from '@store/modules/theme/mutation-types'
import { mapActions } from 'vuex'

export default {
    name: 'app-header',
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String
        }
    },
    methods: {
        ...mapActions('theme', [
            SWITCH_THEME
        ]),

        onTitleClicked: function() {
            this.$emit('titleClicked')
        },

        onSubtitleClicked: function() {
            this.$emit('subtitleClicked')
        },

        onThemeChangeClicked: function() {
            this.switchTheme()
        },

        onFontChangeClicked: function() {
            this.$emit('fontChangeClicked')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@view/styles/_theme';

$breaking-width-size: 1200px;
@mixin default-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    @media (max-width: $breaking-width-size) {
        flex-direction: column;
    }
}

.header {
    @include default-flex();

    & .titles {
        @include default-flex();

        & h3 {
            margin-top: 30px;
            margin-left: 10px;
            color: var(--secondary);

            @media (max-width: $breaking-width-size) {
                margin: 10px;
            }
        }
    }

    & .settings {
        & * {
            font-size: 1.5em;
            padding: 0 0.5em;
        }
    }
}

</style>
