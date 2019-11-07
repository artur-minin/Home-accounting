<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer">
        <div class="circle-clipper left" :class="spinnerColor">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    spinnerColor() {
      const colors = [
        'spinner-red-only',
        'spinner-green-only',
        'spinner-blue-only'
      ]
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>
