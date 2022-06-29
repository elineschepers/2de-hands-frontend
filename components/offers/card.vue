<template>
  <article class="offer-card truncate" :aria-describedby="'offer-title-' + offer.id">
    <nuxt-link :to="localePath({ name: 'offers-id', params: { id: offer.id } })" />

    <div class="offer-image-wrapper">
      <div class="offer-image-overlay" aria-hidden="true" />

      <img v-if="offer.images && offer.images[0] !== undefined" :src="offer.images[0].thumb" alt="">
      <img v-else :src="'https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image'" alt="No Image Found">
    </div>

    <div class="offer-content">
      <div class="offer-content-head">
        <h2 :id="'offer-title-' + offer.id">{{ offer.title }}</h2>
        <p>{{ getPrice(offer.price) }}</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "components-offers-card",
  props: {
    offer: {
      type: Object,
      default: () => ({})

    }
  },
  methods: {
    getPrice(price) {
      if (price > 0)
        return "€ " + price;
      return this.$t('offers.free');
    },
  }
}

</script>

<style lang="scss">
.offer-card {
  @apply relative mb-2;

  a {
    @apply absolute inset-0 z-30 focus:outline-none focus:ring-regal-blue-100 focus:ring-4 focus:ring-offset-4 transition-all duration-300 rounded-xl;
  }

  .offer-image-wrapper {
    @apply relative;

    .offer-image-overlay {
      @apply absolute inset-0 bg-black opacity-0 transition-all ease-in-out duration-300 rounded-xl z-10;
    }

    img {
      @apply rounded-xl w-full;
    }
  }

  .offer-content {
    @apply my-3 px-1;

    .offer-content-head {
      @apply flex text-xl;

      h2 {
        @apply flex-1 transition-colors ease-in-out duration-300 ;
      }

    }
  }

  &:hover {
    .offer-image-wrapper {
      .offer-image-overlay {
        @apply opacity-50;
      }
    }

    .offer-content {
      .offer-content-head {
        h2 {
          @apply text-regal-blue-100;
        }
      }
    }
  }
}
</style>
