<template>
  <form action="#" @submit.prevent="saveUser" class="form centered-form">
    <slot name="header" />

    <!-- Fields -->
    <div class="input-field">
      <label>{{ $t('fields.firstName') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2">
        <input v-model="form.firstName" type="text">
      </div>
      <label>{{ $t('fields.lastName') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2">
        <input v-model="form.lastName" type="text">
      </div>
      <label>{{ $t('fields.phoneNumber') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2">
        <input v-model="form.phoneNumber" type="text">
      </div>
      <label>{{ $t('fields.email') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2">
        <input v-model="form.email" type="text">
      </div>
      <label>{{ $t('fields.school_number') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2">
        <input v-model="form.schoolNumber" type="text">
      </div>

      <label for="role-field" v-t="'fields.role'" />
      <div class="field-wrapper mb-2">
        <div class="mt-1">
          <multiselect id="role-field" :custom-label="({ name }) => this.localizedValue(name)" :placeholder="$t('fields.selectRole')"
                       :showLabels="true" :multiple="true" :preserveSearch="true" track-by="value"
                       v-model="rolesSelected" :options="allRoles" :deselectLabel="$t('general.deselect')" :selectedLabel="$t('general.selected')" :selectLabel="$t('general.select')"/>
        </div>
      </div>

      <label>{{ $t('fields.verified_user') }} <span class="uppercase"></span></label>
      <div class="mt-1 mb-2 ml-3 w-5">

      <!-- Toggle -->
        <div class="flex items-center justify-center w-full mb-12">

            <label for="toogleA" class="flex items-center cursor-pointer">
                <div class="relative">
                    <input v-if="form.schoolNumberVerified !== null" v-model="form.schoolNumberVerified" id="toogleA" type="checkbox" class="sr-only" checked/>
                    <input v-else v-model="form.schoolNumberVerified" id="toogleA" type="checkbox" class="sr-only"/>
                    <div class="w-10 h-4 rounded-full shadow-inner" :class="getColorUserVerified()"></div>
                    <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
            </label>
        </div>
      </div>
    </div>

    <div class="button-field">

      <span class="checkbox-button-wrapper flex-1" v-if="isEdit">
        <span class="checkbox-button">
          <label for="delete-item" class="sr-only" v-t="'general.delete'" />
          <input id="delete-item" type="checkbox" v-model="deleteConfirmed">
        </span>
        <button class="button button-danger" v-t="'general.delete'" @click.prevent="deleteUser" :disabled="!deleteConfirmed" />
      </span>

      <nuxt-link :to="localePath({ name: 'admin-users' })" class="button button-white" v-t="'general.cancel'" />
      <button input="submit" class="button button-primary" v-t="'general.save'"/>

    </div>

    <others-validation-errors :errors="errors" class="col-span-12 mt-3" />
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: "components-users-form",
  data () {
    return {
      form: {
        firstName: {},
        lastName: {},
        email: {},
        schoolNumber: {},
        schoolNumberVerified: {},
        phoneNumber: {},
      },
      deleteConfirmed: false,
      errors: {},
      allRoles: {},
      rolesSelected: {},
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    },
    user: {
      type: Object,
      required: false,
      default: () => ({})
    },
    roles: {
      type: Array,
      required: false,
      default: () => ({})
    }
  },
  components: {
    Multiselect,
  },
  methods: {
    getColorUserVerified(){
        if(this.form.schoolNumberVerified){
          return "bg-green-400";
        }
        return "bg-red-400";
    },
    async saveUser () {
      this.errors = {}

      try {
        // If we are editing, we need to send the id
        if (this.isEdit) {
          const formData = {
            ...this.form,
            eRoles: this.rolesSelected.map(course => course.value),

          };
          await this.$axios.patch(`/api/users/${this.user.id}`, formData);
          this.$toast.success(this.$t('general.saved'));
        } else {
          const { data } = await this.$axios.post('/api/users', formData);

          // Redirect to the new user
          this.$router.push(this.localePath({ name: 'admin-users-id', params: { id: data.id }}));
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
     * Delete the user
     */
    async deleteUser () {
      try {
        await this.$axios.delete(`/api/users/${this.user.id}`);
        this.$toast.success(this.$t('general.deleted'));
        this.$router.push(this.localePath({ name: 'admin-users' }));
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
      return this.isEdit ? `/api/users/${this.form.id}` : '/api/users';
    }
  },
  created () {
    if (this.isEdit) {
      if(this.user.schoolNumberVerifiedAt!=null)
      {
        this.$set(this.form, "schoolNumberVerified", true);
      }else{
        this.$set(this.form, "schoolNumberVerified", false);
      }
      this.$set(this.form, "firstName", this.user.firstName);
      this.$set(this.form, "lastName", this.user.lastName);
      this.$set(this.form, "email", this.user.email);
      this.$set(this.form, "schoolNumber", this.user.schoolNumber);
      this.$set(this.form, "phoneNumber", this.user.phoneNumber);
      this.rolesSelected = this.user.roles;
      this.allRoles = this.roles;
    }
  }
}
</script>

<style>
    input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #2563EB;
    }
</style>
