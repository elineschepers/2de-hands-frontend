<template>
  <main class="boxed-centered">
    <offers-form :initial-courses="courses">
      <template slot="header">
        <div class="title-field">
          <h1 v-t="'offers.createTitle'" />
          <p v-t="'offers.formDescription'" />
        </div>
      </template>
    </offers-form>
  </main>
</template>

<script>
export default {
  name: 'pages-offers-create',
  middleware: 'isVerified',
  auth: true,
  data () {
    return {
      courses: [],
    }
  },
  head () {
    return {
      title: this.$t('programs.createOffer')
    }
  },
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios.get('/api/courses/');

      return {
        courses: data.data,
      }
    } catch (error) {
      return {
        courses: []
      };
    }
  }
}
</script>
