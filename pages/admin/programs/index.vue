<template>
  <main class="boxed-centered">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl" v-t="'programs.menu'"/>
      <nuxt-link :to="localePath({ name: 'admin-programs-create'})"  v-t="'general.add'" class="button button-primary flex-right"/>
    </div>
    <div class="flow-root mt-4">

      <ul class="my-5 divide-y divide-gray-200">

      <li class="py-4" v-for="program in programs" :key="program.id">
        <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ localizedValue(program.name) }}</p>
          </div>
          <div>
            <nuxt-link :to="localePath({ name: 'admin-programs-id', params: { id: program.id }})"  v-t="'general.update'" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"/>
          </div>
        </div>
      </li>

      </ul>
    </div>
    <div class="mt-6">
      <a href="#" v-t="'general.viewall'" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">

      </a>
    </div>
  </main>
</template>

<script>
export default {
  name: "pages-admin-programs-index",
  middleware: 'isadmin',
  data () {
    return {
      programs: [],
      pagination: {},
    }
  },
  head () {
    return {
      title: this.$t('programs.menu')
    }
  },
  async asyncData ({ $axios }) {
    try {
      const { data } = await $axios.get('/api/programs/');

      return {
        programs: data.data,
        pagination: data.meta,
      };
    } catch (error) {
      return {};
    }
  }
}
</script>
