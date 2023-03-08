export interface IData{
  _id: string,
  sum: number,
  category: string,
  date: string
}

export interface ICardData{
  data: IData
}

export interface ICardsData{
  cardsData: Array<IData>,
  selectedValue: string
}
