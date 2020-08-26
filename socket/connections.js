const CONNECTIONS = {};

exports.sendEvent = function (event, id, data) {
  const ws = CONNECTIONS[id];
  if(!ws)
    throw Error(`WebSocket for User(${id}) is unavailable.`);
  ws.send(JSON.stringify({ event, data }));
}

const HANDLERS = require('./events');

exports.registerSocket = function (id, ws) {

  CONNECTIONS[id] = ws;
  HANDLERS.USER_ONLINE(id);

  ws.on('close', () => {
    HANDLERS.USER_OFFLINE(id);
    delete CONNECTIONS[id];
  });

  ws.on('message', str => {
    if(!str) return;
    const obj = JSON.parse(str);
    if(!obj || !obj.event) return;

    console.log(`ws:${obj.event}:${id}`);

    const handler = HANDLERS[obj.event];
    if(!handler) return;

    handler(id, obj.data || {}).catch(err => {
      console.error(`Event from User(${id}) failed:`, err);
    });

  });
}
