import { vanish, towards } from './components'
import { k } from './setup'
import { spawnShip } from './spawn'

k.scene('start', () => {
  k.add([k.text('Say arrrrr to start')])
  k.onMousePress(() => k.go('main'))
})

k.scene('main', () => {
  const player = spawnShip([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)'),
    'player'
  ])

  player.onDestroy(() => {
    k.go('start')
  })

  k.onMousePress(() => {
    player.use(towards(k.mousePos()))
  })

  k.onCollide('ship', 'ship', (a, b) => {
    k.shake(30)

    for (const current of [a, b]) {
      current.unuse('ship')
      current.use(vanish())
      current.use(k.layer('below'))
    }
  })

  k.loop(3, () => {
    const edge = k.choose([k.UP, k.RIGHT, k.DOWN, k.LEFT])
    const pos = k.rand(k.vec2(k.width(), k.height()))

    const enemy = spawnShip([
      k.pos(pos.scale(edge)),
      k.sprite('ship (2)'),
      k.offscreen({ destroy: true }),
      'enemy'
    ])

    enemy.onUpdate(() => {
      if (!enemy.is(['sink', 'towards'])) {
        enemy.use(towards(player.pos))
      }
    })
  })
})

k.go('start')
