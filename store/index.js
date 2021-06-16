import xml2js from 'xml2js'
import getNews from '~/api/news.js'

export const state = () => ({
  news: null,
})

export const mutations = {
  setNews(state, payload) {
    state.news = payload
  },
  setNewsItem(state, payload) {
    state.news.item = payload
  },
}

export const getters = {
  newsItem: (state) => (id) =>
    state.news.item.find((el) => {
      return el.guid.toString() === id
    }),
}

export const actions = {
  async nuxtServerInit(ctx) {
    const request = await getNews()
    const xmlString = request.data
    const parseString = xml2js.parseString
    parseString(xmlString, (err, result) => {
      if (err) console.log(err)
      else ctx.commit('setNews', result.rss.channel[0])
    })
  },
}
