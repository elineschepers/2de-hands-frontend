<template>
<main class="boxed-centered">
  <programs-form :program="program" :is-edit="true">
     <template slot="header">
        <div class="title-field">
          <h1 v-t="'programs.updateTitle'" />
          <p v-t="'programs.updateDescription'" />

        </div>
      </template>
  </programs-form>
</main>
</template>

<script>
export default {
  name: "pages-admin-programs-id",
  middleware: 'isadmin',
  data () {
    return {
      program: {}
    }
  },
  head () {
    return {
      title: this.$t('programs.menu')
    }
  },
  async asyncData ({ $axios, params }) {
    try {
      const { data } = await $axios.get('/api/programs/' + params.id);

      return {
        program: data.data,
      };
    } catch (error) {
      return {};
    }
  }
}
</script>
