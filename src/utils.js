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

export function noop () { }
