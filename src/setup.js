import kaplay from 'kaplay'
import { loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')

export const k = window.k = kaplay({
  background: '#006994',
  scale: 0.5
})

k.layers(['below', 'above', 'gui'], 'above')
k.loadSpriteAtlas('sprites/ships_sheet.png', data)
