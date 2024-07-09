import kaplay from 'kaplay'
import { loadAtlasData } from './util'

const data = await loadAtlasData('sprites/ships_sheet.xml')
const k = window.k = kaplay({ background: '#006994' })

k.loadSpriteAtlas('sprites/ships_sheet.png', data)

/**
 * @param {k.Vec2} pos
 */
function destPos (pos) {
  return {
    id: 'destpos',
    require: ['pos', 'rotate'],

    update () {
      const dt = k.dt()
      const destAngle = this.pos.angle(pos) + 90
      const delta = destAngle - this.angle
      const distance = pos.sub(this.pos)

      this.pos = this.pos.add(distance.scale(dt))
      this.angle += delta * dt
    },

    destroy () {
      console.log(this)
    }
  }
}

k.scene('main', () => {
  const ship = k.add([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)'),
    k.area(),
    k.rotate(),
    k.anchor('center')
  ])

  k.onMousePress(() => {
    ship.use(destPos(k.mousePos()))
  })
})

k.go('main')
