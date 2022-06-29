<template>
  <div :class="{ 'fixed z-50 inset-0 overflow-y-auto': true, 'hidden': !open }">
    <div class="modal-wrapper">
      <transition enter-active-class="ease-out duration-300" enter-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-400" leave-class="opacity-100" leave-to-class="opacity-0">
        <div :class="{ 'fixed inset-0 transition-opacity': true, 'hidden': !open }" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />

      <transition enter-active-class="ease-out duration-300" enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-400" leave-class="opacity-100 translate-y-0 sm:scale-100" leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
        <div :class="{ modal: true, 'hidden': !open }" role="dialog" aria-modal="true" :aria-labelledby="modalTitleId" ref="modal">
          <div class="modal-container">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button @click="open = false;" type="button" class="button" v-t="'general.cancel'" />
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'components-modal',
  data () {
    return {
      open: false,
      randomModalId: Math.random().toString(36).substring(7)
    }
  },
  props: ['value', 'modalTitleId'],
  watch: {
    open (val, oldVal) {
      // If value is changed
      if (oldVal !== val) {
        this.$emit('input', val);
      }
    },
    value (val, oldVal) {
      this.open = val;

      // If value is changed to true, focus on the modal
      if (val && val !== oldVal) {
        this.$refs.modal.focus();
      }
    }
  },
  created () {
    this.open = this.value;
  }
}
</script>

<style lang="scss">
.modal-wrapper {
  @apply flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0;

  .modal {
    @apply inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6;

    .modal-container {
      @apply sm:items-start;

      .modal-icon {
        @apply mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 sm:mx-auto;

        svg {
          @apply h-6 w-6;
        }
      }

      .modal-body {
        @apply text-center  sm:text-center sm:mx-auto;

        .modal-title {
          @apply text-lg leading-6 font-medium text-gray-900;
        }

        p {
          @apply text-sm text-gray-500;
        }
      }
    }

    .modal-footer {
      @apply mt-5 sm:mt-4 text-center sm:text-center space-x-1;
    }
  }
}
</style>
