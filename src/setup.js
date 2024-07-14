import kaplay from 'kaplay'
import { createAtlasData, isMobile, loadAtlasData } from './util'

const shipAtlasData = await loadAtlasData('sprites/ships_sheet.xml')

const tileAtlasData = createAtlasData({
  rock: {
    x: 0,
    y: 3,
    cols: 3,
    rows: 2
  }
}, 64)

export const k = window.k = kaplay({
  background: '#006994',
  scale: isMobile ? 0.5 : 0.7
})

k.layers(['below', 'above', 'gui'], 'above')
k.loadSpriteAtlas('sprites/ships_sheet.png', shipAtlasData)
k.loadSpriteAtlas('sprites/tiles_sheet.png', tileAtlasData)
