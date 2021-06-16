<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="8" xl="6">
        <h1 class="text-center text-h5 text-sm-h4">
          {{ newsItem.title.toString() }}
        </h1>
      </v-col>
    </v-row>
    <v-row v-if="slides" justify="center">
      <v-col lg="8" xl="6">
        <v-carousel
          cycle
          :show-arrows="slides.length > 1"
          :hide-delimiters="slides.length < 2"
        >
          <v-carousel-item v-for="slide in slides" :key="slide" :src="slide" />
        </v-carousel>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="8" xl="6">
        {{ newsItem.description.toString() }}
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="4" xl="3" class="caption text-sm-body-2">
        {{ $toLocaleString(newsItem.pubDate.toString()) }}
      </v-col>
      <v-col class="text-right caption text-sm-body-2" lg="4" xl="3">
        <span v-if="newsItem.author">{{ newsItem.author.toString() }}</span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col lg="8" xl="6" class="text-right caption text-sm-body-2 py-0">
        <a target="_blank" :href="newsItem.link[0]">оригинал статьи</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewsItemPage',
  computed: {
    newsItem() {
      return this.$store.state.news.item.find((el) => {
        return el.guid.toString() === this.$route.params.newsId
      })
    },
    slides() {
      return this.newsItem.enclosure?.map((el) => {
        return el.$.url
      })
    },
  },
}
</script>

<style></style>
