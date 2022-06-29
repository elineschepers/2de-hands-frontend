<template>
  <div id="page-wrapper">
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'layouts-auth'
}
</script>

<style lang="scss" scoped>
main {
  @apply min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8;
}
</style>
