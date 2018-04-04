import React, { Component } from 'react'
import { Modal, Overlay } from '../../src/index'

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
          onClickOutside={this.close}
          onClosed={this.onModalClosed}
          isOpen={isModalVisible}>
          <div>
            A super minimal Modal
          </div>
        </Modal>
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
