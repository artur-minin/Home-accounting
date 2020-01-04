<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'HomeCurrency_ExchangeRates' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'HomeCurrency_Currency' | localize}}</th>
              <th>{{'HomeCurrency_Rate' | localize}}</th>
              <th>{{'HomeCurrency_Date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency in currencies" :key="currency">
              <td>{{currency}}</td>
              <td>{{rates[currency].toFixed(2)}}</td>
              <td>
                {{date | date('date', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit' })}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],

  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>
