const test = require('tape')
const DockerEvents = require('./')
const exec = require('child_process').exec

const dEvents = new DockerEvents()

var workingContainer = null

test('emits event on docker create', (t) => {
  t.plan(3)
  dEvents.once('event', (evnt) => {
    t.equals(evnt.status, 'create', 'emits event event')
  })
  dEvents.on('create', (evnt) => {
    t.ok(true, 'emits create event')
  })

  exec('docker create hello-world', (err, stdout, stderr) => {
    if (err) {
      t.error(err)
    }
    workingContainer = stdout
    t.ok(true, 'working container id returned via shell')
  })
})

test('emits event on docker rm', (t) => {
  t.plan(2)
  dEvents.on('event', (evnt) => {
    t.ok(true, 'emits event event')
  })
  dEvents.on('destroy', (evnt) => {
    t.ok(true, 'emits create event')
  })
  exec('docker rm -f ' + workingContainer, (err, stdout, stderr) => {
    if (err) {
      t.error(err)
    }
  })
})

test('diconnects', (t) => {
  dEvents.abort()
  t.end()
})
