<template>
  <v-container class="main" tag="section">
    <v-row justify="center">
      <v-col xs="12" sm="8" md="6" lg="4" xl="3">
        <v-select
          label="Сортировка по дате"
          :items="sorting"
          outlined
          color="green"
          item-color="green"
          @change="selectSorting"
        ></v-select>

        <v-text-field label="Поиск" clearable color="green" @input="searchNews">
        </v-text-field>

        <v-card
          v-for="item in paginatedNews"
          :key="item.guid[0]"
          class="mb-6"
          @click="
            $router.push({
              name: 'newsId',
              params: { newsId: item.guid[0] },
            })
          "
        >
          <template v-if="item.enclosure">
            <v-img
              class="white--text align-end"
              :src="item.enclosure[0]['$'].url"
              :alt="item.title.toString()"
            >
              <v-card-title class="news--item-title wb-norm">{{
                item.title.toString()
              }}</v-card-title>
            </v-img>
          </template>
          <template v-else>
            <v-card-title class="wb-norm">{{
              item.title.toString()
            }}</v-card-title>
            <v-divider></v-divider>
          </template>
          <v-card-subtitle class="caption px-4 py-3">{{
            $toLocaleString(item.pubDate[0])
          }}</v-card-subtitle>
          <v-card-text class="text--primary">
            {{ item.description.toString() }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="pagesCount > 1">
      <v-col>
        <v-pagination
          v-model="pageNumber"
          :length="pagesCount"
          :total-visible="7"
          class="mb-4"
          color="green"
          @input="scrollToTop"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MainPage',
  data() {
    return {
      sorting: ['сначала старые', 'сначала новые'],
      sortingType: 'newer',
      searchResults: null,
      pageNumber: 1,
      paginationSize: 5,
    }
  },
  computed: {
    ...mapState(['news']),
    sortedNews() {
      if (this.searchResults) return this.sort(this.searchResults)
      else return this.sort(this.news.item)
    },
    pagesCount() {
      return Math.ceil(this.sortedNews.length / this.paginationSize)
    },
    paginatedNews() {
      const start = this.pageNumber * this.paginationSize - this.paginationSize
      const end = start + this.paginationSize
      return this.sortedNews.slice(start, end)
    },
  },
  methods: {
    sort(arr) {
      const toMs = (dateStr) => {
        const date = new Date(dateStr)
        return date.getTime()
      }
      const parsedArr = JSON.parse(JSON.stringify(arr))

      const sortedArr = parsedArr.sort((a, b) => {
        let result
        switch (this.sortingType) {
          case 'older':
            if (toMs(a.pubDate[0]) > toMs(b.pubDate[0])) result = 1
            else result = -1
            break
          case 'newer':
            if (toMs(a.pubDate[0]) < toMs(b.pubDate[0])) result = 1
            else result = -1
            break
          default:
            break
        }
        return result
      })

      return sortedArr
    },
    selectSorting(sortType) {
      switch (sortType) {
        case 'сначала старые':
          this.sortingType = 'older'
          break
        case 'сначала новые':
          this.sortingType = 'newer'
          break
        default:
          break
      }
    },
    searchNews(inputVal) {
      if (inputVal) {
        const results = this.news.item.filter((el) => {
          return el.title
            .toString()
            .toLowerCase()
            .includes(inputVal.toLowerCase())
        })
        this.searchResults = results
      } else this.searchResults = null
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.wb-norm {
  word-break: normal;
}
.news--item-title {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
