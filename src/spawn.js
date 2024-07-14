import { k } from './setup'

export function randomEdge () {
  const edge = k.choose([k.UP, k.RIGHT, k.DOWN, k.LEFT])
  const [width, height] = [k.width(), k.height()]
  const pos = k.rand(k.vec2(width, height))

  switch (edge) {
    case k.UP:
      pos.y = 0
      break
    case k.RIGHT:
      pos.x = width
      break
    case k.DOWN:
      pos.y = height
      break
    case k.LEFT:
      pos.x = 0
  }

  return pos
}

/**
 * @param {Array<import('kaplay').Comp | string>} components
 */
export function spawnShip (components) {
  return k.add([
    k.anchor('center'),
    k.area(),
    k.color(k.WHITE),
    k.opacity(1),
    k.rotate(k.rand(360)),
    'ship',
    ...components
  ])
}
