<template>
  <div class="app flex">
    <LeftBar :remaining="gameStore.remainingMessages" :discovered="gameStore.discoveredMessages" />
    <div class="game-grid grid grid-cols-4 gap-4 p-4">
      <BaseCard
        v-for="(card, index) in gameStore.cards"
        :key="index"
        :imageUrl="card.imageUrl"
        :matched="card.matched"
        :flipped="card.flipped"
        @reveal="() => gameStore.revealCard(card)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { BaseCard, LeftBar } from '@/components'
import { useDeckStore, useGameStore } from '@/stores'
import { Deck } from '@/models'

const gameStore = useGameStore()
const deckStore = useDeckStore()
const route = useRoute()

async function initGame(deckIndex: number): Promise<void> {
  if (deckStore.decks.length == 0) await deckStore.loadDecks()
  const deck = deckStore.getDeck(deckIndex)
  if (deck instanceof Deck) gameStore.initGame(deck)
  else console.error('Game initialization failed.')
}

onMounted(() => {
  const deckIndexParam = route.query.deckIndex as string
  const deckIndex = parseInt(deckIndexParam, 10)
  if (!isNaN(deckIndex)) {
    initGame(deckIndex)
  }
})
</script>

<style>
.app {
  height: 100vh;
}
.game-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}
</style>
