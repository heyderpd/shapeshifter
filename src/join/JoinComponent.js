import React, { Component } from 'react'

import Connections from '../peers/Connections'

const conn = new Connections()

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

  changeState(data) {
    this.setState({ data })
  }

  startJoin() {
    conn
      .join(this.state.joinTo)
      .setOnData(this.changeState.bind(this))
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
          <button onClick={() => conn.send('xabla')}>send xabla</button>
          <input value={this.state.data}/>
        </div>
      </div>
    )
  }
}

export default JoinComponent
