<template>
  <main>
    <header>
      <offers-filters :initial-courses="initialCourses" v-model="filters"/>
    </header>


    <div class="container sm:mx-auto my-6">

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3 ">
        <offers-card class="rounded-xl bg-gray-100" v-for="offer in offersSold" :key="offer.id" :offer="offer"/>
      </div>
    </div>
  </main>
</template>

<script>
import qs from 'qs';

export default {
  name: 'pages-admin-sold-index',
  data() {
    return {
      offersSold: [],
      pagination: {},
      initialCourses: [], // Used for filters

      filters: {}
    }
  },
  head() {
    return {
      title: this.$t('nav.soldMenu')
    }
  },
  methods: {
    async getSoldOffers() {

      try {

        const {data} = await this.$axios.get('/api/offers/sold/', {
          params: {
            ...this.filters
          },
          paramsSerializer: (params) => qs.stringify(params, {indices: false})
        });

        this.offersSold = data.data;
      } catch (error) {
        console.error(error);
      }
    },
    setRouteQueryParams() {
      // Set the route params
      this.$router.push({
        query: {
          ...this.filters
        }
      });
    }
  },
  watch: {
    filters() {
      this.getSoldOffers();
      this.setRouteQueryParams();
    }
  },
  async asyncData({$axios, query, params}) {
    try {

      let queryParams = {...query};
      let courses = [];

      // If the query string has courses, we need to parse them
      if (query.courses) {
        // If it is an array we can use it directly
        if (Array.isArray(query.courses)) {
          courses = [...query.courses];
        } else if (typeof query.courses === 'string') {
          // If the query string is a string, we split it by comma
          courses = query.courses.split(',');
        }

        delete queryParams.courses;
      }

      const initialCourses = $axios.get(`/api/courses/`, {
        params: {ids: courses},
        paramsSerializer: (params) => qs.stringify(params, {indices: false})
      });

      const offersSold = $axios.get(`/api/offers/sold/`, {
        params: {
          ...query,
          courses: courses
        },
        paramsSerializer: (params) => qs.stringify(params, {indices: false})
      });


      // Wait for both requests to finish
      const [initialCoursesData, offersData] = await Promise.all([initialCourses, offersSold]);

      return {
        offersSold: offersData.data.data,
        pagination: offersData.data.meta,
        initialCourses: initialCoursesData.data.data
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
