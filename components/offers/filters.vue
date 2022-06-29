<template>

  <div class="bg-gradient-to-r bg-regal-blue-100 -mt-1 pb-2 form">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">


      <div class="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        <div class="input-field" v-on-clickaway="inputsearchvalue">
          <label for="offers-search" class="sr-only" v-t="'offers.search'"/>
          <div class="relative">
            
            <!--<p class="absolute w-30 mt-1.5 opacity-50 ml-20">{{chosensearchfield}}</p>-->
            <input autocomplete="off" v-on:click="inputsearchvalue($event.target.value)" v-on:keyup="inputsearchvalue($event.target.value)" id="offers-search" v-model="filters.q"
                   @keyup="finishedTyping" type="text" class="input-big input-no-border"
                   :placeholder="$t('offers.search')">
                   
            <ul class="flex flex-col absolute z-50 w-full bg-white rounded-b-lg border border-regal-blue-100"
                v-if="setsearchvalue !== ''">
              <button v-on:click="specificsearch('title')"
                      class="hover:bg-regal-blue-200 hover:text-white text-left p-2"><span
                class="font-bold">{{ setsearchvalue }}</span> {{ $t('offers.filter.title') }}
              </button>
              <button v-on:click="specificsearch('isbn')"
                      class="hover:bg-regal-blue-200 hover:text-white text-left p-2"><span
                class="font-bold">{{ setsearchvalue }}</span> {{ $t('offers.filter.isbn') }}
              </button>
              <button v-on:click="specificsearch('description')"
                      class="hover:bg-regal-blue-200 hover:text-white text-left p-2"><span
                class="font-bold">{{ setsearchvalue }}</span> {{ $t('offers.filter.description') }}
              </button>
            </ul>
          </div>
        </div>

        <!-- Courses -->
        <multiselect id="courses" :custom-label="({ name }) => this.localizedValue(name)"
                     :placeholder="$t('offers.selectCourses')" :showLabels="false"
                     @search-change="searchCourses" track-by="id" :multiple="true" :preserveSearch="true"
                     :value="initialCoursesValue"
                     v-model="coursesSelected" :options="coursesResults" @input="emitFilters"/>
        <div class="grid grid-cols-2 gap-2">
          <multiselect id="condition-field" :custom-label="({ name }) => $t(name)" :custom-value="({ value }) => value"
                       :placeholder="$t('general.condition')"
                       :showLabels="false" :multiple="false" :preserveSearch="true" track-by="value"
                       v-model="filters.condition" :options="conditionValues" @input="emitFilters"/>

          <multiselect id="sort-field" class="text-sm	" :custom-label="({ name }) => $t(name)" :custom-value="({ value }) => value"
                       :placeholder="$t('general.sortBy')"
                       :showLabels="false" :multiple="false" :preserveSearch="true" track-by="value"
                       v-model="filters.sort" :options="sortValues"  @input="emitFilters"/>
        </div>

        <div class="checkbox-wrapper self-center mr-4 mt-2" v-if="$auth.loggedIn">
          <div class="checkbox">
            <input id="own_items" type="checkbox" v-model="filters.owned" @change="emitFilters">
          </div>
          <div class="checkbox-label my-auto">
            <label for="own_items" class="white" v-t="'offers.owned'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import {mixin as clickaway} from 'vue-clickaway';

