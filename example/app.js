angular.module('exampleApp', ['range-selection-parser'])
  .controller('InputController', ['$scope', 'rangeSelectionParser', function($scope, rangeSelectionParser) {

    $scope.userInput = '1, 3 - 6';

    $scope.exampleArray = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg'];

    $scope.$watch('userInput', function(value) {
      $scope.filteredArray = rangeSelectionParser.selectFromArray($scope.exampleArray, value);
      $scope.parsedString = rangeSelectionParser.parseSelectionString(value);
    });

}]);

