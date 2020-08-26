const app = require('./app');
let server;

if(process.env.NODE_ENV === 'production'){
  /* INITIALIZE PRODUCTION SERVER */
  const
    fs = require('fs'),
    {TLS_CERT_PATH, PRODUCTION_URL} = require('./env');

  const https = require('https').createServer({
    key:  fs.readFileSync(`${TLS_CERT_PATH}/privkey.pem`),
    cert: fs.readFileSync(`${TLS_CERT_PATH}/cert.pem`),
    ca:   fs.readFileSync(`${TLS_CERT_PATH}/chain.pem`),
  }, app);

  server = https.listen(443, () => {
    console.log('ExpressJS started on port 443');
  });

  //Start an HTTP redirector
  const http = require('http').createServer((req,res) => {
    res.writeHead(302, { Location: PRODUCTION_URL });
    res.end();
  });
  http.listen(80, () => {
    console.log('Redirector started on port 80');
  });

} else {
  /* INITIALIZE DEVELOPMENT SERVER */

  server = app.listen(3000, () => {
    console.log('Server is up on port 3000');
  });

}

const initSocket = require('./socket/init');
initSocket(server);
