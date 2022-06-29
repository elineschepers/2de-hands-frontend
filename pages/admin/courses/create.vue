<template>
  <main class="boxed-centered">
    <courses-form :programs="programs">
      <template slot="header">
        <div class="title-field">
          <h1 v-t="'courses.createTitle'" />
          <p v-t="'courses.createDescription'" />
        </div>
      </template>
    </courses-form>
  </main>
</template>

<script>
export default {
  name: 'pages-admin-courses-create',
  middleware: 'isadmin',
  data () {
    return {
      programs: [],
    }
  },
  head () {
    return {
      title: this.$t('courses.menu')
    }
  },
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios.get('/api/programs/');

      return {
        programs: data.data,
      };
    } catch (error) {
      return {
        programs: []
      };
    }
  }
}
</script>
