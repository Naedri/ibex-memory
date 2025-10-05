import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Card, CardMessage } from '@/types'
import type { Deck } from '@/models'

const useGameStore = defineStore('game', () => {
  const cards = ref<Card[]>([])
  const flippedCards = ref<Card[]>([])
  const messages: Ref<Map<string, CardMessage>> = ref(new Map())
  const allCardsMatched = computed(() => {
    return cards.value.every((card) => card.matched)
  })

  function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5)
  }

  function setCards(newCards: Card[]) {
    cards.value = newCards.map((card) => ({ ...card, flipped: false }))
  }

  function getMessages() {
    return messages
  }

  function getMessagesArr() {
    return Array.from(messages.value.values())
  }

  function clearMessages() {
    messages.value.clear()
  }

  function addMessage(newCard: Card) {
    const message = { message: newCard.message, disclosed: false }
    messages.value.set(newCard.imageUrl, message)
  }

  function setMessages(newCards: Card[]) {
    clearMessages()
    newCards.forEach(addMessage)
  }

  function revealMessage(imageUrl: string) {
    const message = messages.value.get(imageUrl)
    if (message) message.disclosed = true
    else console.error('message not found')
  }

  function initGame(deck: Deck) {
    const cards = [...deck.getCards(), ...deck.getCards()]
    setCards(shuffleArray(cards))
    setMessages(deck.getCards())
  }

  function revealCard(card: Card) {
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

            const imageUrl = first.imageUrl
            revealMessage(imageUrl)
          } else {
            first.flipped = false
            second.flipped = false
          }

          flippedCards.value = []
        }, 500)
      }
    }
  }

  return {
    allCardsMatched,
    cards,
    flippedCards,
    initGame,
    revealCard,
    getMessages,
    getMessagesArr,
  }
})

export default useGameStore
