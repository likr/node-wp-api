const angular = require('angular')

const AppComponent = {
  templateUrl: 'assets/html/app.component.html'
}

module.exports = angular
  .module('app.components.app', [])
  .component('wcApp', AppComponent)
  .name