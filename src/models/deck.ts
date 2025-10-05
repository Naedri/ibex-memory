import type { CardType, DeckItemType } from '@/types'

export class Deck {
  private items: DeckItemType[]

  constructor(items: DeckItemType[]) {
    this.items = items
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

  getTexts(): string[] {
    return this.items.map((item) => item.text)
  }
}
