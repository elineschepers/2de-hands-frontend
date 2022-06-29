<template>
  <main class="content" aria-describedby="offer-title">
    <div class="offer-page">
      <div class=" offer-images">
        <div class="offer-showcase-image">
          <img :src="getShowcaseImage.src" :srcset="getShowcaseImage.srcset" :alt="offer.title" v-if="typeof getShowcaseImage === 'object'">
          <img v-if="getShowcaseImage==''" src="https://www.kuleuven.be/communicatie/congresbureau/fotos-en-afbeeldingen/no-image.png/image" alt="">
        </div>
        <ul class="offer-images-list">
          <li v-for="(image, index) in offer.images" :key="image.src">
            <a :href="image.src" target="_blank" @click.prevent="showImage(index)" :aria-label="$t('offers.viewImageLarger', { order: index + 1 })">
              <img :src="image.src" :srcset="image.srcSet" :alt="offer.title">
            </a>
          </li>
        </ul>
      </div>
      <div class="offer-data ">
        <div class="flex items-center">
          <h1 class="flex-1"  id="offer-title" v-if="offer.sold" v-t="{path: 'offers.title', args: { offertitle: offer.title }}"></h1>
          <h1 class="flex-1"  id="offer-title" v-else>{{offer.title}}</h1>

          <div v-if="!offer.sold && isEditVisible" class="mr-5">
            <span class="checkbox-button-wrapper h-9">
            <span class="checkbox-button">
              <input id="sell-item" type="checkbox" v-model="sellConfirmed">
            </span>
              <button class="button button-danger" v-t="'general.sell'" @click.prevent="sellOffer" :disabled="!sellConfirmed" />
            </span>
          </div>

          <div v-if="!offer.sold">
            <nuxt-link :to="localePath({ name: 'offers-id-edit', params: { id: offer.id } })"  v-if="isEditVisible" class=" button button-lg button-primary" v-t="'offers.edit'"></nuxt-link>
          </div>
        </div>
        <p><span class="font-bold" v-t="'offers.askingPrice'" />: {{ getPrice(offer.price) }}</p>

        <p v-if="offer.user && typeof offer.user === 'object'"><span class="font-bold" v-t="'offers.seller'" />: {{ offer.user.firstName }} {{ offer.user.lastName }}</p>

        <p><span class="font-bold" v-t="'offers.isbn'" />: {{ offer.isbn }}</p>

        <p><span class="font-bold" v-t="'offers.condition.title'" />: {{ condition }}</p>

        <p><span class="font-bold" v-t="'offers.courses'" />:</p>
        <li v-for="course in offer.courses" :key="course.id">
          {{ localizedValue(course.name) }} {{ getPrograms(course) }}
        </li>

        <div class="description">
          <p>{{ offer.description }}</p>
        </div>

        <div class="mt-5 rounded-md bg-yellow-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 v-t="'howto.sell'" class="font-bold text-sm font-medium text-yellow-800"/>
              <div class="mt-2 text-sm text-yellow-700">
                <p v-t="'howto.selldata'"/>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-20" v-if="!isEditVisible">
          <h1 v-t="'general.contact'" class="mb-5"/>
          <a  v-if="offer.user && typeof offer.user === 'object' && !offer.sold" v-t="'general.sendmail'" class="button button-lg button-primary" :href="'mailto:'+offer.user.email+'?body='+getMailContent()" />
          <p v-t="'auth.loginFirst'" v-if="this.$auth.user == null"/>
          <p v-t="'auth.notVerified'" v-else-if="$auth.$state.user && !$auth.$state.user.verified"/>

        </div>
      </div>
    </div>

    <!-- Image Lightbox -->
    <client-only>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="offer.images"
        :index="index"
        @hide="handleLightboxHide"
      ></vue-easy-lightbox>
    </client-only>
  </main>
</template>

