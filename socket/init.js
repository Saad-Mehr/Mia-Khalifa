const
  WebSocket   = require('ws'),
  cookie      = require('cookie'),
  verifyToken = require('../auth/verify-token'),
  { registerSocket } = require('./connections');


module.exports = function initSocket (server) {

  /* Initialize the WebSocket server to handle new connections */
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws, req) => {
    try {

      const cookies = cookie.parse(req.headers.cookie || '');
      if(!cookies || !cookies.authorization)
        throw Error('Bad Request: Authorization cookie is required');

      /* Verify the token, extract UserID (throws if invalid) */
      const token = cookies.authorization;
      const { _id } = await verifyToken(token);
      if(!_id) throw Error('Token did not contain _id');

      registerSocket(_id, ws);

    } catch(err) {
      console.log('Failed to validate WebSocket, closing:', err);
      ws.terminate();
    }
  });
};
