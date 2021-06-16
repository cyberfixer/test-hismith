import axios from 'axios'

export default function getNews() {
  return axios.get('http://static.feed.rbc.ru/rbc/logical/footer/news.rss', {
    mode: 'no-cors',
  })
}
