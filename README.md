[![NPM](https://img.shields.io/npm/v/react-modal-construction-kit.svg)](https://www.npmjs.com/package/react-modal-construction-kit)

React-Modal-Construction-Kit
============

A high quality Modal and Overlay component, fully animated and customizable. No styling required ;)

## Demo & Examples

Live demo: [jedwatson.github.io/react-select](http://jedwatson.github.io/react-select/)

## Installation

```js
npm install react-modal-construction-kit --save
```

## Usage

```js
import React from 'react';
import { Modal, Overlay } from 'react-modal-construction-kit';

class App extends React.Component {
  state = {
    isModalOpen: false,
  }
  
  onOpenModalClick = () => {
    this.setState({ isModalOpen: true });
    console.log(`Selected: ${selectedOption.label}`);
  }
  
  close = () => {
    this.setState({ isModalOpen: false })
  }
  
  render() {
    const { isModalOpen } = this.state;
    
    return (
      <div>
        <Modal
          closeButton={(onClosed) => (
            <button onClick={onClosed}>
              Close it
            </button>
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
```

const propTypes = {
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isRequired: PropTypes.bool,
  header: PropTypes.node,
  role: PropTypes.string,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node,
  closeButton: PropTypes.func,
  zIndex: PropTypes.number,
  transition: PropTypes.shape({
    duration: 300,
    onEntered: PropTypes.func,
    onExited: PropTypes.func
  }),
  /* eslint-disable react/no-unused-prop-types */
  styling: PropTypes.shape({
    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    maxWidth: PropTypes.number,
    isCentered: PropTypes.bool,
    backgroundColor: PropTypes.string
  })
  /* eslint-enable react/no-unused-prop-types */
}

## Modal

```js
import { Modal } from 'react-modal-construction-kit'
```

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `isOpen` | boolean | false | Open or close modal's state |
| `isRequired` | boolean | false | If enabled, the Modal's close button will not show and keyDown @ `escape` will not close the modal |
| `autoFocus` | boolean | undefined | autofocus the component on mount |
| `zIndex` | number | 750 | z-index value |
| `role` | string | 'dialog' | HTML5 `role` |
| `body` | React Node | undefined | The body of the modal |
| `header` | React Node | undefined | The header of the modal |
| `footer` | React Node | undefined | The footer of the modal |
| `closeButton` | function(onClosed) | undefined | If you want a custom close button with your own icon, use this function and return your custom component |
| `onOpened` | function | undefined | Called on when the Transitions triggers 'onOpened' |
| `onClosed` | function | undefined | Called on when the Transitions triggers 'onClosed' |
| `onEnter` | function | undefined | Called on `componentDidMount` |
| `onExit` | function | undefined | Called on `componentWillUnmount` | 
| `transition` | object | undefined | Configuration object for the transition |
| `transition.duration` | number | 300 | Duration of the animation |
| `transition.onEntered` | function(node, isAppearing) | undefined | - |
| `transition.onExited` | function(node) | undefined | - |
| `styling` | object | default styles | If you want to customize the look and feel, you need to change the values in this object |
| `style.borderRadius` | number | 0 | Border radius |
| `style.borderColor` | string | #fafafa | The color of the border, that devides the content, footer and header |
| `style.maxWidth` | number | 500 | Max width of the dialog |
| `style.isCentered` | boolean | true | Set to false if you don't want the modal to be centered by default |
| `style.backgroundColor` | string | white | Set the background color of the dialog |

## Overlay

```js
import { Overlay } from 'react-modal-construction-kit'
```

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `isVisible` | boolean | false | Shows or hides the overlay |
| `zIndex` | number | 500 | z-index value |
| `transitionDuration` | number | 150 | The duration of the transition |
| `opacity` | number | 0.7 | The opacity value when the overlay is fully visible |
| `backgroundColor` | string | black | The background color |

# License

MIT Licensed. Copyright (c) Mike Vercoelen 2018.
