export enum FormatName {
  standard = 'standard',
  future = 'future',
  historic = 'historic',
  gladiator = 'gladiator',
  pioneer = 'pioneer',
  explorer = 'explorer',
  modern = 'modern',
  legacy = 'legacy',
  pauper = 'pauper',
  vintage = 'vintage',
  penny = 'penny',
  commander = 'commander',
  brawl = 'brawl',
  historicbrawl = 'historicbrawl',
  alchemy = 'alchemy',
  paupercommander = 'paupercommander',
  duel = 'duel',
  oldschool = 'oldschool',
  premodern = 'premodern',
  oathbreaker = 'oathbreaker',
  predh = 'predh',
}
interface FormatProps {
  format: FormatName
  isLegal?: boolean
}

export class Format {
  private readonly props: FormatProps

  constructor(props: FormatProps) {
    this.props = {
      ...props,
      isLegal: props.isLegal ?? true,
    }
  }

  public get value() {
    return this.props.format
  }

  public get isLegal() {
    return this.props.isLegal
  }
}
