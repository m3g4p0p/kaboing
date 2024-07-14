import kaplay from 'kaplay'
import { isMobile, loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')

export const k = window.k = kaplay({
  background: '#006994',
  scale: isMobile ? 0.5 : 0.7
})

k.layers(['below', 'above', 'gui'], 'above')
k.loadSpriteAtlas('sprites/ships_sheet.png', data)
