<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      { url: '/', title: 'Счет', exact: true },
      { url: '/history', title: 'История', exact: false },
      { url: '/planning', title: 'Планирование', exact: false },
      { url: '/record', title: 'Новая запись', exact: false },
      { url: '/categories', title: 'Категории', exact: false }
    ]
  })
}
</script>
