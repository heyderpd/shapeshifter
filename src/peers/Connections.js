import Peer from 'peerjs'
import randomstring from 'randomstring'

class Connections {

  constructor() {
    this.host = false
    this.peer = null
    this.opened = false
    this.id = null
    this.connections = []
    this.listener
  }

  _initializePeer() {
    this.id = randomstring.generate(5)
    this.peer = new Peer(this.id, { key: '86tco3u7cf03sor' })
  }

  startHost() {
    this.host = true
    this._initializePeer()
    this.peer.on('connection', this._onConnection.bind(this))
  }

  setListener(listener) {
    this.listener = listener
  }

  _safeListener(conn) {
    return function(data) {
      console.log('-*-data', data)
      if (typeof(this.listener) === 'function') {
        this.listener(data)
      }
    }
  }

  _onConnection(conn)  {
    console.log('-*-conn', conn)
    this.connections.push({ id: conn.id, conn })
    conn.on('data', this._safeListener(conn).bind(this))
  }

  join(id) {
    this.host = false
    this._initializePeer()
    const conn = this.peer.connect(id)
    this.peer.on('open', this._onOpen.bind(this))
    this.peer.on('close', console.log('-*-close'))
    this.peer.on('error', console.log('-*-error'))
    this._onConnection(conn)
  }

  sendToHost(action) {
    console.log('-*-send', action)
    this.connections.map(({ conn }) => conn.send({ action: action }))
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