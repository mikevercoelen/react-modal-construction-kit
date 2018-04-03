import React, { Component } from 'react'
import { Modal, Overlay } from '../src/index'
import './index.scss'

export default class App extends Component {
  state = {
    isModalVisible: false
  }

  onBtnOpenModalClick = () => {
    this.setState({
      isModalVisible: true
    })
  }

  onModalClosed = () => {
    this.setState({
      isModalVisible: false
    })
  }

  close = () => {
    this.setState({ isModalVisible: false })
  }

  render () {
    const { isModalVisible } = this.state

    return (
      <div>
        <Modal
          btnCloseInner={(
            <div>
              X
            </div>
          )}
          header={(
            <h4>
              Modal header
            </h4>
          )}
          body={(
            <div>
              <p>
                This is the amazing content of our Modal.
              </p>
            </div>
          )}
          footer={(
            <div>
              <button onClick={this.close}>
                Close
              </button>
            </div>
          )}
          onClosed={this.onModalClosed}
          isOpen={isModalVisible} />
        <Overlay
          isVisible={isModalVisible} />
        <button
          onClick={this.onBtnOpenModalClick}>
          Open modal
        </button>
      </div>
    )
  }
}
