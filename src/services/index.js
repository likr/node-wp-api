const angular = require('angular')
const PostService = require('./post.service')

module.exports = angular
  .module('app.services', [
    PostService
  ])
  .name