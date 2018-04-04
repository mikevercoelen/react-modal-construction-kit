import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../Portal/Portal'
import { Transition } from 'react-transition-group'

import {
  getOriginalBodyPadding,
  conditionallyUpdateScrollbar,
  setScrollbarWidth,
  noop
} from '../utils'

export const getTransitionStyles = () => ({
  exited: {
    display: 'none'
  },
  entering: {
    opacity: 0.01,
    transform: 'scale(1.05)'
  },
  entered: {
    opacity: 1,
    transform: 'none'
  },
  exiting: {
    opacity: 0.01,
    transform: 'scale(0.90)'
  }
})

const getStyle = ({
  zIndex,
  isCentered,
  transition
}) => ({
  component: {
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex,
    outline: 0,
    transition: `opacity ${transition.duration / 2}ms linear, transform ${transition.duration}ms ease-out`
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    maxWidth: `500px`,
    margin: (isCentered ? '0 auto' : '1.75rem auto'),
    minHeight: isCentered && '100%',
    width: 'auto',
    boxSizing: 'border-box',
    pointerEvents: 'none'
  },
  content: {
    position: 'relative',
    WebkitBoxOrient: 'vertical',
    WebkitBoxDirection: 'normal',
    MsFlexDirection: 'column',
    flexDirection: 'column',
    width: '100%',
    pointerEvents: 'auto',
    backgroundColor: 'white',
    backgroundClip: 'padding-box',
    outline: 0,
    display: 'flex',
    boxSizing: 'border-box'
  }
})

const propTypes = {
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isRequired: PropTypes.bool,
  role: PropTypes.string,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  zIndex: PropTypes.number,
  onClickOutside: PropTypes.func,
  children: PropTypes.node.isRequired,
  transition: PropTypes.shape({
    duration: 300,
    onEntered: PropTypes.func,
    onExited: PropTypes.func
  })
}

const defaultProps = {
  isOpen: false,
  autoFocus: true,
  role: 'dialog',
  zIndex: 750,
  onOpened: noop,
  isRequired: false,
  onClosed: noop,
  onClickOutside: noop,
  transition: {
    duration: 300,
    onExited: noop,
    onEntered: noop
  },
  isCentered: true
}

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.element = null
    this.originalBodyPadding = null

    this.state = {
      isOpen: props.isOpen
    }

    if (props.isOpen) {
      this.init()
    }
  }

  componentDidMount () {
    if (this.props.onEnter) {
      this.props.onEnter()
    }

    if (this.state.isOpen && this.props.autoFocus) {
      this.setFocus()
    }

    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.isOpen && !this.state.isOpen) {
      this.init()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
      this.setFocus()
    }
  }

  componentWillUnmount () {
    if (this.props.onExit) {
      this.props.onExit()
    }

    if (this.state.isOpen) {
      this.destroy()
    }

    this._isMounted = false
  }

  onOpened = (node, isAppearing) => {
    const {
      onOpened,
      transition
    } = this.props

    onOpened()
    transition.onEntered(node, isAppearing)
  }

  onClosed = (node) => {
    const {
      onClosed,
      transition
    } = this.props

    onClosed()
    transition.onExited(node)
    this.destroy()

    if (this._isMounted) {
      this.setState({ isOpen: false })
    }
  }

  setFocus () {
    if (this.dialog && this.dialog.parentNode && typeof this.dialog.parentNode.focus === 'function') {
      this.dialog.parentNode.focus()
    }
  }

  handleEscape = (e) => {
    const { isOpen, isRequired, onClosed } = this.props

    if (isOpen && !isRequired && e.keyCode === 27 && onClosed) {
      onClosed()
    }
  }

  init () {
    this.element = document.createElement('div')
    this.element.setAttribute('tabindex', '-1')
    this.element.style.position = 'relative'
    this.element.style.zIndex = this.props.zIndex
    this.originalBodyPadding = getOriginalBodyPadding()

    conditionallyUpdateScrollbar()

    document.body.appendChild(this.element)

    if (!this._bodyStyleAdded) {
      document.body.style.overflow = 'hidden'
      this._bodyStyleAdded = true
    }
  }

  destroy () {
    if (this.element) {
      document.body.removeChild(this.element)
      this.element = null
    }

    if (this._bodyStyleAdded) {
      document.body.style.overflow = null
      this._bodyStyleAdded = false
    }

    setScrollbarWidth(this.originalBodyPadding)
  }

  renderModalDialog = (style) => {
    return (
      <div
        style={style.dialog}
        role='document'
        ref={(c) => {
          this.dialog = c
        }}>
        <div
          ref={c => {
            this.content = c
          }}
          style={style.content}>
          {this.props.children}
        </div>
      </div>
    )
  }

  handleClick = (e) => {
    const hasClickedOutside = !this.content.contains(e.target)
    hasClickedOutside && this.props.onClickOutside()
  }

  render () {
    if (!this.state.isOpen) {
      return null
    }

    const {
      isOpen,
      role,
      transition
    } = this.props

    const style = getStyle(this.props)

    return (
      <Portal node={this.element}>
        <Transition
          appear
          onEntered={this.onOpened}
          onExited={this.onClosed}
          timeout={transition.duration}
          in={isOpen}>
          {state => (
            <div
              onClick={this.handleClick}
              tabIndex='-1'
              role={role}
              onKeyUp={this.handleEscape}
              style={{
                ...style.component,
                ...getTransitionStyles()[state]
              }}>
              {this.renderModalDialog(style)}
            </div>
          )}
        </Transition>
      </Portal>
    )
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
