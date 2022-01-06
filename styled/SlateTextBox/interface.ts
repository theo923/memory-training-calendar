import { ReactNode } from 'react'

export interface CustomElement {
  type: string
  children: CustomText[] | CustomText
  videoId?: string
  imageLink?: string
}

export interface CustomText {
  text: string
  bold?: true
}

export interface ButtonInterface {
  format: string
  icon: ReactNode
}

export interface ElementInterface {
  attributes?: any
  children?: any
  element: CustomElement
  leaf?: any
}
