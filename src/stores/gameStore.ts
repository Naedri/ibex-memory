import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CardType {
  image: string
  matched: boolean
  message: string
}

export const useGameStore = defineStore('game', () => {
  const cards = ref<CardType[]>([])
  const flippedCards = ref<CardType[]>([])
  const discoveredMessages = ref<string[]>([])
  const remainingMessages = ref<string[]>([])

  function setCards(newCards: CardType[]) {
    cards.value = newCards
  }

  function flipCard(card: CardType) {
    if (flippedCards.value.length < 2 && !card.matched) {
      flippedCards.value.push(card)
    }

    if (flippedCards.value.length === 2) {
      const [first, second] = flippedCards.value

      if (!first || !second) return // protection TypeScript

      setTimeout(() => {
        if (first.image === second.image) {
          first.matched = true
          second.matched = true

          if (!discoveredMessages.value.includes(first.message)) {
            discoveredMessages.value.push(first.message)
            remainingMessages.value = remainingMessages.value.filter((msg) => msg !== first.message)
          }
        }
        flippedCards.value.length = 0
      }, 800)
    }
  }

  function setRemainingMessages(msgs: string[]) {
    remainingMessages.value = msgs
  }

  function setDiscoveredMessages(msgs: string[]) {
    discoveredMessages.value = msgs
  }

  return {
    cards,
    flippedCards,
    discoveredMessages,
    remainingMessages,
    setCards,
    flipCard,
    setRemainingMessages,
    setDiscoveredMessages,
  }
})
