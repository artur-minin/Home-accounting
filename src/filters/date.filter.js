export default function dateFilter(value, format = 'date') {
  const options = {
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

  return Intl.DateTimeFormat('ru-Ru', options).format(new Date(value));
}
