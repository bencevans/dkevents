if (process.env.NODE_ENV !== 'production') {
  require('longjohn')
}

const request = require('request')
const JSONStream = require('JSONStream')
const es = require('event-stream')
const EventEmitter = require('events')

class DockerEvents extends EventEmitter {
  constructor () {
    super()
    let emitter = this
    let jsonStream = JSONStream.parse()
    jsonStream.on('error', (err) => {
      return emitter.emit('error', err)
    })

    this.modem = request('http://unix:/var/run/docker.sock:/events')
    .on('error', (err) => {
      emitter.emit('error', err)
    })

    this.modem
    .pipe(JSONStream.parse())
    .pipe(es.map((evnt) => {
      emitter.emit('event', evnt)
      if (evnt.status) {
        emitter.emit(evnt.status, evnt)
      }
    }))
  }

  abort () {
    this.modem.abort()
  }

}

module.exports = DockerEvents
