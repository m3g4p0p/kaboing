import { k } from './setup'

/**
 * @param {import('kaplay').Vec2} pos
 * @returns {import('kaplay').Comp}
 */
export function towards (pos) {
  const start = new k.Vec2()

  return {
    id: 'towards',
    require: ['pos', 'rotate'],

    add () {
      Object.assign(start, this.pos)
    },

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

/**
 * @returns {import('kaplay').Comp}
 */
export function vanish () {
  return {
    id: 'vanish',
    require: ['color', 'opacity'],

    update () {
      this.opacity -= Math.min(k.dt(), this.opacity)
      this.color = k.BLACK.lerp(k.WHITE, this.opacity)

      if (this.opacity === 0) {
        this.destroy()
      }
    }
  }
}
