export type Colors = ('W' | 'B' | 'R' | 'U' | 'G')[]

export type ColorName = keyof Colors

export class Color {
  private readonly color: ColorName

  constructor(color: ColorName) {
    this.color = color
  }

  public get value() {
    return this.color
  }
}
