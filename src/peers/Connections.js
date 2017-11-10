import Peer from 'peerjs'
import randomstring from 'randomstring'

class Connections {

  constructor() {
    this.host = false
    this.peer = null
    this.opened = false
    this.id = null
    this.connections = []
  }

  _initializePeer() {
    this.id = randomstring.generate(5)
    this.peer = new Peer(this.id, {key: '86tco3u7cf03sor'})
  }

  startHost(changeState) {
    this.host = true
    this._initializePeer()
    this.peer.on('connection', this._onConnection(changeState).bind(this))
  }

  _onConnection(changeState) {
    return function(conn)  {
      this.connections.push({id: conn.id, conn: conn})
      conn.on('data', data => {
        console.log('-*-receive action:', data)
        changeState(data)
      })
    }
  }

  join(id) {
    this.host = false
    this._initializePeer()
    const conn = this.peer.connect(id)
    this.connections.push({ id, conn })
    this.peer.on('open', this._onOpen.bind(this))
  }

  sendToHost(action) {
    this.connections.map(({ conn }) => {
      console.log('-*-send action:', action)
      conn.on('open', () => conn.send({action: action}))
    })
  }

  _onOpen() {
    this.opened = true
  }

  getId() {
    return this.id
  }

  isHost() {
    return this.host
  }

  getGuestConnections() {
    return this.connections || [];
  }

}

export default new Connections()