'use strict';

angular.module('sportium.parser', [
  'sportium.parser.sport',
  'sportium.parser.sport.validation',
  'sportium.parser.sport.format'
])
.value('version', '0.1');
