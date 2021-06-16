import xml2js from 'xml2js'

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

export const actions = {
  async nuxtServerInit(ctx) {
    const request = await this.$axios(
      'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
      { mode: 'no-cors' }
    )
    const xmlString = request.data
    const parseString = xml2js.parseString
    parseString(xmlString, (err, result) => {
      if (err) console.log(err)
      else ctx.commit('setNews', result.rss.channel[0])
    })
  },
}
