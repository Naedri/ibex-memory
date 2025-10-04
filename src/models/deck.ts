import type { CardType } from './card'

export type DeckItemType = {
  imageUrl: string
  text: string
}

export class Deck {
  private items: DeckItemType[]

  constructor(items: DeckItemType[]) {
    this.items = items
  }

  getCards(): CardType[] {
    return this.items.map(({ imageUrl, text }) => ({
      imageUrl,
      message: text,
      matched: false,
      flipped: false,
    }))
  }

  getTexts(): string[] {
    return this.items.map((item) => item.text)
  }
}
