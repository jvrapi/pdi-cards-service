import { randomUUID } from 'node:crypto'
import { type Replace } from '@helpers/replace'

export interface SetProps {
  code: string
  name: string
  type: string
  releasedAt: string
  isDigital: boolean
  isFoilOnly: boolean
  createdAt: Date
  updatedAt: Date
}

interface OptionalSetProps {
  createdAt?: Date
  updatedAt?: Date
}

export class Set {
  private readonly _id: string

  private readonly props: SetProps

  constructor(props: Replace<SetProps, OptionalSetProps>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public get code() {
    return this.props.code
  }

  public set code(code: string) {
    this.props.code = code
  }

  public get name() {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get type() {
    return this.props.type
  }

  public set type(type: string) {
    this.props.type = type
  }

  public get releasedAt() {
    return this.props.releasedAt
  }

  public set releasedAt(releasedAt: string) {
    this.props.releasedAt = releasedAt
  }

  public get isDigital() {
    return this.props.isDigital
  }

  public set isDigital(isDigital: boolean) {
    this.props.isDigital = isDigital
  }

  public get isFoilOnly() {
    return this.props.isFoilOnly
  }

  public set isFoilOnly(isFoilOnly: boolean) {
    this.props.isFoilOnly = isFoilOnly
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get updatedAt() {
    return this.props.updatedAt
  }
}
