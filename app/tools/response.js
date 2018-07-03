const debug = require('debug')('api:error');

function wrapper(res, promise) {
  return promise
    .then((data) => {
      if (!data) return res.status(404).send({ message: 'Not found.' });
      res.send(data);
    })
    .catch((err) => {
      debug(err);
      res.status(400).send({ message: err.message });
    });
}

module.exports = {
  wrapper
}