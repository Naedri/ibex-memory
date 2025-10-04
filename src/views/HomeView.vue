<template>
  <div class="home flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl mb-6">Memory Game</h1>

    <div class="flex flex-wrap gap-2 mb-4">
      <router-link
        v-for="n in totalDecks"
        :key="n"
        :to="{ name: 'Game', query: { deckIndex: n - 1 } }"
        class="px-4 py-2 rounded border cursor-pointer"
      >
        Deck {{ n }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useDeckStore } from '../stores/deckStore'

const totalDecks = ref(0)
const deckStore = useDeckStore()

onMounted(async () => {
  if (deckStore.decks.length == 0) await deckStore.loadDecks()
  totalDecks.value = deckStore.decks.length
})
</script>

<style>
.home {
  text-align: center;
}
</style>