export default {
  name: 'components-offers-filters',
  mixins: [clickaway],
  components: {
    Multiselect,
  },
  data() {
    return {
      filters: {
        q: '',
        sort: '',
        condition: '',
        f: '',
        owned: false,
        page: null,
      },

      setsearchvalue: '',
      coursesSelected: [],
      coursesResults: [],
      timeouts: [],

      initialCoursesValue: [], // Selected courses when loading the component, used with query strings
      sortValues: [
        {
          name: "offers.sort.price_up",
          value: "price_up"
        },
        {
          name: "offers.sort.price_down",
          value: "price_down"
        },
        {
          name: "offers.sort.title_up",
          value: "title_up"
        },
        {
          name: "offers.sort.new_first",
          value: "new_first"
        },
        {
          name: "offers.sort.old_first",
          value: "old_first"
        }],
      conditionValues: [
        {
          name: "offers.condition.new",
          value: "new"
        },
        {
          name: "offers.condition.as_good_as_new",
          value: "as_good_as_new"
        },
        {
          name: "offers.condition.used",
          value: "used"
        }],
    }
  },
  props: {
    initialCourses: {
      type: Array,
      required: false,
      default: [],
    }
  },
  methods: {
    inputsearchvalue(value) {
      if (typeof value === 'object') {
        this.setsearchvalue = '';
      } else {
        this.setsearchvalue = value;
      }
    },
    specificsearch(searchtype) {
      this.filters.f = searchtype
      //this.chosensearchfield = searchtype
      this.emitFilters()

      this.setsearchvalue = ''; // <-- don't remove, closes dropdown menu
    },
    finishedTyping() {
      // We clear the timeout if it has already been set
      clearTimeout(this.timeouts['query']);

      delete this.filters.f

      // We make a timeout, that after 1 sec executes
      this.timeouts['query'] = setTimeout(() => {
        this.emitFilters();
      }, 500);
    },

    // Search query for the courses
    async searchCourses(q) {
      try {
        const {data} = await this.$axios.get(`/api/courses/search/${q}`);
        this.coursesResults = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Emit filters update event
    emitFilters() {
      if (this.filters.f == '') {
        delete this.filters.f
      }
      this.filters.q = this.filters.q.trim()
      this.$emit('input', this.deleteDefaultValues({
        ...this.filters,
        courses: this.coursesSelected.map(c => c.id),
        sort: ((this.filters.sort === null) ? '' : this.filters.sort.value),
        condition: ((this.filters.condition === null) ? '' : this.filters.condition.value)
      }));
    },

    // Delete default values from filters before emitting
    deleteDefaultValues(filters) {
      // Create copy of filters
      const newFilters = {...filters};

      // Delete owned filter if it is false
      if (newFilters.owned === false) {
        delete newFilters.owned;
      }

      // Delete page filter if it is null
      if (newFilters.page === null) {
        delete newFilters.page;
      }

      // Delete courses filter if it is empty
      if (newFilters.courses && newFilters.courses.length === 0) {
        delete newFilters.courses;
      }

      // Delete query filter if it is empty
      if (newFilters.q === '') {
        delete newFilters.q;
      }

      // Delete sort filter if it is empty
      if (newFilters.sort === '') {
        delete newFilters.sort;
      }

      // Delete condition filter if it is empty
      if (newFilters.condition === '') {
        delete newFilters.condition;
      }

      return newFilters;
    },

    /**
     * Parse the parameters from the url and set the filters
     */
    parseRouteQueryParams() {
      // Create copy of filters
      const filters = {...this.$route.query};

      // Check if the courses value is a string
      if (typeof filters.courses === 'string') {
        // If it is, we parse it to an array
        filters.courses = filters.courses.split(',');
      }

      // Assign selected courses
      if (Array.isArray(filters.courses) && filters.courses.length > 0) {
        this.coursesSelected = filters.courses.map(id => {
          return this.coursesResults.find(course => course.id === id);
        });
      }

      // Delete courses filter
      delete filters.courses;

      if (filters.sort !== undefined) {
        this.filters.sort = this.sortValues.find(el => el.value === filters.sort);
      }

      // Delete sort filter
      delete filters.sort;

      if (filters.condition !== undefined) {
        this.filters.condition = this.conditionValues.find(el => el.value === filters.condition);
      }

      // Delete condition filter
      delete filters.condition;

      Object.assign(this.filters, filters);
    }
  },
  created() {
    Object.assign(this.coursesResults, this.initialCourses);
    this.parseRouteQueryParams();
  }
}
</script>