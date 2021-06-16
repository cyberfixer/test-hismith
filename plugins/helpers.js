export default ({ app }, inject) => {
  inject('toLocaleString', (dateStr) => {
    const date = new Date(dateStr)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return date.toLocaleString('ru-RU', options)
  })
}
