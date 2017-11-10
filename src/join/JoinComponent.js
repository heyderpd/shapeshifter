import React, { Component } from 'react'

import Connections from '../peers/Connections'


class JoinComponent extends Component {

  constructor() {
    super()
    this.state = {
      joinTo: '',
      data: ''
    }
  }

  changeJoinTo(e) {
    this.setState({
      joinTo: e.target.value
    })
  }

  changeState({ action }) {
    this.setState({ data: action })
  }

  startJoin() {
    Connections.join(this.state.joinTo)
    Connections.setListener(this.changeState.bind(this))
  }

  render() {
    return (
      <div>
        <h1>join</h1>
        <div>
          <input value={this.state.joinTo} onChange={e => this.changeJoinTo(e)} />
          <button onClick={() => this.startJoin()}>JOIN</button>
        </div>
        <br/>
        <div>
          <button onClick={() => Connections.sendToHost('xabla')}>send xabla</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default JoinComponent
