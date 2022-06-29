<template>
  <main class="h-3/4">
    <header>
      <offers-filters :initial-courses="initialCourses" v-model="filters"/>
    </header>


    <div class="container sm:mx-auto h-full my-6">
      <div v-if="offers && offers.length === 0" class="flex justify-around h-full">
        <div class="my-auto">
          <svg width="327" height="211" xmlns="http://www.w3.org/2000/svg" class="m-auto">
            <g transform="translate(-7 -22)" fill="none" fill-rule="evenodd">
              <path
                d="M25.635 62.244c-53.228 26.9 18.011 161.91 146.321 169.883 128.31 7.972 196.112-81.472 144.58-130.595C265.001 52.409 78.861 35.343 25.634 62.244z"
                fill="#E30147"/>
              <path
                d="M19.994 137.09c8.198 4.611 16.517 8.034 24.643 9.814 59.964 13.136 121.315-17.475 89.817-55.125C122.737 77.774 101.76 63.102 77.71 50.7m172.285 18.24a50.924 50.924 0 0 0-6.957 3.96c-18.542 12.634-9.062 40.05 21.173 61.234 30.235 21.185 59.222 20.721 64.744-1.035.923-3.635 1.427-7.429 1.546-11.282"
                stroke="#FFF" stroke-width="1.097" opacity=".4"/>
              <ellipse fill="#323A45" cx="111" cy="190" rx="21" ry="4"/>
              <ellipse fill="#C1C9D0" cx="198.5" cy="185" rx="64.5" ry="6"/>
              <path
                d="m168.47 84.788 11.81-3.115L197.6 77v35.044c0 2.336 3.15 3.894 0 13.24-2.1 6.23-6.298 21.804-12.597 46.725-1.574 4.153-3.149 7.009-4.723 8.566-2.362 2.337-4.724 5.452-7.873 6.23-2.1.52-4.724 0-7.874-1.557-11.022 1.557-16.533 1.298-16.533-.779 0-3.115 3.15-6.23 7.873-7.009 4.724-.779 15.746-.779 18.108-10.903 2.362-10.123 11.626-23.752 10.235-44.389-.927-13.758-6.176-26.218-15.746-37.38z"
                fill="#FFF"/>
              <path
                d="m168.47 84.788 11.81-3.115L197.6 77v35.044c0 2.336-9.6-3.044-13.384 10.124-.927-13.758-6.176-26.218-15.746-37.38z"
                fill="#E8E8E8" opacity=".3"/>
              <path
                d="m186 88.718 31.177 23.27c6.235 4.654 7.794 6.981 7.794 15.513s4.676 33.353 3.897 38.007c-.78 4.654-1.56 8.532-8.574 10.084-7.015 1.551-16.778 2.245-15.588 6.98.78 3.103 5.456 2.328 11.691 1.552 6.235-.776 11.229.44 13.25.776 4.677.775 5.456-3.103 7.794-6.206 2.338-3.102 1.559-32.577.78-41.885-.78-9.308 1.558-23.27-3.897-28.7-3.638-3.619-11.951-17.322-24.942-41.109L186 88.718z"
                fill="#FFF"/>
              <path
                d="M186 88.718c16.628 12.41 21.843 16.18 26 19.282 2.1 1.568 11.258-1.724 14.313-.356 6.013 2.691 11.628 4.066 8.01.466-3.637-3.62-11.95-17.323-24.94-41.11L186 88.718z"
                fill="#E8E8E8" opacity=".3"/>
              <path
                d="M221.915 37.715c11.622-6.32 21.08-10.323 28.375-12.007 10.942-2.525 28.039-4.23 29.232-1.29 1.193 2.94-15.008 8.39-25.094 11.487-6.724 2.064-17.073 3.982-31.048 5.752l-1.465-3.942z"
                fill="#E8E8E8"/>
              <path
                d="M224.561 41.306c12.999-3.812 23.327-5.81 30.983-5.993 11.486-.276 28.937 1.462 29.483 4.542.545 3.08-16.836 5.143-27.591 6.14-7.17.665-17.93.47-32.278-.587l-.597-4.103z"
                fill="#E8E8E8"/>
              <path
                d="M224.854 40.615c13.432.541 23.763 1.981 30.993 4.321 10.845 3.51 26.61 10.957 26.101 14.156-.508 3.2-17.465-.499-27.865-3.06-6.934-1.707-16.943-5.44-30.028-11.198l.799-4.219z"
                fill="#E8E8E8"/>
              <path
                d="M222.336 43.176c13.026 3.322 22.832 6.879 29.418 10.67 9.878 5.689 23.75 16.25 22.588 19.274-1.163 3.024-16.98-4.119-26.62-8.787-6.428-3.111-15.442-8.843-27.045-17.196l1.66-3.96zM194 49l-3 15 2 21 5 15c2.133-3.59 4.133-5.924 6-7 2.298-1.325 8.623-1.082 10-2 3-2-1.867-4.858 1-9 1.911-2.761 4.912-3.761 9-3-2.39-6.16-3.39-9.827-3-11 1.21-3.63 7-2.389 7-5 0-2.394-3.983-4.513-5-7-.42-1.028-.087-2.361 1-4l-30-3z"
                fill="#E8E8E8"/>
              <path
                d="M116.085 77.618C112.206 94.703 113 127.02 113 141c0 9.319-2.667 26.986-8 53h12c5.644-20.667 8.208-38.508 7.69-53.522-.775-22.52-.69-41.478 6.91-51.988 7.6-10.51 21.236-44.684 16.291-48.149-4.944-3.464-27.927 20.192-31.806 37.277z"
                fill="#FFF"/>
              <path
                d="M125.716 104.51c1.07-6.448 2.896-11.887 5.884-16.02 7.6-10.51 21.236-44.684 16.291-48.149C144.915 38.255 131.558 62.12 126 82c-3.673 13.138-.94 26.47-.284 22.51z"
                fill="#E8E8E8" opacity=".3"/>
              <path
                d="M105.759 191.072c-.166.643-.418 1.619-.759 2.928h12c.39-1.149.68-2.008.868-2.577-3.868.577-8.868.577-12.11-.35z"
                fill="#8E98A6" opacity=".15"/>
              <path
                d="M131.75 50.238c11.68-14.045 44.572-33.335 75.35-21.622C237.878 40.329 245 50 251 68s-11.016-6.144-33-12-21 0-15 2c3.79 1.264 14.33 2.745 24 8 5.635 3.063 11.79 8.582 14 13 6 12-1 18-6 18s-7 0-18-7-21-16-19-10 23.788 16.094 23 22c-.787 5.906-12 9-27 8s-30.275-4.68-42-12c-11.725-7.32-16.715-12.283-22.578-22.532-5.862-10.249-9.353-11.185 2.327-25.23z"
                fill="#323A45"/>
              <path
                d="M151 48c4-10 24.957-17.055 28.82-7.667 2.576 6.26-.257 10.954-8.5 14.083 10.76-.247 15.396 2.621 13.91 8.606-1.487 5.985-5.866 9.376-13.137 10.171 13.15.134 16.12 3.07 8.907 8.807-10.818 8.606-21 3-27-6s-7-18-3-28z"
                fill="#FFF"/>
            </g>
          </svg>

          <h1 class="text-4xl font-bold text-center mt-4" v-t="'offers.noresult'"/>


        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3 my-6">
        <offers-card class="rounded-xl bg-gray-100" v-for="offer in offers" :key="offer.id" :offer="offer"/>
      </div>
    </div>
  </main>
