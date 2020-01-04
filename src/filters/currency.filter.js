export default function currencyFilter(value, userOptions) {
  let options = {
    style: 'currency',
    currency: 'RUB'
  }

  options = { ...options, ...userOptions }
  return Intl.NumberFormat('ru-Ru', options).format(value)
}
