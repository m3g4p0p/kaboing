import { k } from './setup'

export function worldMousePos () {
  return k.toWorld(k.mousePos())
}

export function randomEdge (offset = 0) {
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

  return k.toWorld(pos.add(edge.scale(offset)))
}