</template>

<script>
import qs from 'qs';

export default {
  name: 'pages-index',
  data() {
    return {
      offers: [],
      pagination: {},
      initialCourses: [], // Used for filters

      filters: {}
    }
  },
  head() {
    return {
      title: this.$t('offers.menu')
    }
  },
  methods: {
    async getOffers() {

      try {
        const {data} = await this.$axios.get('/api/offers/', {
          params: {
            ...this.filters
          },
          paramsSerializer: (params) => qs.stringify(params, {indices: false})
        });

        this.offers = data.data;
      } catch (error) {
        console.error(error);
      }
    },
    checkoauthonly(){
      if(this.$auth.$state.user && this.$auth.$state.user.oauthOnly){

        this.$toast.success(this.$t('auth.oauthcheck'), {
          duration: 5000,
          action: {
            text : this.$t('auth.oauthlinkcheck'),
            onClick : () => {
              this.$router.push(this.localePath({name: 'auth-oauthregister'}));
            }
          }

        })
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
      this.getOffers();
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
      const offers = $axios.get(`/api/offers/`, {
        params: {
          ...query,
          courses: courses
        },
        paramsSerializer: (params) => qs.stringify(params, {indices: false})
      });

      // Wait for both requests to finish
      const [initialCoursesData, offersData] = await Promise.all([initialCourses, offers]);

      return {
        offers: offersData.data.data,
        pagination: offersData.data.meta,
        initialCourses: initialCoursesData.data.data
      }
    } catch (error) {
      console.error(error);
    }
  },
  mounted () {
    this.checkoauthonly();
  }
}
</script>
