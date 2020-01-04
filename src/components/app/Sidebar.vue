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
import localizeFilter from '../../filters/localize.filter'

export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      { url: '/', title: localizeFilter('Sidebar_Bill'), exact: true },
      { url: '/history', title: localizeFilter('Sidebar_History'), exact: false },
      { url: '/planning', title: localizeFilter('Sidebar_Planning'), exact: false },
      { url: '/record', title: localizeFilter('Sidebar_NewRecord'), exact: false },
      { url: '/categories', title: localizeFilter('Sidebar_Categories'), exact: false }
    ]
  })
}
</script>
