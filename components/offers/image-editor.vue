<template>
  <section>

    <!-- File pond -->
    <client-only>
      <file-pond
        name="images" ref="filepond"
        :label-idle="$t('general.drop-files')"
        :labelFileProcessing="$t('general.uploading')"
        :labelFileProcessingComplete="$t('general.done')"
        :labelFileProcessingAborted="$t('general.aborted')"
        :labelFileProcessingError="$t('general.error')"
        :labelTapToCancel="$t('general.cancel')"
        :labelTapToRetry="$t('general.retry')"
        :labelTapToUndo="$t('general.undo')"
        :allow-multiple="true" :allow-replace="false" :allow-remove="false" :allowRemove="false" :max-files="10"
        accepted-file-types="image/jpeg, image/png"
        :server="filePondServerOptions" :files="imageFiles" @processfile="getImages"
      />
    </client-only>

    <!-- List of files -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md mt-10">
      <draggable class="divide-y divide-gray-200" tag="ul" v-model="images" @end="dragEnded" handle=".draggable" v-if="images && images.length > 0">
        <transition-group>
          <li v-for="image in images" :key="image.id" class="block hover:bg-gray-50 cursor-move draggable">
            <div class="flex items-center px-4 py-4 sm:px-6">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-full" :src="image.thumb" alt="" v-if="image.processed">
                </div>
                <div class="min-w-0 flex-1 px-4">
                  <p class="text-sm font-medium text-blue-600 truncate">{{ image.sortOrder+1 }}. {{ image.fileName }}</p>

                  <p class="mt-0.5 flex items-center text-sm text-gray-500" v-if="image.processed">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    {{ $t('offers.image_processed') }}
                  </p>
                  <p class="mt-0.5 flex items-center text-sm text-gray-500" v-else>
                    {{ $t('offers.image_in_queue') }}
                  </p>
                </div>
                <button class="button button-danger button-sm" @click="deleteImage(image.id)">
                  <span class="sr-only" v-t="'general.delete'" />
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </transition-group>
      </draggable>
    </div>

    <div class="flex mt-3 items-center">
      <p class="flex-1 text-sm text-gray-500" v-t="'offers.sort_images_tip'" />
      <button class="button button-primary" @click.prevent="getImages" v-t="'general.reload'"/>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import vueFilePond from 'vue-filepond';

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImageCrop);

export default {
  name: 'components-offers-image-editor',
  components: {
    FilePond,
    draggable
  },
  data () {
    return {
      imageFiles: [],
      images: [],

      filePondServerOptions: {
        process: `/api/offers/${this.offer.id}/images`,
        fetch: null,
        revert: null,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'X-XSRF-TOKEN': '',
        }
      }
    }
  },
  props: {
    initialImages: {
      type: Array,
      default: () => []
    },
    offer: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  methods: {
    async saveOrder () {
      try {
        await this.$axios.patch(`/api/offers/${this.offer.id}/images`, {
          images: this.images.map(o => o['id']),
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getImages () {
      try {
        const { data } = await this.$axios.get(`/api/offers/${this.offer.id}/images`);

        this.images = data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteImage (id) {
      try {
        await this.$axios.delete(`/api/offers/${this.offer.id}/images/${id}`);

        this.getImages();
        this.$toast.success(this.$t('offers.imageDeleted'));
      } catch (error) {

      }
    },
    dragEnded () {
      this.$set(this.images, this.images.map((img, index) => {
        img.sortOrder = index;
      }));

      this.saveOrder();
    },
    getCsrfToken () {
      if (process.server) return;

      this.filePondServerOptions.headers['X-XSRF-TOKEN'] = require('js-cookie').get('XSRF-TOKEN');
    }
  },
  created () {
    this.images = this.initialImages;
    this.getCsrfToken();
  }
}
</script>
