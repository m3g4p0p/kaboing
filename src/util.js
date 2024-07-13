/* eslint-env browser */
export const isMobile = 'ontouchstart' in window

/**
 * @param {Element} element
 * @returns {Object.<string, string>}
 */
function getAttributes (element) {
  return Object.values(element.attributes)
    .reduce((carry, current) => ({
      ...carry,
      [current.name]: current.value
    }), {})
}

export async function loadAtlasData (url) {
  const response = await fetch(url)
  const text = await response.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'text/xml')
  const textures = xml.querySelectorAll('SubTexture')

  return Array.from(textures).reduce((carry, current) => {
    const { name, ...props } = getAttributes(current)
    const normalized = name.replace(/\.[^.]+$/, '')

    return { ...carry, [normalized]: props }
  }, {})
}

export async function requestFullscreen () {
  if (!isMobile || document.fullscreenElement) {
    return
  }

  const canvas = document.querySelector('canvas')
  await canvas.requestFullscreen().catch(console.error)
}
