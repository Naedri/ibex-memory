import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Deck } from '@/models'
import type { DeckCardFile } from '@/types'

const useDeckStore = defineStore('decks', () => {
  const decks: Ref<Map<string, Deck>> = ref(new Map())

  function getDecks() {
    return decks.value
  }

  // Check if decks map is empty
  function isEmpty() {
    return decks.value.size == 0
  }

  // Load all decks available (from the filesystem)
  async function loadDecks() {
    const modules = import.meta.glob('../assets/decks/*.json', {
      import: 'default',
    })

    const deckEntries = Object.entries(modules)

    const promises = deckEntries.map(async ([path, loader]) => {
      const deckData = await (loader() as Promise<DeckCardFile>)
      const fileName = path.split('/').pop()?.replace('.json', '') || 'unknown'
      const deck = new Deck(deckData.cards, fileName, deckData.author)
      return [fileName, deck] as [string, Deck]
    })

    const resolvedDecks = await Promise.all(promises)
    decks.value = new Map(resolvedDecks)
  }

  // Add a deck manually
  function addDeck(fileName: string, deck: Deck) {
    decks.value.set(fileName, deck)
  }

  // Clear all decks
  function clearDecks() {
    decks.value.clear()
  }

  // Get a specific deck by file name
  function getDeck(fileName: string): Deck | undefined {
    return decks.value.get(fileName)
  }

  // Check if a deck exists
  function hasDeck(fileName: string): boolean {
    return decks.value.has(fileName)
  }

  // Load a single deck by file name (from the filesystem)
  async function loadDeck(fileName: string): Promise<Deck | undefined> {
    try {
      const loader = (await import(`../assets/decks/${fileName}.json`)).default as DeckCardFile

      const deck = new Deck(loader.cards, loader.author)
      decks.value.set(fileName, deck)
      return deck
    } catch (error) {
      console.error(`Failed to load deck "${fileName}":`, error)
      return undefined
    }
  }

  return {
    getDecks,
    isEmpty,
    loadDecks,
    addDeck,
    clearDecks,
    getDeck,
    hasDeck,
    loadDeck,
  }
})

export default useDeckStore
