import { towards } from './components'
import { k } from './setup'

function spawn (components) {
  return k.add([
    k.area(),
    k.rotate(k.rand(360)),
    k.anchor('center'),
    ...components
  ])
}

k.scene('main', () => {
  const player = spawn([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)'),
    'player'
  ])

  k.onMousePress(() => {
    player.use(towards(k.mousePos()))
  })

  k.loop(3, () => {
    if (k.get('enemy').length > 2) {
      return
    }

    const enemy = spawn([
      k.pos(k.rand(k.vec2(k.width(), k.height()))),
      k.sprite('ship (2)'),
      'enemy'
    ])

    enemy.onUpdate(() => {
      if (!enemy.is('towards')) {
        enemy.use(towards(player.pos))
      }
    })
  })
})

k.go('main')
