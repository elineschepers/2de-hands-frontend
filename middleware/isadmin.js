export default function ({ $auth, redirect, app }) {
    let found = false;

    if($auth.$state.user !== null)
        $auth.$state.user.authorities.forEach(el => {if(el.authority === 'ROLE_ADMIN') found = true});

    if (!found) {
      if (process.client) {
        app.$toast.error(app.i18n.t("auth.noAccess"));
      }

      return redirect( app.localePath('/'));
    }
  }
