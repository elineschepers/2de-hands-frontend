<template>
  <main class="content">
    <div class="title-field mb-8">
      <h1 v-t="'offers.editTitle'" />
      <p v-t="'offers.editDescription'" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      <offers-form :is-edit="true" :offer="offer" />

      <div>
        <h2 v-t="'offers.images'" class="font-semibold mb-4" />
        <offers-image-editor :offer="offer" :initial-images="images" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'pages-offers-id-edit',
  middleware: 'isVerified',
  data () {
    return {
      offer: {},
      images: [],
      courses: []
    }
  },
  head () {
    return {
      title: this.$t('offers.editTitle')
    }
  },
  async asyncData ({ $axios, params }) {
    try {

      const offerPromise = $axios.get(`/api/offers/${params.id}`);
      const imagePromise = $axios.get(`/api/offers/${params.id}/images`);

      // Wait for both requests to finish
      const [ offer, images ] = await Promise.all([ offerPromise, imagePromise ]);

      return {
        offer: offer.data.data,
        images: images.data.data
      }
    } catch (error) {
      console.error(error);

      // Check if we have an error code
      if (error.response) {

      }

      return {
        offer: {},
        images: []
      }
    }
  },
}
</script>
