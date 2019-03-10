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
@import '~@view/styles/colors';

.loading-button {
    background-color: $primary-color;
    color: white;
    font-size: 24px;
    min-width: 200px;
    padding: 10px;
    transition: 0.5s;
    cursor: pointer;
    user-select: none;
    border-radius: 5px;

    &.loading {
        background-color: $hovered-color;
    }

    &.disabled {
        background-color: $disabled-color;
        cursor: not-allowed;

        &:hover {
            background-color: $disabled-color;
        }
    }

    &:hover {
        background-color: $hovered-color;
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
