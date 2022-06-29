<template>
  <form action="#" @submit.prevent="saveProgram" class="form centered-form">
    <slot name="header" />

    <!-- Fields -->
    <div class="input-field" v-for="locale in $i18n.locales" :key="'name-' + locale.code">
      <label :for="'name-' + locale.code">{{ $t('fields.name') }} <span class="uppercase">({{ locale.code }})</span></label>
      <div class="mt-1">
        <input type="text" v-model="form.name[locale.code]" :id="'name-' + locale.code">
      </div>
    </div>

    <div class="mt-1 input-field">
      <label>{{ $t('fields.region') }} <span class="uppercase"></span></label>
      <input v-model="form.region" type="text">
    </div>

    <div class="button-field">

      <span class="checkbox-button-wrapper flex-1" v-if="isEdit">
        <span class="checkbox-button">
          <label for="delete-item" class="sr-only" v-t="'deleteCheckboxLabel'" />
          <input id="delete-item" type="checkbox" v-model="deleteConfirmed">
        </span>
        <button class="button button-danger" v-t="'general.delete'" @click.prevent="deleteProgram" :disabled="!deleteConfirmed" />
      </span>

      <nuxt-link :to="localePath({ name: 'admin-programs' })" class="button button-white" v-t="'general.back'" />
      <button input="submit" class="button button-primary" v-t="'general.save'"/>

    </div>

    <others-validation-errors :errors="errors" class="col-span-12 mt-3" />
  </form>
</template>

<script>
export default {
  name: "components-programs-form",
  data () {
    return {
      form: {
        name: {},
        region: "",
      },
      deleteConfirmed: false,
      errors: {},
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    },
    program: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  methods: {
    async saveProgram () {
      this.errors = {}

      try {
        // If we are editing, we need to send the id
        if (this.isEdit) {
          await this.$axios.patch(`/api/programs/${this.program.id}`, this.form);
          this.$toast.success(this.$t('general.saved'));
        } else {
          const { data } = await this.$axios.post('/api/programs/', this.form);

          // Redirect to the program index
          this.$router.push(this.localePath({name: 'admin-programs'}));

        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        }
      }
    },
    /**
     * Delete the program
     */
    async deleteProgram () {
      try {
        await this.$axios.delete(`/api/programs/${this.program.id}`);
        this.$toast.success(this.$t('general.deleted'));
        this.$router.push(this.localePath({ name: 'admin-programs' }));
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Check if there is a message
          if (error.response.data.message) {
            this.$toast.error(error.response.data.message);
          }
        }
      }
    }
  },
  computed: {
    url () {
      return this.isEdit ? `/api/programs/${this.form.id}` : '/api/programs/';
    }
  },
  created () {
    if (this.isEdit) {
      this.$set(this.form, "name", this.program.name);
      this.$set(this.form, "region", this.program.region);
    }
  }
}
</script>
