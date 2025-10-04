<template>
  <div class="app flex">
    <LeftBar :remaining="gameStore.remainingMessages" :discovered="gameStore.discoveredMessages" />
    <div class="game-grid grid grid-cols-4 gap-4 p-4">
      <Card
        v-for="(card, index) in gameStore.cards"
        :key="index"
        :imageSrc="card.image"
        :matched="card.matched"
        @flip="() => gameStore.flipCard(card)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import LeftBar from '../components/LeftBar.vue'
import Card from '../components/Card.vue'
import { useGameStore } from '../stores/gameStore'
import type { CardType } from '../stores/gameStore'

const gameStore = useGameStore()

function importImages(): string[] {
  const modules = import.meta.glob('../assets/images/*.{jpg,png}', { eager: true })
  return Object.values(modules).map((mod: any) => mod.default)
}

function importMessages(): Promise<string[]> {
  const modules = import.meta.glob('../assets/messages/*.txt', { as: 'raw' })
  return Promise.all(Object.values(modules).map((loader) => loader() as Promise<string>))
}

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}

async function initGame(): Promise<void> {
  const images = importImages()
  const messages = await importMessages()

  gameStore.setRemainingMessages([...messages])

  const tempCards: CardType[] = []
  images.forEach((img, i) => {
    const message = messages[i % messages.length] ?? ''
    tempCards.push({ image: img, matched: false, message })
  })

  gameStore.setCards(shuffleArray(tempCards))
}

onMounted(() => {
  initGame()
  if (import.meta.hot) {
    import.meta.hot.accept(['../assets/messages/*.txt'], () => initGame())
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
