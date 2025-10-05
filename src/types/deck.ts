export type DeckCard = {
  imageUrl: string
  text: string
  cardName: string
}

export type DeckCardFile = {
  author: string
  cards: DeckCard[]
}

export type DeckItemDetails = DeckCardFile & {
  fileName: string
}
