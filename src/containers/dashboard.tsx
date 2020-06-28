import React, { Component } from 'react'


interface DProps {
  gameId?: number
}

export default class Dashboard extends React.Component<DProps, {}> {
  render() {
    return <div className="dashboard"/>
  }
}
