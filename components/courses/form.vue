<template>
  <form action="#" @submit.prevent="submitForm" class="form centered-form">
    <slot name="header" />

    <!-- Name -->
    <div class="input-field space-y-2">
      <div v-for="locale in $i18n.locales" :key="'name-' + locale.code">
        <label :for="'name-' + locale.code">{{ $t('fields.name') }} <span class="uppercase">({{ locale.code }})</span></label>
        <div class="mt-1">
          <input type="text" v-model="form.name[locale.code]" :id="'name-' + locale.code">
        </div>
      </div>
    </div>

    <!-- OPO Code -->
    <div class="input-field space-y-2">
      <div v-for="(c, key) in form.opoCodes" :key="key">
        <label :for="'opo_code-' + key">{{ $t('fields.opo_code') + " " + (key+1) }}</label>
        <div class="input-group space-x-1">
          <input type="text" v-model="form.opoCodes[key]" :id="'opo_code-' + key" required :class="{ 'group-input': key !== 0 }">
          <button type="button" class="button button-sm button-input-group button-white" @click="removeOpoCode(key)" v-if="key !== 0" v-t="'general.delete'" />
        </div>
      </div>

      <button type="button" class="button button-white button-sm mt-2" @click="addNewOpoCode" v-if="this.form.opoCodes.length < 10" v-t="'general.add'" />
    </div>

    <!-- Programs -->
    <div class="input-field">
      <label v-t="'programs.menu'" class="mb-3" />

      <others-transfer-box :data="programs" target="id" :value="course.programs" v-model="form.programsUuid">
        <template v-slot="{ item }">{{ localizedValue(item.name) }} ({{item.region}})</template>
      </others-transfer-box>
    </div>

    <div class="button-field">
      <span class="checkbox-button-wrapper flex-1" v-if="isEdit">
        <span class="checkbox-button">
          <label for="delete-item" class="sr-only" v-t="'deleteCheckboxLabel'" />
          <input id="delete-item" type="checkbox" v-model="deleteConfirmed">
        </span>
        <button class="button button-danger" v-t="'general.delete'" @click.prevent="deleteCourse" :disabled="!deleteConfirmed" />
      </span>

      <nuxt-link :to="localePath({ name: 'admin-courses' })" class="button button-white" v-t="'general.back'" />
      <button type="submit" class="button button-primary" v-t="'general.save'" />
    </div>

    <others-validation-errors :errors="errors" class="col-span-12" />
  </form>
</template>

<script>
export default {
  name: "copmonents-courses-form",
  data () {
    return {
      form: {
        name: {},
        opoCodes: [''],
        programsUuid: [],
      },
      deleteConfirmed: false,
      errors: {},
    }
  },
  props: {
    deleteUrl: {
      type: String,
      required: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    course: {
      required: false,
      default: () => {
        return {
          programs: [],
        }
      }
    },
    programs: {
      type: Array,
      required: true
    }
  },
  methods: {
    setFormData (data) {
      if (data === null || typeof data === "undefined" || !(data.name && data.opoCodes && data.programs)) return;

      this.form.name = data.name;
      this.form.opoCodes = data.opoCodes;

      if (data.programs) {
        this.form.programsUuid = data.programs.map((p) => p.id);
      }
    },
    async submitForm () {
      this.errors = null;

      try {
        if (this.isEdit) {

          const { data } = await this.$axios.patch(`/api/courses/${this.course.id}`, this.form);

          this.setFormData(data.data);
          this.$emit('course-updated', data.data);
        } else {

          const { data } = await this.$axios.post('/api/courses/', this.form);

          //redirect to courses index
          this.$router.push(this.localePath({ name: 'admin-courses',}));
        }

        this.$toast.success(this.$t('general.saved'));
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
    async deleteCourse () {
      try {
        await this.$axios.delete(`/api/courses/${this.course.id}`);

        this.$toast.success(this.$t('general.deleted'));
        this.$router.push(this.localePath({ name: 'admin-courses' }));
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Check if there is a message
          if (error.response.data.message) {
            this.$toast.error(error.response.data.message);
          }
        }
      }
    },
    addNewOpoCode () {
      if (this.form.opoCodes.length >= 10) return;

      this.form.opoCodes.push('');
    },
    removeOpoCode(key) {
      this.$delete(this.form.opoCodes, key);

      if (this.form.opoCodes.length <= 0) {
          this.addNewOpoCode();
      }
    }
  },
  created () {
    this.setFormData(this.course);
  }
}
</script>
