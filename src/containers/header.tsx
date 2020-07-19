import React, { Component } from 'react'

interface HProps {
  name: string
}

export default class Header extends Component<HProps, {}> {
  render() {
    return <div className="header">{this.props.name}</div>
  }
}
