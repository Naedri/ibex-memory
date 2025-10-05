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
import { onMounted, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BaseCard, LeftBar } from '@/components'
import { useDeckStore, useGameStore } from '@/stores'
import { Deck } from '@/models'
import type { Ref } from 'vue'
import type { Notifier } from '@/types'

const { t: $t } = useI18n()
const gameStore = useGameStore()
const deckStore = useDeckStore()
const route = useRoute()

const notif = inject<Ref<Notifier>>('notif')
if (!notif) throw new Error('notif not provided')

async function initGame(deckIndex: number): Promise<void> {
  if (deckStore.decks.length == 0) await deckStore.loadDecks()
  const deck = deckStore.getDeck(deckIndex)
  if (deck instanceof Deck) gameStore.initGame(deck)
  else console.error('Game initialization failed.')
}

onMounted(() => {
  const deckIndexParam = route.query.deckIndex as string
  const deckIndex = parseInt(deckIndexParam, 10)
  if (!isNaN(deckIndex)) initGame(deckIndex)
})

watch(
  () => gameStore.allCardsMatched,
  (matched) => {
    if (matched) notif.value.info($t('congrats'))
  },
)
</script>

<style>
.app {
  height: 100vh;
  position: relative;
}
.game-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}
</style>
