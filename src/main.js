import kaplay from 'kaplay'
import { loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')
const k = window.k = kaplay({ background: '#006994' })

k.loadSpriteAtlas('sprites/ships_sheet.png', data)

k.add([
  k.pos(120, 80),
  k.sprite('ship (1)')
])
