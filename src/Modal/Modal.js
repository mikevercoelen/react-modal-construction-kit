import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Portal from '../Portal/Portal'
import Fade from '../Fade/Fade'

import {
  getOriginalBodyPadding,
  conditionallyUpdateScrollbar,
  setScrollbarWidth,
  mapToCssModules,
  omit,
  noop
} from '../utils'

const styles = {
  component: 'rmck-modal',
  dialog: 'rmck-modal__dialog',
  modalOpen: 'rmck-modal-open', // no bem (this class @ body when modal is open)
  modalContent: 'rmck-modal__content',
  header: 'rmck-modal__header',
  headerInner: 'rmck-modal__header-inner',
  body: 'rmck-modal__body',
  footer: 'rmck-modal__footer',
  fade: 'rmck-modal__fade',
  show: 'rmck-modal__show',
  btnClose: 'rmck-modal__btn-close',
  btnCloseInner: 'rmck-modal__btn-close-inner'
}

const FadePropTypes = PropTypes.shape(Fade.propTypes)

const propTypes = {
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  toggle: PropTypes.func,
  isFirst: PropTypes.bool, // TODO: handle isFirst
  isRequired: PropTypes.bool,
  header: PropTypes.node,
  role: PropTypes.string,
  labelledBy: PropTypes.string,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  body: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  btnCloseInner: PropTypes.node,
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  modalTransition: FadePropTypes
}

const propsToOmit = Object.keys(propTypes)

const defaultProps = {
  isOpen: false,
  autoFocus: true,
  role: 'dialog',
  zIndex: 1050,
  fade: true,
  onOpened: noop,
  isRequired: false,
  onClosed: noop,
  modalTransition: {
    timeout: 300
  },
  cssModule: {
    'modal': styles.component,
    'modal-dialog': styles.dialog,
    'modal-open': styles.modalOpen,
    'modal-content': styles.modalContent,
    'fade': styles.fade,
    'show': styles.show
  }
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
    this.props.onOpened();
    (this.props.modalTransition.onEntered || noop)(node, isAppearing)
  }

  onClosed = (node) => {
    // so all methods get called before it is unmounted
    this.props.onClosed();
    (this.props.modalTransition.onExited || noop)(node)
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

    if (!this.bodyClassAdded) {
      document.body.className = classNames(
        document.body.className,
        mapToCssModules('modal-open', this.props.cssModule)
      )
      this.bodyClassAdded = true
    }
  }

  destroy () {
    if (this.element) {
      document.body.removeChild(this.element)
      this.element = null
    }

    if (this.bodyClassAdded) {
      const modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule)
      // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
      const modalOpenClassNameRegex = new RegExp(`(^| )${modalOpenClassName}( |$)`)
      document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim()
      this.bodyClassAdded = false
    }

    setScrollbarWidth(this.originalBodyPadding)
  }

  renderModalDialog () {
    const {
      header,
      isRequired,
      onClosed,
      body,
      footer,
      className,
      size,
      contentClassName,
      cssModule,
      btnCloseInner
    } = this.props

    const attributes = omit(this.props, propsToOmit)
    const dialogBaseClass = 'modal-dialog'

    return (
      <div
        {...attributes}
        className={mapToCssModules(classNames(dialogBaseClass, className, {
          [`modal-${size}`]: size
        }), cssModule)}
        role='document'
        ref={(c) => {
          this.dialog = c
        }}
      >
        <div
          className={mapToCssModules(
            classNames('modal-content', contentClassName),
            cssModule
          )}
        >
          <div className={styles.header}>
            <div className={styles.headerInner}>
              {header}
            </div>
            {(!isRequired && onClosed) && (
              <button
                className={styles.btnClose}
                onClick={onClosed}>
                {btnCloseInner || (
                  <div className={styles.btnCloseInner}>
                    ✕
                  </div>
                )}
              </button>
            )}
          </div>
          <div className={styles.body}>
            {body}
          </div>
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  }

  render () {
    if (!this.state.isOpen) {
      return null
    }

    const {
      wrapClassName,
      modalClassName,
      cssModule,
      isOpen,
      role,
      labelledBy
    } = this.props

    const modalAttributes = {
      onKeyUp: this.handleEscape,
      style: { display: 'block' },
      'aria-labelledby': labelledBy,
      role,
      tabIndex: '-1'
    }

    const hasTransition = this.props.fade
    const modalTransition = {
      ...Fade.defaultProps,
      ...this.props.modalTransition,
      baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
      timeout: hasTransition ? this.props.modalTransition.timeout : 0
    }

    return (
      <Portal node={this.element}>
        <div className={mapToCssModules(wrapClassName)}>
          <Fade
            {...modalAttributes}
            {...modalTransition}
            in={isOpen}
            onEntered={this.onOpened}
            onExited={this.onClosed}
            cssModule={cssModule}
            className={mapToCssModules(classNames('modal', modalClassName), cssModule)}
          >
            {this.renderModalDialog()}
          </Fade>
        </div>
      </Portal>
    )
  }
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
