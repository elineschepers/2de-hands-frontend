export default function ({ $auth, redirect, app }) {
  if($auth.$state.user) {
    if (!$auth.$state.user.verified) {
      if (process.client) {
        app.$toast.error(app.i18n.t("auth.notVerified"));
      }

      return redirect( app.localePath('/'));
    }
  } else {
    if (process.client) {
      app.$toast.info(app.i18n.t("auth.loginFirst"))
    }
    return redirect( app.localePath('/auth/login'));
  }
}
