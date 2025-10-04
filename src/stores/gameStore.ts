import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CardType, Deck } from '@/models'

export const useGameStore = defineStore('game', () => {
  const cards = ref<CardType[]>([])
  const flippedCards = ref<CardType[]>([])
  const discoveredMessages = ref<string[]>([])
  const remainingMessages = ref<string[]>([])

  function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5)
  }

  function setCards(newCards: CardType[]) {
    cards.value = newCards.map((card) => ({ ...card, flipped: false }))
  }

  function initGame(deck: Deck) {
    const cards = [...deck.getCards(), ...deck.getCards()]
    setCards(shuffleArray(cards))
  }

  function flipCard(card: CardType) {
    if (flippedCards.value.length < 2 && !card.matched && !card.flipped) {
      card.flipped = true
      flippedCards.value.push(card)
    }

    if (flippedCards.value.length === 2) {
      const [first, second] = flippedCards.value

      if (!first || !second) return

      setTimeout(() => {
        if (first.imageUrl === second.imageUrl) {
          first.matched = true
          second.matched = true

          if (!discoveredMessages.value.includes(first.message)) {
            discoveredMessages.value.push(first.message)
            remainingMessages.value = remainingMessages.value.filter((msg) => msg !== first.message)
          }
        } else {
          first.flipped = false
          second.flipped = false
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
    initGame,
    setCards,
    flipCard,
    setRemainingMessages,
    setDiscoveredMessages,
  }
})
