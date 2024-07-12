import { k } from './setup'

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
