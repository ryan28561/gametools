import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Dashboard from './dashboard'

interface GameMeta {
  name: string
  icon?: string
  id: number
}

export default class GameChooser extends Component<{}, {}> {
  @observable games: Array<GameMeta> = []
  @observable currentGame: number = 0
  @observable nextId: number = 0

  constructor() {
    super()
    const statestr = localStorage.getItem('game-chooser-state')
    if (statestr) {
      const state = JSON.parse(statestr)
      this.games = state.games
      this.currentGame = state.currentGame
      this.nextId = state.nextId
    }
  }


  render() {
    return (
      <>
        <div className="game-chooser">
          {this.games.map((game, idx) => {
            <button className={`game-button ${game.id == this.currentGame ? 'active': ''}`}>
              {game.icon ? <img src={game.icon} /> : idx }
            </button>
          })}
          <button className="game-button">
            +
          </button>
        </div>
        <Dashboard />
      </>
    )
  }
}
