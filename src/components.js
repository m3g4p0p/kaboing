import { k } from './setup'

/**
 * @param {import('kaplay').Vec2} pos
 * @returns {import('kaplay').Comp}
 */
export function towards (pos) {
  return {
    id: 'towards',
    require: ['pos', 'rotate'],

    update () {
      const dt = k.dt()
      const destAngle = this.pos.angle(pos) + 90
      const delta = destAngle - this.angle
      const distance = pos.sub(this.pos)

      if (distance.dist() < 10) {
        this.unuse('towards')
      }

      this.pos = this.pos.add(distance.scale(dt))
      this.angle += delta * dt
    }
  }
}
