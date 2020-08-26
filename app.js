const express = require('express');

require('./mongoose/models');
require('./mongoose/init');


const app = express();

app.use( require('./util/logger') );
app.use( express.json() );
app.use( require('./api/routes') );
app.use( express.static('__public__', { extensions: ['html'] }) );


module.exports = app;
