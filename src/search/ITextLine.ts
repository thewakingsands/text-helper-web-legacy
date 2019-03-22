export interface ITextLine {
  filename: string
  index: number
  cn: string
  en: string
  ja: string
}

export interface ISearchResult<T> {
  total: number
  hits: {
    _id: string
    _score: number
    _source: T
    highlight: { [K in keyof T]: string[] }
  }[]
}
