import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../Portal/Portal'
import { Transition } from 'react-transition-group'
import cx from 'classnames'

const styles = {
  component: 'rmck-overlay',
  exited: 'rmck-overlay--exited',
  entering: 'rmck-overlay--entering',
  entered: 'rmck-overlay--entered',
  exiting: 'rmck-overlay--exited'
}

const Overlay = ({
  isVisible,
  timeout
}) => (
  <Portal>
    <Transition
      in={isVisible}
      timeout={timeout}>
      {state => (
        <div
          className={cx(styles.component, {
            [styles[state]]: state
          })} />
      )}
    </Transition>
  </Portal>
)

Overlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  timeout: PropTypes.number
}

Overlay.defaultProps = {
  timeout: 150
}

export default Overlay
