export type Item = {
  title: string
  description: string
  price: string
}

export type Menu = {
  id: string
  itens: Item[]
}