import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CardType } from '@/types'
import type { Deck } from '@/models'

const useGameStore = defineStore('game', () => {
  const cards = ref<CardType[]>([])
  const flippedCards = ref<CardType[]>([])
  const discoveredMessages = ref<string[]>([])
  const remainingMessages = ref<string[]>([])

  const allCardsMatched = computed(() => {
    return cards.value.every((card) => card.matched)
  })

  function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5)
  }

  function setCards(newCards: CardType[]) {
    cards.value = newCards.map((card) => ({ ...card, flipped: false }))
  }

  function setMessages(newCards: CardType[]) {
    remainingMessages.value = newCards.map(({ message }) => message)
    discoveredMessages.value = []
  }

  function initGame(deck: Deck) {
    const cards = [...deck.getCards(), ...deck.getCards()]
    setCards(shuffleArray(cards))
    setMessages(deck.getCards())
  }

  function revealCard(card: CardType) {
    if (!card.matched && !card.flipped) {
      if (flippedCards.value.length < 2) {
        card.flipped = true
        flippedCards.value.push(card)
      }

      if (flippedCards.value.length == 2) {
        const [first, second] = flippedCards.value
        if (!first || !second) return

        setTimeout(() => {
          if (first.imageUrl === second.imageUrl) {
            first.matched = true
            second.matched = true

            const message = first.message
            if (!discoveredMessages.value.includes(message)) {
              discoveredMessages.value.push(message)
              remainingMessages.value = remainingMessages.value.filter((msg) => msg !== message)
            }
          } else {
            first.flipped = false
            second.flipped = false
          }

          flippedCards.value = []
        }, 500)
      } else {
        flippedCards.value = []
      }
    }
  }

  function setRemainingMessages(msgs: string[]) {
    remainingMessages.value = msgs
  }

  function setDiscoveredMessages(msgs: string[]) {
    discoveredMessages.value = msgs
  }

  return {
    allCardsMatched,
    cards,
    flippedCards,
    discoveredMessages,
    remainingMessages,
    initGame,
    revealCard,
    setRemainingMessages,
    setDiscoveredMessages,
  }
})

export default useGameStore
