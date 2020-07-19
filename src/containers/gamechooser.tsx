import React, { Component } from 'react'
import { toJS, autorun, observable } from 'mobx'
import { observer } from 'mobx-react'

import Dashboard from './dashboard'
import NewGame from 'gt_components/newGame'

export interface GameMeta {
  name: string
  icon?: string
  id: number
}

@observer
export default class GameChooser extends Component<{}, {}> {
  @observable games: Array<GameMeta> = []
  @observable currentGame: number = 0
  @observable nextId: number = 0
  @observable newGame: boolean = false
  dispose = null

  constructor(props) {
    super(props)
    const statestr = localStorage.getItem('game-chooser-state')
    if (statestr) {
      const state = JSON.parse(statestr)
      this.games = state.games
      this.currentGame = state.currentGame
      this.nextId = state.nextId
      this.newGame = state.newGame
    }
  }

  componentDidMount() {
    this.dispose = autorun(() => {
      const state = {
        games: toJS(this.games),
        currentGame: toJS(this.currentGame),
        nextId: toJS(this.nextId),
        newGame: toJS(this.newGame),
      }
      localStorage.setItem('game-chooser-state', JSON.stringify(state))
    })
  }

  componentWillUnmount() {
    this.dispose()
  }

  addGame = (name: string) => {
    this.games.push({ name: name, icon: null, id: this.nextId })
    this.newGame = false
    this.nextId += 1
  }

  changeGame: (id: number) => () => void = id => {
    return () => {
      this.currentGame = id
    }
  }

  render() {
    return (
      <>
        <div className="game-chooser">
          {this.games.map((game, idx) => {
            return (
              <button
                key={`game-button-${game.id}`}
                className={`game-button ${
                  game.id == this.currentGame ? 'active' : ''
                }`}
                onClick={this.changeGame(game.id)}
              >
                {game.icon ? <img src={game.icon} /> : idx}
              </button>
            )
          })}
          <button className="game-button" onClick={() => (this.newGame = true)}>
            +
          </button>
        </div>
        <Dashboard game={this.games.find(g => g.id == this.currentGame)} />
        <NewGame
          show={this.newGame}
          save={this.addGame}
          cancel={() => (this.newGame = false)}
        />
      </>
    )
  }
}
