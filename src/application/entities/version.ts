export enum VersionName {
  oversized = 'oversized',
  foil = 'foil',
  nonFoil = 'nonFoil',
  promo = 'promo',
  textLess = 'textLess',
}
export class Version {
  private readonly version: VersionName

  constructor(version: VersionName) {
    this.version = version
  }

  public get value() {
    return this.version
  }
}
