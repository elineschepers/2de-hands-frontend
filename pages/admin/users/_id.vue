<template>
<main class="boxed-centered">
  <users-form :user="user" :roles="roles" :is-edit="true">
     <template slot="header">
        <div class="title-field">
          <h1 v-t="'users.updateTitle'" />
          <p v-t="'users.updateDescription'" />

        </div>
      </template>
  </users-form>
</main>
</template>

<script>
export default {
  name: "pages-admin-users-id",
  middleware: 'isadmin',
  data () {
    return {
      user: {},
      roles: {}
    }
  },
  head () {
    return {
      title: this.$t('users.menu')
    }
  },
  async asyncData ({ $axios, params }) {
    try {
      const  userPromise  = $axios.get('/api/users/' + params.id);
      const  rolesPromise  = $axios.get('/api/users/roles/');
      const [ data, roles ] = await Promise.all([userPromise, rolesPromise]);
      return {
        user: data.data.data,
        roles : roles.data.data,
      };
    } catch (error) {
      console.log("ERROR")
      console.log(error)
      return {};
    }
  }
}
</script>
