import { vanish, towards } from './components'
import { randomEdge, worldMousePos } from './position'
import { k } from './setup'
import { spawnShip } from './spawn'
import { requestFullscreen } from './util'

k.scene('start', (score = 0) => {
  k.add([
    k.text('Say arrrrr'),
    k.pos(10, 10)
  ])

  k.add([
    k.text(`Sank ${score} ships hey ho`, {
      size: 24
    }),
    k.pos(10, 100)
  ])

  k.onMousePress(async () => {
    await requestFullscreen()
    k.go('main')
  })
})

k.scene('main', () => {
  const score = k.add([
    k.text(0),
    k.pos(10, 10),
    k.fixed(),
    k.layer('gui')
  ])

  const { textSize } = score

  const player = spawnShip([
    k.pos(k.camPos()),
    k.sprite('ship (1)'),
    'player'
  ])

  player.onDestroy(() => {
    k.go('start', score.text)
  })

  score.onUpdate(() => {
    if (score.textSize > textSize) {
      score.textSize -= 0.1
    }
  })

  k.onMousePress(() => {
    if (player.is('ship')) {
      player.use(towards(worldMousePos()))
    }
  })

  k.onCollide('ship', 'ship', (a, b) => {
    navigator.vibrate(60)
    k.shake(30)

    for (const current of [a, b]) {
      current.unuse('ship')
      current.use(vanish())
      current.use(k.layer('below'))

      if (current.is('enemy')) {
        score.text++
        score.textSize += 10
      }
    }
  })

  k.loop(1, function spawnEnemy () {
    if (k.get('enemy').length > 5) {
      return
    }

    const enemy = spawnShip([
      k.sprite('ship (2)'),
      k.offscreen({ destroy: true }),
      k.pos(randomEdge()),
      'enemy'
    ])

    enemy.onUpdate(() => {
      if (!enemy.is(['vanish', 'towards'])) {
        enemy.use(towards(player.pos))
      }
    })
  })
})

k.go('start')
