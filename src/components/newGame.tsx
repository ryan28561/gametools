import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Modal from './modal'

interface NGProps {
  show: boolean
  save: (name: string) => void
  cancel: () => void
}

@observer
export default class NewGame extends Component<NGProps, {}> {
  @observable name: string = ''

  submit = e => {
    e.preventDefault()
    if (this.name != '') {
      this.props.save(this.name)
      this.name = ''
    }
  }

  cancel = () => {
    this.name = ''
    this.props.cancel()
  }

  onChange = e => {
    this.name = e.target.value
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <form onSubmit={this.submit} >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" onChange={this.onChange} name="name" placeholder="Enter a Name" />
          </div>
          <div className="action-buttons">
            <button type="button" onClick={this.cancel}>Cancel</button>
            <button type="submit">Add Game</button>
          </div>
        </form>
      </Modal>
    )
  }
}
