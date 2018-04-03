export function getScrollbarWidth () {
  let scrollDiv = document.createElement('div')
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  scrollDiv.style.width = '50px'
  scrollDiv.style.height = '50px'
  scrollDiv.style.overflow = 'scroll'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

export function setScrollbarWidth (padding) {
  document.body.style.paddingRight = padding > 0 ? `${padding}px` : null
}

export function isBodyOverflowing () {
  return document.body.clientWidth < window.innerWidth
}

export function getOriginalBodyPadding () {
  const style = window.getComputedStyle(document.body, null)

  return parseInt(
    (style && style.getPropertyValue('padding-right')) || 0,
    10
  )
}

export function conditionallyUpdateScrollbar () {
  const scrollbarWidth = getScrollbarWidth()
  const bodyPadding = 0

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth)
  }
}

let globalCssModule

// TODO: support global css modules
export function setGlobalCssModule (cssModule) {
  globalCssModule = cssModule
}

export function mapToCssModules (className = '', cssModule = globalCssModule) {
  if (!cssModule) {
    return className
  }

  return className.split(' ').map(c => cssModule[c] || c).join(' ')
}

export const TransitionPropTypeKeys = [
  'in',
  'mountOnEnter',
  'unmountOnExit',
  'appear',
  'enter',
  'exit',
  'timeout',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited'
]

export function noop () { }

/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
export function omit (obj, omitKeys) {
  const result = {}
  Object.keys(obj).forEach((key) => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
export function pick (obj, keys) {
  const pickKeys = Array.isArray(keys) ? keys : [keys]
  let length = pickKeys.length
  let key
  const result = {}

  while (length > 0) {
    length -= 1
    key = pickKeys[length]
    result[key] = obj[key]
  }
  return result
}
