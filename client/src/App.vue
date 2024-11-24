<template>
  <Header />
  <main class="p-2">
    <RouterView />
  </main>
</template>

<script lang="ts">
import Header from './components/Header.vue';
export default {
  components: { Header }
}
</script>

<style scoped>

</style>
