import { towards } from './components'
import { k } from './setup'

k.scene('main', () => {
  const ship = k.add([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)'),
    k.area(),
    k.rotate(),
    k.anchor('center')
  ])

  k.onMousePress(() => {
    ship.use(towards(k.mousePos()))
  })
})

k.go('main')
