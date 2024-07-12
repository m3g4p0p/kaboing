import { vanish, towards } from './components'
import { k } from './setup'
import { spawnShip } from './spawn'

k.scene('main', () => {
  k.layers(['below', 'above'], 'above')

  const player = spawnShip([
    k.pos(k.width() / 2, k.height() / 2),
    k.sprite('ship (1)'),
    'player'
  ])

  k.onMousePress(() => {
    player.use(towards(k.mousePos()))
    console.log(player.layer)
  })

  k.loop(3, () => {
    const enemy = spawnShip([
      k.pos(k.rand(k.vec2(k.width(), k.height()))),
      k.sprite('ship (2)'),
      'enemy'
    ])

    enemy.onUpdate(() => {
      if (!enemy.is(['sink', 'towards'])) {
        enemy.use(towards(player.pos))
      }
    })

    enemy.onCollide('enemy', other => {
      k.shake(30)

      for (const current of [enemy, other]) {
        current.unuse('enemy')
        current.use(vanish())
        current.use(k.layer('below'))
      }
    })
  })
})

k.go('main')
