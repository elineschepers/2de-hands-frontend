<template>
  <form action="#" @submit.prevent="saveOffer" class="form centered-form">
    <slot name="header" />

    <!-- Fields -->
    <ValidationProvider rules="required|max:255" v-slot="{ errors }" tag="div">
      <div :class="{ 'input-field': true, 'validation-error': isInvalidField('title', backendErrors, errors) }">
        <label for="title" v-t="'fields.title'" />
        <div class="field-wrapper">
          <input type="text" v-model="form.title" id="title" :aria-invalid="isInvalidField('title', backendErrors, errors, true)">

          <div class="icon-container">
            <icons-warning-icon />
          </div>
        </div>
        <p class="field-error-subtext" id="title-error">{{ showValidationError('title', backendErrors, errors) }}</p>
      </div>
    </ValidationProvider>

    <ValidationProvider rules="required|decimal" v-slot="{ errors }" tag="div">
      <div :class="{ 'input-field': true, 'validation-error': isInvalidField('price', backendErrors, errors) }">
        <label for="price" v-t="'fields.price'" />
        <div class="field-wrapper">
          <input type="number" min="0" max="1000" step="0.01"  v-model="form.price" id="price" :aria-invalid="isInvalidField('price', backendErrors, errors, true)">

          <div class="icon-container">
            <icons-warning-icon />
          </div>
        </div>
        <p class="field-error-subtext" id="price-error">{{ showValidationError('price', backendErrors, errors) }}</p>
      </div>
    </ValidationProvider>

    <ValidationProvider rules="required|max:2000" v-slot="{ errors }" tag="div">
      <div :class="{ 'input-field': true, 'validation-error': isInvalidField('description', backendErrors, errors) }">
        <label for="description" v-t="'fields.description'" />
        <div class="field-wrapper">
          <textarea v-model="form.description" id="description" cols="30" rows="10" maxlength="2000" :aria-invalid="isInvalidField('price', backendErrors, errors, true)"></textarea>

          <div class="icon-container">
            <icons-warning-icon />
          </div>
        </div>
        <p class="field-error-subtext" id="description-error">{{ showValidationError('description', backendErrors, errors) }}</p>
      </div>
    </ValidationProvider>

        <ValidationProvider rules="max:255" v-slot="{ errors }" tag="div">
      <div :class="{ 'input-field': true, 'validation-error': isInvalidField('isbn', backendErrors, errors) }">
        <label for="isbn" v-t="'fields.isbn'" />
        <div class="field-wrapper">
          <input type="text" v-model="form.isbn" id="isbn" :aria-invalid="isInvalidField('isbn', backendErrors, errors, true)">

          <div class="icon-container">
            <icons-warning-icon />
          </div>
        </div>
        <p class="field-error-subtext" id="isbn-error">{{ showValidationError('isbn', backendErrors, errors) }}</p>
      </div>
    </ValidationProvider>

    <div :class="{ 'input-field': true, 'validation-error': isInvalidField('courses', backendErrors) }">
      <label for="courses-field" v-t="'fields.courses'" />
      <div class="field-wrapper">
        <div class="mt-1">
          <multiselect id="courses-field" :custom-label="({ name }) => this.localizedValue(name)" :placeholder="$t('offers.selectCourses')"
              :showLabels="false" @search-change="searchCoursesWaitForTyping" track-by="id" :multiple="true" :preserveSearch="true"
              v-model="coursesSelected" :options="coursesResults" ref="multiselect">
            <template slot="noResult">{{$t('general.no-results')}}</template>
            <template slot="noOptions" >{{$t('general.start-typing')}}</template>
          </multiselect>
        </div>
      </div>
      <p class="field-error-subtext" id="courses-error">{{ showValidationError('courses', backendErrors) }}</p>
    </div>

    <div :class="{ 'input-field': true, 'validation-error': isInvalidField('condition', backendErrors) }">
      <label for="condition-field" v-t="'fields.condition'" />
      <div class="field-wrapper">
        <div class="mt-1">
          <multiselect id="condition-field" :custom-label="({ name }) => this.localizedValue(name)" :placeholder="$t('fields.selectCondition')"
              :showLabels="true" :multiple="false" :preserveSearch="true"
              v-model="conditionSelected" :options="conditonsResults" :deselectLabel="$t('general.deselect')" :selectedLabel="$t('general.selected')" :selectLabel="$t('general.select')"/>
        </div>
      </div>
      <p class="field-error-subtext" id="condition-error">{{ showValidationError('condition', backendErrors) }}</p>
    </div>

    <div class="button-field">
      <div class="mr-5" v-if="isEdit">
        <span class="checkbox-button-wrapper h-9">
        <span class="checkbox-button">
          <input id="delete-item" type="checkbox" v-model="deleteConfirmed">
        </span>
          <button class="button button-danger" v-t="'general.delete'" @click.prevent="deleteOffer" :disabled="!deleteConfirmed" />
        </span>
      </div>
      <nuxt-link :to="localePath(getCancelUrl)" class="button button-white" v-t="'general.back'" />
      <button type="submit" class="button button-primary" v-t="'offers.save'" />
    </div>

    <others-validation-errors :errors="backendErrors" class="col-span-12 mt-3" />
  </form>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import Multiselect from 'vue-multiselect';

