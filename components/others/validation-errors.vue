<template>
  <others-alert class="alert-danger mb-5" v-if="showError">
    <template v-slot:raw-content>
      <ul class="alert-content list-disc list-inside">
        <slot v-for="(v, k) in errors">
          <slot v-if="typeof v === 'object' || Array.isArray(v)">
            <li v-for="error in v" :key="error">{{ error }}</li>
          </slot>
          <slot v-else>
            <li :key="k">{{ v }}</li>
          </slot>
        </slot>
      </ul>
    </template>
  </others-alert>
</template>

<script>
export default {
  name: "others-validation-errors",
  props: {
    errors: {
      type: Object,
      required: false,
      default: {},
    },
  },
  computed: {
    showError () {
      return this.errors !== null && typeof this.errors === "object" && Object.keys(this.errors).length > 0;
    },
  }
};
</script>
