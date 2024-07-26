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

/**
 * @param {string} url
 * @returns {import('kaplay').SpriteAtlasData}
 */
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

/**
 * @typedef {Object} MappingData
 * @property {number} x
 * @property {number} y
 * @property {number} cols
 * @property {number} rows
 * @param {Object<string, MappingData>} mappings
 * @param {number} width
 * @param {number} height
 * @returns {import('kaplay').SpriteAtlasData}
 */
export function createAtlasData (mappings, width, height = width) {
  return Object.entries(mappings).reduce((carry, [name, data]) => ({
    ...carry,
    ...Array.from({
      length: data.cols * data.rows
    }).reduce((mapping, _, index) => ({
      ...mapping,
      [`${name} (${index + 1})`]: {
        x: (data.x + index % data.cols) * width,
        y: Math.floor(data.y + index / data.cols) * height,
        width,
        height
      }
    }), {})
  }), {})
}

export async function requestFullscreen () {
  if (!isMobile || document.fullscreenElement) {
    return
  }

  const canvas = document.querySelector('canvas')
  await canvas.requestFullscreen().catch(console.error)
}
