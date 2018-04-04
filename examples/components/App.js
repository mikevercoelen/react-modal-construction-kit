import React, { Component } from 'react'
import { Modal, Overlay } from '../../src/index'
import '../index.scss'

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
          isCentered={false}
          className='modal'
          dialogClassName='modal__dialog'
          contentClassName='modal__content'
          onClickOutside={this.close}
          onClosed={this.onModalClosed}
          isOpen={isModalVisible}>
          <div className='modal__header'>
            Header
          </div>
          <div className='modal__body'>
            A super minimal Modal
          </div>
          <div className='modal__footer'>
            <button onClick={this.close}>
              Close
            </button>
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
