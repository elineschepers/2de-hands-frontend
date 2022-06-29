export default function ({ $auth, redirect, app }) {
    if($auth.$state.user) {
      if (!$auth.$state.user.oauthOnly) {
        return redirect( app.localePath('/'));
      }
    }else{
        return redirect( app.localePath('/'));
    }
  }