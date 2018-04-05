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
  transitionDuration
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
    transition: `opacity ${transitionDuration / 2}ms linear, transform ${transitionDuration}ms ease-out`
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

export default class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    autoFocus: PropTypes.bool,
    hasEscapeClose: PropTypes.bool,
    hasOutsideClickClose: PropTypes.bool,
    role: PropTypes.string,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func,
    zIndex: PropTypes.number,
    children: PropTypes.node.isRequired,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    transitionDuration: PropTypes.number,
    className: PropTypes.string,
    dialogClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    isCentered: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,
    autoFocus: true,
    role: 'dialog',
    zIndex: 750,
    onOpened: noop,
    hasEscapeClose: true,
    hasOutsideClickClose: true,
    onClosed: noop,
    transitionDuration: 300,
    onEntered: noop,
    onExited: noop,
    isCentered: true
  }

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

    window.addEventListener('keydown', this.handleEscape, true)

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

    window.removeEventListener('keydown', this.handleEscape, true)

    this._isMounted = false
  }

  onOpened = (node, isAppearing) => {
    const {
      onOpened,
      onEntered
    } = this.props

    onOpened()
    onEntered(node, isAppearing)
  }

  onClosed = (node) => {
    const {
      onClosed,
      onExited
    } = this.props

    onClosed()
    onExited(node)
    this.destroy()

    if (this._isMounted) {
      this.setState({ isOpen: false })
    }
  }

  setFocus () {
    if (this.dialogRef && this.dialogRef.parentNode && typeof this.dialogRef.parentNode.focus === 'function') {
      this.dialogRef.parentNode.focus()
    }
  }

  handleEscape = (e) => {
    const { isOpen, hasEscapeClose, onClosed } = this.props

    if (isOpen && hasEscapeClose && e.keyCode === 27 && onClosed) {
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

  handleClick = (e) => {
    const hasClickedOutside = !this.contentRef.contains(e.target)

    if (hasClickedOutside) {
      this.props.onClosed()
    }
  }

  render () {
    if (!this.state.isOpen) {
      return null
    }

    const {
      isOpen,
      role,
      transitionDuration,
      children,
      className,
      dialogClassName,
      contentClassName,
      hasOutsideClickClose
    } = this.props

    const style = getStyle(this.props)

    return (
      <Portal node={this.element}>
        <Transition
          appear
          onEntered={this.onOpened}
          onExited={this.onClosed}
          timeout={transitionDuration}
          in={isOpen}>
          {state => (
            <div
              onClick={hasOutsideClickClose ? this.handleClick : null}
              tabIndex='-1'
              role={role}
              className={className}
              style={{
                ...style.component,
                ...getTransitionStyles()[state]
              }}>
              <div
                className={dialogClassName}
                style={style.dialog}
                role='document'
                ref={(c) => {
                  this.dialogRef = c
                }}>
                <div
                  className={contentClassName}
                  ref={c => {
                    this.contentRef = c
                  }}
                  style={style.content}>
                  {children}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </Portal>
    )
  }
}
