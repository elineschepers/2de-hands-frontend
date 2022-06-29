<template>
  <div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" v-t="'auth.accountcompletion'" />
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="card">
        <form class="space-y-6" action="#" @submit.prevent="register" method="POST">
          <others-validation-errors :errors="errors" />

          <ValidationProvider rules="required|email" v-slot="{ errors }" tag="div">
            <div :class="{ 'input-field': true, 'validation-error': errors.length > 0 }">
              <label for="email" v-t="'fields.email'" />
              <div class="field-wrapper">
                <input id="email" v-model="form.email" type="email" autocomplete="email" required="" :aria-invalid="errors.length > 0" aria-describedby="email-error">

                <div class="icon-container" v-if="errors.length > 0">
                  <icons-warning-icon />
                </div>

              </div>
              <p class="field-error-subtext" id="email-error" v-if="errors.length > 0">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required|min:8|confirmed:passwordConfirmation" v-slot="{ errors }" tag="div">
            <div :class="{ 'input-field': true, 'validation-error': errors.length > 0 }">
              <label for="password" v-t="'fields.password'" />
              <div class="field-wrapper">
                <input id="password" v-model="form.passwordPlain" type="password" autocomplete="current-password" required="" :aria-invalid="errors.length > 0" aria-describedby="password-error">

                <div class="icon-container" v-if="errors.length > 0">
                  <icons-warning-icon />
                </div>

              </div>
              <p class="field-error-subtext" id="password-error" v-if="errors.length > 0">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" tag="div" vid="passwordConfirmation">
            <div :class="{ 'input-field': true, 'validation-error': errors.length > 0 }">
              <label for="passwordConfirmation" v-t="'fields.confirmPassword'" />
              <div class="field-wrapper">
                <input id="passwordConfirmation" v-model="form.passwordConfirmation" type="password" autocomplete="current-password" required="" :aria-invalid="errors.length > 0" aria-describedby="passwordConfirmation-error">

                <div class="icon-container" v-if="errors.length > 0">
                  <icons-warning-icon />
                </div>

              </div>
              <p class="field-error-subtext" id="passwordConfirmation-error" v-if="errors.length > 0">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <div>
            <button type="submit" class="button button-primary w-full" v-t="'auth.complete'" />
          </div>

            <div class="text-sm block m-auto">
              <p class="text-center">
                {{$t("auth.or")}} <nuxt-link :to="localePath({ name: 'index' })" v-t="'auth.toindex'" />
              </p>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'pages-auth-oauthregister',
  middleware: 'isOauthOnly',
  components: {
    ValidationProvider,
  },
  data () {
    return {
      form: {
        email: '',
        passwordPlain: '',
        passwordConfirmation: ''
      },
      errors: {}
    }
  },
  methods: {
    async register () {
      this.errors = {};

      try {
        // Get CSRF Token
        //await this.$axios.get(this.$config.csrfTokenUrl);

        // complete user's account
        const { data } = await this.$axios.post('/api/users/oauthcomplete/', this.form);

        window.location.href = this.localePath({name: 'index'});
        //await this.$auth.fetchUser();
        //await this.$router.push(this.localePath({name: 'index'}));
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>
