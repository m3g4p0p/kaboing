import { vanish, towards } from './components'
import { randomEdge, worldMousePos } from './position'
import { k } from './setup'
import { spawnEntity, spawnShip } from './spawn'
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
    k.layer('ui')
  ])

  const { textSize } = score
  let camPos = k.camPos()

  const player = spawnShip([
    k.pos(k.camPos()),
    k.sprite('ship (1)'),
    { damage: 0 },
    'player'
  ])

  player.onDestroy(() => {
    k.go('start', score.text)
  })

  player.onUpdate(() => {
    const wave = k.UP.scale(k.wave(0, 10, k.time()))
    camPos = camPos.lerp(player.pos, k.dt() / 2)
    k.camPos(camPos.add(wave))
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

  k.onCollide('solid', 'ship', (a, b) => {
    if (navigator.vibrate) {
      navigator.vibrate(60)
    }

    k.shake(30)

    for (const current of [a, b]) {
      if (!current.is('ship')) {
        continue
      }

      if (current.is('player')) {
        player.damage++

        if (player.damage < 3) {
          player.use(k.sprite(
            `ship (${1 + player.damage * 6})`
          ))

          continue
        }
      }

      current.unuse(k.area())
      current.unuse('ship')
      current.unuse('towards')
      current.use(vanish())
      current.use(k.layer('below'))

      if (!current.is('enemy')) {
        continue
      }

      score.text++
      score.textSize += 10

      current.use(k.sprite(k.choose([
        'ship (8)',
        'ship (14)'
      ])))
    }
  })

  k.loop(1, () => {
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

  k.loop(1, () => {
    if (k.get('rock').length > 3) {
      return
    }

    spawnEntity([
      k.sprite(`rock (${k.randi(1, 6)})`),
      k.offscreen({ destroy: true }),
      k.pos(randomEdge(64)),
      'rock',
      'solid'
    ])
  })
})

k.go('start')
