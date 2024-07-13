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
      const deltaAngle = destAngle - this.angle
      const deltaPos = pos.sub(this.pos)
      const distance = deltaPos.dist()
      const drift = k.Vec2.fromAngle(this.angle + 90)

      if (distance < 10) {
        this.unuse('towards')
      }

      if (Math.abs(deltaAngle) > 180) {
        this.angle += (deltaAngle - 360) % 360 * dt
      } else {
        this.angle += deltaAngle * dt
      }

      this.pos = this.pos
        .add(deltaPos.scale(dt / 2))
        .add(drift.scale(dt * distance / 2))
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
