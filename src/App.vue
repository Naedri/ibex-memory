<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDeckStore } from './stores/deckStore'

const deckStore = useDeckStore()

onMounted(() => {
  deckStore.loadDecks()
})
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
