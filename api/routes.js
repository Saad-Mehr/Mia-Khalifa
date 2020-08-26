const ROUTES = {

  GET: {

  },

  POST: {

    '/login': require('./login'),
    '/register': require('./register')

  },

  PUT: {},

  DELETE: {}

};


const router = require('express').Router();

for(const [method,endpoints] of Object.entries(ROUTES)){
  for(const [path,handlers] of Object.entries(endpoints)){

    router[method.toLowerCase()](path, handlers);

  }
}

module.exports = router;
