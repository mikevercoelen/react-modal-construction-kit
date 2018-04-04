[![NPM](https://img.shields.io/npm/v/react-modal-construction-kit.svg)](https://www.npmjs.com/package/react-modal-construction-kit)

React-Modal-Construction-Kit
============

A high quality Modal and Overlay component, fully animated and customizable. No styling required ;) Its rendered by using React 16's `createPortal`.

## Demo

**NOTE**: It's ugly, yes (because it's fully customizable)

Demo: [mikevercoelen.github.io/react-modal-construction-kit](http://mikevercoelen.github.io/react-modal-construction-kit/)

## Installation

```shell
npm install react-modal-construction-kit --save
```

## Example

```js
import React, { Component } from 'react'
import { Modal, Overlay } from 'react-modal-construction-kit'

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
          <p>
            A super minimal Modal
          </p>
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
```

## Modal
The modal component is a fully customizable modal, requires no styling and is already animated out of the box.

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `isOpen` | boolean | false | Open or close modal's state |
| `isRequired` | boolean | false | If enabled, the Modal's close button will not show and keyDown @ `escape` will not close the modal |
| `autoFocus` | boolean | undefined | autofocus the component on mount |
| `zIndex` | number | 750 | z-index value |
| `role` | string | `"dialog"` | HTML5 `role` |
| `children` | React Node | undefined | The content of the modal |
| `onOpened` | function | undefined | Called on when the Transitions triggers 'onOpened' |
| `onClickOutside` | function | undefined | Called when the user clicks outside the modal |
| `onClosed` | function | undefined | Called on when the Transitions triggers 'onClosed' |
| `onEnter` | function | undefined | Called on `componentDidMount` |
| `onExit` | function | undefined | Called on `componentWillUnmount` | 
| `transitionDurationo` | number | 300 | Duration of the animation |
| `onEntered` | function(node, isAppearing) | undefined | - |
| `onExited` | function(node) | undefined | - |
| `className` | string | undefined | Adds a class names to component root |
| `dialogClassName` | string | undefined | Adds a class name to dialog |
| `contentClassName` | string | undefined | Adds a class name to content |

## Overlay
The Modal component does not have an overlay by default, the reason for this is: what if you have multiple modals open? You should only have ONE overlay. It's animated and also requires no styling, it just works ;)

```js
import { Overlay } from 'react-modal-construction-kit'
```

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `isVisible` | boolean | false | Shows or hides the overlay |
| `zIndex` | number | 500 | z-index value |
| `transitionDuration` | number | 150 | The duration of the transition |
| `opacity` | number | 0.7 | The opacity value when the overlay is fully visible |
| `backgroundColor` | string | `"black"` | The background color |
| `onClick` | function(event) | undefined | onClick handler, when using a modal you don't need this, use `Modal.onClickOutside` |

# License

MIT Licensed. Copyright (c) Mike Vercoelen 2018.
