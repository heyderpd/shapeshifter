import React, { Component } from 'react'

import Connections from '../peers/Connections'

const conn = new Connections()

class HostComponent extends Component {

  constructor() {
    super()
    conn
      .host()
      .setOnData(this.changeState.bind(this))

    this.state = {
      id: conn.getId(),
      data: ''
    }
  }

  changeState(data) {
    this.setState({ data })
  }

  render() {
    return (
      <div>
        <h1>host</h1>
        <h2>{this.state.id}</h2>
        <br/>
        <div>
          <button onClick={() => conn.send('uala')}>send uala</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default HostComponent
