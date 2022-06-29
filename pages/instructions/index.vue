<template>
  <div>
    <layout-header :title="$metaInfo.title"/>
    <div class="container w-full break-normal mx-auto px-4 pb-8">

      <h1 class="pb-4" v-t="'howto.title'"/>

      <div class="bg-white py-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.sell'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.selldata'"/>
            </div>
          </div>
        </div>
      </div>


      <div class="bg-white pt-8 pb-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.start'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.startdata'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white pt-8 pb-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.contact'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.contactdata'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white pt-8 pb-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.add'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.adddata'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white pt-8 pb-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.edit'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.editdata'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white pt-8 pb-2">
        <div class="max-w-2xl mx-auto px-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium font-bold text-gray-900" v-t="'howto.delete'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-full mx-auto py-2 px-4">
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-100 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-auto sm:p-6">
              <p v-t="'howto.deletedata'"/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'howto',
  head() {
    return {
      title: this.$t("howto.title")
    }
  },
}
</script>
<style scoped lang="scss">

h1 {
  @apply text-4xl font-bold text-center mt-20 mb-10;

}

h2 {
  @apply text-2xl font-bold mt-20 mb-10;

}

h3 {
  @apply text-lg font-bold mt-20 mb-10;

}

ol {
  @apply list-decimal;
  &.sub {
    list-style-type: lower-alpha;
  }
}

ol, ul {
  @apply mx-5 mt-5 space-y-4;


  li {
    ol, ul {
      @apply ml-5 mt-5 ;
    }
  }
}


</style>
