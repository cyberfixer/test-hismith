<template>
  <v-app>
    <v-app-bar color="green" class="d-flex justify-center align-center" fixed>
      <v-app-bar-title>
        <nuxt-link
          to="/"
          class="
            text-h5 text-sm-h4
            font-weight-bold
            white--text
            text-decoration-none
          "
        >
          {{ $store.state.news.title.toString() }}
        </nuxt-link>
      </v-app-bar-title>
    </v-app-bar>
    <Nuxt class="mt-16" />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>
