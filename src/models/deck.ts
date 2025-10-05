import type { CardType, DeckCard } from '@/types'

export class Deck {
  private items: DeckCard[]
  private author: string
  private fileName: string

  constructor(items: DeckCard[], fileName = '', author = '') {
    this.items = items
    this.author = author
    this.fileName = fileName
  }

  getCards(): CardType[] {
    return this.items.map(({ imageUrl, text, cardName }) => ({
      imageUrl,
      message: text,
      matched: false,
      flipped: false,
      name: cardName,
    }))
  }

  getSize(): number {
    return this.items.length
  }

  getAuthor(): string {
    return this.author
  }

  getFileName(): string {
    return this.fileName
  }

  getTexts(): string[] {
    return this.items.map((item) => item.text)
  }
}
