import { towards } from './components'
import { k } from './setup'

function spawn (components) {
  return k.add([
    k.area(),
    k.rotate(),
    k.anchor('center'),
    ...components
  ])
}

k.scene('main', () => {
  const ship = spawn([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)')
  ])

  k.onMousePress(() => {
    ship.use(towards(k.mousePos()))
  })
})

k.go('main')
