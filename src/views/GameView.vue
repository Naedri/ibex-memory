<template>
  <div class="flex h-screen">
    <LeftBar
      :remaining="gameStore.remainingMessages"
      :discovered="gameStore.discoveredMessages"
      class="border-r border-border"
    />
    <div class="flex-1 grid grid-cols-4 gap-4 p-4 auto-rows-[140px]">
      <BaseCard
        v-for="(card, index) in gameStore.cards"
        :key="index"
        :imageUrl="card.imageUrl"
        :matched="card.matched"
        :flipped="card.flipped"
        :name="card.name"
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

async function initGame(deckName: string): Promise<void> {
  const deck = await deckStore.loadDeck(deckName)
  if (deck instanceof Deck) gameStore.initGame(deck)
  else console.error('Game initialization failed.')
}

onMounted(() => {
  const deckName = route.query.deckName as string
  if (deckName) initGame(deckName)
})

watch(
  () => gameStore.allCardsMatched,
  (matched) => {
    if (matched) notif.value.info($t('congrats'))
  },
)
</script>
