export type ColorName = 'W' | 'B' | 'R' | 'U' | 'G'

export class Color {
  private readonly color: ColorName

  constructor(color: ColorName) {
    this.color = color
  }

  public get value() {
    return this.color
  }
}
