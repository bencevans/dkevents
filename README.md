# dkevents

> Subscribe to a docker-engine event stream

## Dependencies

* Docker Engine
* Node.js 6+

## Install

    $ npm install dkevents --save

## Usage

```js
const DockerEvents = require('dkevents')

// Create client (defaults to local Docker Engine socket)
const client = new DockerEvents()

// Add listener on event
client.on('event', (evnt) => {
  console.log('event', evnt)
})

// Handle errors
client.on('error', (err) => {
  console.error(err)
})

// Disconnect...
// client.abort()
```

```js
// DOCK=$(docker run ubuntu)
// docker rm $DOCK
event: { status: 'create',
  id: 'fbbab2881086b65b1e367ad8927c425590d2704ff56c575c215bc784cc783052',
  from: 'ubuntu',
  Type: 'container',
  Action: 'create',
  Actor: 
   { ID: 'fbbab2881086b65b1e367ad8927c425590d2704ff56c575c215bc784cc783052',
     Attributes: { image: 'ubuntu', name: 'high_tesla' } },
  time: 1462152450,
  timeNano: '1462152450475828175' }
event: { status: 'destroy',
  id: 'fbbab2881086b65b1e367ad8927c425590d2704ff56c575c215bc784cc783052',
  from: 'ubuntu',
  Type: 'container',
  Action: 'destroy',
  Actor: 
   { ID: 'fbbab2881086b65b1e367ad8927c425590d2704ff56c575c215bc784cc783052',
     Attributes: { image: 'ubuntu', name: 'high_tesla' } },
  time: 1462152460,
  timeNano: '1462152460446697583' }

```

## Licence

MIT © [Ben Evans](http://bensbit.co.uk)

