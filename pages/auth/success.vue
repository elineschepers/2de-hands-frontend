<template>
  <main class="content">
    <div>
      <h1>We are logging you in!</h1>
      <p class="text-sm">If you aren't redirected in 5 seconds perhaps the login failed or you used the back button.</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'pages-auth-welcome',
  methods: {
    async login() {
      await this.$auth.loginWith('cookie', {
        data: {
          schoolnumber: "",
          password: "",
        },
      });
        this.$toast.success(this.$t('auth.login_success'));
        if (process.server) return;
        window.location.href = window.location.origin;
    }
  },
  head () {
    return {
      title: this.$t('auth.signin')
    }
  },
  mounted () {
    this.login();
  }
}
</script>
