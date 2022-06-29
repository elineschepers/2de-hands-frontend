<template>
  <main class="boxed-centered">
    <programs-form>
      <template slot="header">
        <div class="title-field">
          <h1 v-t="'programs.createTitle'" />
          <p v-t="'programs.createDescription'" />
        </div>
      </template>
    </programs-form>
  </main>
</template>

<script>
export default {
  name: 'pages-admin-programs-create',
  middleware: 'isadmin',

  head () {
    return {
      title: this.$t('programs.menu')
    }
  },
}

</script>
