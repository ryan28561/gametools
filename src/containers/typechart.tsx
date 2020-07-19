import React, { Component } from 'react'
import { GameMeta } from './gamechooser'
import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'

interface TCProps {
  game?: GameMeta
}

@observer
export default class TypeChart extends Component<TCProps, {}> {
  @observable newTypeVal: string = ''
  @observable types: Array<string> = []

  newType = e => {
    e.preventDefault()
    let newType = this.newTypeVal
    this.types.push(newType)
    this.newTypeVal = ''
    console.log(this.types)
    console.log(toJS(this.types))
  }

  onChange = e => {
    this.newTypeVal = e.target.value
  }

  render() {
    return (
      <div className="type-chart">
        <div className="controls">
          <form onSubmit={this.newType}>
            <div className="form-group">
              <label htmlFor="new-type">New Type</label>
              <input
                name="new-type"
                placeholder="Add a type"
                type="text"
                onChange={this.onChange}
                value={this.newTypeVal}
              />
            </div>
          </form>
        </div>
        <table className="chart">
          <thead>
            <tr>
              <th />
              {this.types.map(t => {
                return <th>{t}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.types.map(t => {
              return (
                <tr key={`type-row-${t}`}>
                  <td>{t}</td>
                {this.types.map(secondType => {
                    return <td>0</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
