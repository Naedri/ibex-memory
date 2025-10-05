import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Deck } from '@/models'
import type { DeckItemType } from '@/types'

const useDeckStore = defineStore('decks', () => {
  const decks: Ref<Deck[]> = ref([])

  async function loadDecks() {
    const modules = import.meta.glob('../assets/decks/*.json', {
      import: 'default',
    })

    const promises = Object.values(modules).map((loader) => loader() as Promise<DeckItemType[]>)
    const decksItems = await Promise.all(promises)

    decks.value = decksItems.map((deckItem) => new Deck(deckItem))
  }

  function addDeck(deck: Deck) {
    decks.value.push(deck)
  }

  function clearDecks() {
    decks.value = []
  }

  function getDeck(index: number) {
    return decks.value[index] ?? ref([])
  }

  return {
    decks,
    getDeck,
    loadDecks,
    addDeck,
    clearDecks,
  }
})

export default useDeckStore
