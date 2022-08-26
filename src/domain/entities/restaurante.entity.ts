export type Restaurant = {
  id: string
  name: string
  accountId: string
  menus?: Restaurant.Menu[]
}

export namespace Restaurant {
  export type Menu = {
    name: string
    description: string
    itens: Menu.Item[]
  }

  export namespace Menu {
    export type Item = {
      name: string
      photos?: string[]
      description: string
    }

  }
}