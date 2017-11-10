import React, { Component } from 'react'

import Connections from '../peers/Connections'

class HostComponent extends Component {

  constructor() {
    super()
    Connections.startHost()
    Connections.setListener(this.changeState.bind(this))

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
        <br/>
        <div>
          <button onClick={() => Connections.sendToHost('uala')}>send uala</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default HostComponent
