const ENV = process.env.NODE_ENV || 'development';

module.exports = require(`./envs/${ENV}`);