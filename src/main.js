import kaplay from 'kaplay'
import { loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')
const k = window.k = kaplay({ background: '#006994' })

k.loadSpriteAtlas('sprites/ships_sheet.png', data)

k.scene('main', () => {
  const destPos = new k.Vec2(k.width() / 2, k.height() / 2)

  const ship = k.add([
    k.pos(destPos),
    k.sprite('ship (1)'),
    k.area(),
    k.rotate()
  ])

  ship.onUpdate(() => {
    ship.angle = ship.pos.angle(destPos) + 90
  })

  k.onMousePress(() => {
    Object.assign(destPos, k.mousePos())
  })
})

k.go('main')
