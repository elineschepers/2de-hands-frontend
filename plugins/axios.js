export default function ({$toast, $axios, $config, redirect, localePath }) {
  // Make a request to fetch immediately retrieve our CSRF token
  if (process.client) {
    try {
      //$axios.get($config.csrfTokenUrl);
    } catch (error) {}
  }

  // Check if the user makes an unauthorized request
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    if (code === 403) {
      console.warn('A forbidden request was made.');
      $toast.show("test")
      redirect(localePath({ name: 'index' }));
    }
  });
}
