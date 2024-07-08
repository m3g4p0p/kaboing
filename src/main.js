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
    k.rotate(),
    k.anchor('center')
  ])

  ship.onUpdate(() => {
    const destAngle = ship.pos.angle(destPos) + 90
    const delta = destAngle - ship.angle

    ship.angle += delta * k.dt()
  })

  k.onMousePress(() => {
    Object.assign(destPos, k.mousePos())
  })
})

k.go('main')
