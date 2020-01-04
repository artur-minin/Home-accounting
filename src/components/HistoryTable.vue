<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'HistoryTable_Amount' | localize}}</th>
        <th>{{'HistoryTable_Date' | localize}}</th>
        <th>{{'HistoryTable_Category' | localize}}</th>
        <th>{{'HistoryTable_Type' | localize}}</th>
        <th>{{'HistoryTable_Open' | localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="({id, amount, date, categoryName, recordText, recordColor }, index) of records"
        :key="id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ amount | currency('RUB') }}</td>
        <td>{{ date | date('datetime') }}</td>
        <td>{{ categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[recordColor]">{{ recordText | localize }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${id}`)"
            v-tooltip="'Посмотреть детали'"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