<script>
export default {
  name: 'pages-offers-id-index',
  data () {
    return {
      offer: {},
      visible: false,
      index: 0,
      sellConfirmed: false,
    }
  },
  head () {
    return {
      title: this.offer.title
    }
  },
  methods: {
    handleLightboxHide () {
      this.visible = false;
    },
    async sellOffer () {
      try {
        await this.$axios.post(`/api/offers/${this.offer.id}/sold/`);
        this.$toast.success(this.$t('general.sell'));
        this.$router.push(this.localePath({ name: 'offers-id-index' }));
      } catch (error) {
        if (error.response && error.response.status === 422) {
          // Check if there is a message
          if (error.response.data.message) {
            this.$toast.error(error.response.data.message);
          }
        }
      }
    },
    getMailContent(){
      return "English below." + "%0D%0A%0D%0A===============================================================%0D%0A%0D%0A%0D%0ABeste " + this.offer.user.firstName + " " + this.offer.user.lastName + ",%0D%0A%0D%0A" +
      "Ik ben geïnteresseerd in het door u aangeboden artikel '"+this.offer.title+"' voor €"+this.offer.price+"."

      +"%0D%0A%0D%0A"+"Met vriendelijke groeten,"+ "%0D%0A%0D%0A"

      +this.$auth.user.firstName +" "+ this.$auth.user.lastName + "%0D%0A%0D%0A%0D%0A"
      + "===============================================================%0D%0A%0D%0A%0D%0A" +
      "Dear " + this.offer.user.firstName + " " + this.offer.user.lastName + ",%0D%0A%0D%0A"+
      "I'm interested in the by you presented item '"+this.offer.title+"' for €"+this.offer.price+"."

      +"%0D%0A%0D%0A"+"With regards,"+ "%0D%0A%0D%0A"

      +this.$auth.user.firstName +" "+ this.$auth.user.lastName

    },
    showImage (index) {
      this.visible = true;
      this.index = index;
    },
    getPrograms(course) {
      let result = ""
      if (course.programs.length > 0) {
        result += "(";
        course.programs.forEach(el => result+= this.localizedValue(el.name) + " - " + el.region +  ", ");
        result = result.slice(0, -2) + ")";
      }
      return result;
    },
    getPrice(price) {
      if (price > 0)
        return "€ " + price;
      return this.$t('offers.free');
    },
  },
  computed: {
    condition (){
      const conditonsResults = [{"name":{"nl":"Nieuw","en":"New"},"value":"NEW"},{"name":{"nl":"Gebruikt","en":"Used"},"value":"USED"},{"name":{"nl":"Zo goed als nieuw","en":"As good as new"},"value":"AS_GOOD_AS_NEW"}]; //TODO STRAIGHT FROM BACKEND NO SEPERATE LIST
      let result = "";
      conditonsResults.forEach(el =>{
        if(this.offer.condition !== undefined && el.value === this.offer.condition){
          result = this.localizedValue(el.name);
        }
      });
      return result;
    },
    getShowcaseImage () {
      if (Array.isArray(this.offer.images) && this.offer.images.length > 0) {
        return this.offer.images[0];
      }

      return "";
    },
    isEditVisible () {
      if (this.$auth.loggedIn && this.offer.user !== undefined && this.$auth.user.id === this.offer.user.id) {
        return true;
      }

      return this.can('offers.edit');
    },
  },
  async asyncData ({ $axios, params }) {
    try {

      const { data } = await $axios.get(`/api/offers/${params.id}`);

      return {
        offer: data.data
      }
    } catch (error) {
      return {
        offer: {}
      }
    }
  }
}
</script>

<style lang="scss">
.offer-page {
  @apply grid grid-cols-1 md:grid-cols-5 gap-x-8 sm:gap-x-12;

  .offer-images {
    @apply col-span-1 md:col-span-3;

    img {
      @apply rounded-xl max-w-full block mx-auto max-h-96;
    }

    .offer-images-list {
      @apply mt-4 grid grid-cols-4 gap-4 justify-center;

      li {
        @apply rounded-xl max-h-36;

        a {
          @apply flex h-full;
        }

        img {
          @apply max-h-full block mx-auto;
        }
      }
    }
  }

  .offer-data {
    @apply col-span-1 md:col-span-2;

    h1 {
      @apply text-3xl font-bold;
    }

    p.subtitle {
      @apply text-lg;
    }

    .description {
      p {
        @apply text-gray-600 mt-3;
      }
    }
  }
}
</style>
