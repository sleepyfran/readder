<template>
    <div
        class="loading-button"
        :class="{ disabled : isDisabled, loading: isLoading }"
        @click="onButtonClicked">

        <span v-if="!isLoading">{{ text }}</span>
        <font-awesome-icon v-if="isLoading" class="spin" icon="circle-notch" />
    </div>
</template>

<script>
export default {
    name: 'loading-button',
    props: {
        text: {
            type: String,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        },
        isDisabled: {
            type: Boolean
        }
    },
    methods: {
        onButtonClicked: function($event) {
            const canBeClicked = !this.isDisabled && !this.isLoading
            if (canBeClicked) {
                this.$emit('buttonClicked')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@view/styles/_theme';
@import '~@view/styles/_animations';

.loading-button {
    font-size: 24px;
    min-width: 200px;
    padding: 10px;
    cursor: pointer;
    user-select: none;
    border-radius: 5px;
    background-color: var(--primary);
    color: var(--textOnBackground);
    transition: $default-transition;

    &.loading {
        background-color: var(--disabled);
    }

    &.disabled {
        cursor: not-allowed;
        background-color: var(--disabled);

        &:hover {
            background-color: var(disabled);
        }
    }

    &:hover {
        background-color: var(--hovered);
    }

    & .spin {
        animation: loading 1s ease-in-out infinite both;
    }
}

@keyframes loading {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
