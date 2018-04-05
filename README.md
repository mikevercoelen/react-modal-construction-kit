[![NPM](https://img.shields.io/npm/v/react-modal-construction-kit.svg)](https://www.npmjs.com/package/react-modal-construction-kit)

React Modal Construction Kit
============

A highly extensible Modal library. 

* [`Modal`](#modal)
* [`Overlay`](#overlay)
* `Portal`

## Demo

[mikevercoelen.github.io/react-modal-construction-kit](http://mikevercoelen.github.io/react-modal-construction-kit/)

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

  close = () => {
    this.setState({ isModalVisible: false })
  }

  render () {
    const { isModalVisible } = this.state

    return (
      <div>
        <Modal
          onClickOutside={this.close}
          onClosed={this.close}
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
| `autoFocus` | boolean | - | autofocus the component on mount |
| `zIndex` | number | 750 | z-index value |
| `role` | string | `"dialog"` | HTML5 `role` |
| `children` | React Node | - | The content of the modal |
| `onOpened` | function | - | Called on when the Transitions triggers 'onOpened' |
| `onClosed` | function | - | Called on when the Transitions triggers 'onClosed' |
| `onClickOutside` | function() | - | Called when the user clicks outside the modal, this should trigger the same function as `onClosed` |
| `onEnter` | function | - | Called on `componentDidMount` |
| `onExit` | function | - | Called on `componentWillUnmount` | 
| `onEntered` | function(node, isAppearing) | - | - |
| `onExited` | function(node) | - | - |
| `className` | string | - | Adds a class names to component root |
| `dialogClassName` | string | - | Adds a class name to dialog |
| `contentClassName` | string | - | Adds a class name to content |
| `hasEscapeClose` | boolean | true | If enabled, `escape` keydown will onClosed |
| `transitionDuration` | number | 300 | Duration of the animation |

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
| `onClick` | function(event) | - | onClick handler, when using a modal you don't need this, use `Modal.onClickOutside` |

# License

MIT Licensed. Copyright (c) Mike Vercoelen 2018.
