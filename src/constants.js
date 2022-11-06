import SpringSVG from './assets/box-1.svg'
import SummerSVG from './assets/box-2.svg'
import AutumnSVG from './assets/box-3.svg'
import WinterSVG from './assets/box-4.svg'

export const ICON_SVG = [
  SpringSVG,
  SummerSVG,
  AutumnSVG,
  WinterSVG,
]
export const INITIAL_DATE = Date.parse('2021-09-05')
export const TOKEN = {
  SPRING: 0,
  SUMMER: 1,
  AUTUMN: 2,
  WINTER: 3
}
export const TOKEN_ARRAY = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER']
export const STATUS = {
  IDLE: 0,
  ONGOING: 1
}

export const A_DAY = 30 * 1000 / 365

export const INITIAL_BALANCE = 1000

