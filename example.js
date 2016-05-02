const DockerEvents = require('./')

const dEvents = new DockerEvents()
dEvents.on('event', (evnt) => {
  console.log('event:', evnt)
})
dEvents.on('error', (err) => {
  console.error(err)
})
