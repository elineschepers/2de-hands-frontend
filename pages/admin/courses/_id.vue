<template>
  <main class="boxed-centered">
    <courses-form :programs="programs" :course="course" :is-edit="true">
      <template slot="header">
        <div class="title-field">
          <h1 v-t="'courses.updateTitle'" />
          <p v-t="'courses.updateDescription'" />
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
      course: {},
      programs: [],
    }
  },
  head () {
    return {
      title: this.$t('courses.menu')
    }
  },
  created () {
    this.$on('course-updated', (course) => {
      this.course = course;
    });
  },
  async asyncData ({ $axios, params }) {
    try {
      const coursePromise = $axios.get('/api/courses/' + params.id);
      const programsPromise = $axios.get('/api/programs/');

      // Wait simultaneously for both requests to complete
      const [ course, programs ] = await Promise.all([coursePromise, programsPromise]);

      return {
        course: course.data.data,
        programs: programs.data.data,
      };
    } catch (error) {
      return {
        programs: [],
        course: {}
      };
    }
  }
}
</script>
