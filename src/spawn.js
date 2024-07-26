import { k } from './setup'

/**
 * @param {Array<import('kaplay').Comp | string>} components
 * @returns {import('kaplay').GameObj}
 */
export function spawnEntity (components) {
  return k.add([
    k.anchor('center'),
    k.area(),
    ...components
  ])
}

/**
 * @param {Array<import('kaplay').Comp | string>} components
 * @returns {import('kaplay').GameObj}
 */
export function spawnShip (components) {
  return spawnEntity([
    k.color(k.WHITE),
    k.layer('above'),
    k.opacity(1),
    k.rotate(k.rand(360)),
    'ship',
    'solid',
    ...components
  ])
}

/**
 * @param {import('kaplay').Vec2} pos
 * @param {number} radius
 * @param {number} duration
 * @returns {import('kaplay').GameObj}
 */
export function spawnFlare (pos, radius, duration) {
  const flare = k.add([
    k.circle(0),
    k.color(k.YELLOW),
    k.lifespan(duration),
    k.opacity(1),
    k.pos(pos)
  ])

  k.tween(0, 1, duration, value => {
    flare.radius = value * radius
    flare.opacity = 1 - value
    flare.color.b = value * 255
  }, k.easings.easeOutSine)

  return flare
}
