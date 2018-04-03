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

  render () {
    const { isModalVisible } = this.state

    return (
      <div>
        <Modal
          header='Hello world'
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
