<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="({id, amount, date, categoryName, recordText, recordColor }, index) of records" :key="id">
        <td>{{ index + 1 }}</td>
        <td>{{ amount | currency('RUB') }}</td>
        <td>{{ date | date('datetime') }}</td>
        <td>{{ categoryName }}</td>
        <td>
          <span
            class="white-text badge"
            :class="[recordColor]"
          >{{ recordText }}</span>
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
