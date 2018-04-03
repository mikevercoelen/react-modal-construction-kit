import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../Portal/Portal'
import { Transition } from 'react-transition-group'

const getDefaultStyle = transitionDuration => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'black',
  willChange: 'opacity',
  transition: `opacity ${transitionDuration}ms linear`
})

export const getTransitionStyles = opacity => ({
  exited: {
    display: 'none'
  },
  entering: {
    opacity: 0.01
  },
  entered: {
    opacity
  },
  exiting: {
    opacity: 0.01
  }
})

const Overlay = ({
  isVisible,
  zIndex,
  transitionDuration,
  opacity
}) => {
  const style = {
    ...getDefaultStyle(transitionDuration),
    zIndex: zIndex || 500
  }

  return (
    <Portal>
      <Transition
        in={isVisible}
        timeout={transitionDuration}>
        {state => (
          <div
            style={{
              ...style,
              ...getTransitionStyles(opacity)[state]
            }} />
        )}
      </Transition>
    </Portal>
  )
}

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  transitionDuration: PropTypes.number,
  zIndex: PropTypes.number,
  opacity: PropTypes.number
}

Overlay.defaultProps = {
  transitionDuration: 150,
  zIndex: 500,
  opacity: 0.4
}

export default Overlay
