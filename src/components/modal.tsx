import React, { Component } from 'react'

interface MProps {
  show?: boolean
}

export default class Modal extends Component<MProps, {}> {
  render() {
    return (
      <div className={`modal-wrap ${this.props.show ? '' : 'hide'}`}>
        <div className="modal">{this.props.children}</div>
      </div>
    )
  }
}
