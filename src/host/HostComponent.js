import React, { Component } from 'react'

import Connections from '../peers/Connections'

class HostComponent extends Component {

  constructor() {
    super()
    Connections.startHost(this.changeState.bind(this))

    this.state = {
      id: Connections.getId(),
      data: ''
    }
  }

  changeState({ action }) {
    this.setState({ data: action })
  }

  render() {
    return (
      <div>
        <h1>host</h1>
        <h2>{this.state.id}</h2>
        <span>{this.state.data}</span>
      </div>
    )
  }
}

export default HostComponent
