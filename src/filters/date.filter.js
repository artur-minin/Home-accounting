import store from '../store'

export default function dateFilter(value, format = 'date', userOptions = {}) {
  let options = {
    weekday: 'long'
  }

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
  }

  if (format.includes('time')) {
    options.second = '2-digit'
    options.minute = '2-digit'
    options.hour = '2-digit'
  }

  options = { ...options, ...userOptions }

  const locale = store.getters.info.locale || 'ru-RU'
  return Intl.DateTimeFormat(locale, options).format(new Date(value))
}
