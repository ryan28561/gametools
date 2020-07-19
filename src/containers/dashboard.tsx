import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { GameMeta } from './gamechooser'
import TypeChart from './typechart'

import Header from './header'

interface DProps {
  game?: GameMeta
}

@observer
export default class Dashboard extends React.Component<DProps, {}> {

  render() {
    return (
      <div className="dashboard">
        <Header name={this.props.game? this.props.game.name : "New Game"} />
        <TypeChart game={this.props.game} />
      </div>
    )
  }
}
