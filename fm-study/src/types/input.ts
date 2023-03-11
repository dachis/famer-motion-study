export interface inputHandler {
  states: {
    name: string
    variable: number
    setter: React.Dispatch<React.SetStateAction<number>>
    min: number
    max: number
    step: number
  }[]
}
