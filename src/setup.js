import kaplay from 'kaplay'
import { loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')

export const k = window.k = kaplay({
  background: '#006994'
})

k.layers(['below', 'above'], 'above')
k.loadSpriteAtlas('sprites/ships_sheet.png', data)