export default {
  name: 'components-offers-form',
  components: {
    Multiselect,
    ValidationProvider
  },
  data () {
    return {
      form: {},
      coursesSelected: [],
      coursesResults: [],
      deleteConfirmed: false,
      backendErrors: {},
      searchTimeout: null,
      //TODO: get conditions from backend
      conditonsResults:[{"name":{"nl":"Nieuw","en":"New"},"value":"NEW"},{"name":{"nl":"Gebruikt","en":"Used"},"value":"USED"},{"name":{"nl":"Zo goed als nieuw","en":"As good as new"},"value":"AS_GOOD_AS_NEW"}],
      conditionSelected: ""
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    offer: {
      type: Object,
      default: () => ({})
    },
    initialCourses: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async saveOffer () {
      try {
        const formData = {
          ...this.form,
          coursesUuid: this.coursesSelected.map(course => course.id),
          condition: this.conditionSelected.value

        };
        // Our edit and create are handled differently
        if (this.isEdit) {
          const { data } = await this.$axios.patch(`/api/offers/${this.offer.id}`, formData);

          this.$toast.success(this.$t('general.saved'));
          this.setInitalData(data.data);
        } else {
          const { data } = await this.$axios.post('/api/offers/', formData);

          // Redirect to the edit page
          this.$router.push(this.localePath({ name: 'offers-id-edit', params: { id: data.data.id } }));
        }

      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.backendErrors = error.response.data.errors;
        }
      }
    },
    async deleteOffer () {
      try {
        await this.$axios.delete(`/api/offers/${this.offer.id}`);
        this.$toast.success(this.$t('general.deleted'));
        this.$router.push(this.localePath({ name: 'offers-id-index' }));
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Check if there is a message
          if (error.response.data.message) {
            this.$toast.error(error.response.data.message);
          }
        }
      }
    },

    searchCoursesWaitForTyping (query) {
      // We clear the timeout if it has already been set
      clearTimeout(this.searchTimeout);

      // We make a timeout, that after 500ms sec executes
      this.searchTimeout = setTimeout(() => {
        this.searchCourses(query);
      }, 500);
    },

    async searchCourses (query) {
      try {
        const { data } = await this.$axios.get(`/api/courses/search/${query}`);
        this.coursesResults = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    setInitalData (data = null) {
      let offerData = this.offer;
      if (data !== null) {
        offerData = data;
      }

      // If we are editing we grab the courses from the offer and set them as selected
      // We also set the coursesResults to the courses from the offer
      if (this.isEdit) {

        // If user tries to edit offer that's not theirs redirect to dashboard
        if (this.$auth.user && this.$auth.user.id !== offerData.user.id) {
          //this.$toast.success(this.$t('general.saved'));
          this.$router.push(this.localePath({name: 'index'}));
        }

        this.form = {
          title: offerData.title,
          price: offerData.price,
          isbn: offerData.isbn,
          description: offerData.description,
          condition: offerData.condition
        }
        this.coursesResults = this.offer.courses;

        this.coursesSelected = this.offer.courses.map(course => ({
          id: course.id,
          name: course.name
        }));

        this.conditonsResults.forEach(el =>{
          if(el.value === offerData.condition){
            this.conditionSelected = el;
          }
        });


      } else {
        this.coursesResults = this.initialCourses;
      }
    }
  },
  computed: {
    getCancelUrl () {
      if (this.isEdit) {
        return { name: 'offers-id', params: { id: this.offer.id } };
      }

      return { name: 'index' };
    }
  },
  created () {
    this.setInitalData();
  }
}
</script>
