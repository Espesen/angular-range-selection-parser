// NB! REQUIRES UNDERSCORE TO BE EXPOSED IN WINDOW //
angular.module('range-selection-parser', [])
  .factory('rangeSelectionParser', [function() {

    function parse(str, array) {
      var selection = []
        , rangeRegExp = /(\d+)\s*-\s*(\d+)/g
        , openRangeRegExp = /(\d+)\s*-$/
        , singleItemRegExp = /(\d+)/g
        , rangeStart
        , rangeEnd
        , singleItem
        , pickFromArray = array instanceof Array
        , arrayLength = pickFromArray ? array.length : null
        , i;

      // find all ranges
      while (rangeRegExp.exec(str)) {
        rangeStart = parseInt(RegExp.$1, 10);
        rangeEnd = parseInt(RegExp.$2, 10);

        if (!isNaN(rangeStart) && rangeEnd && rangeEnd > rangeStart) {
          for (i = rangeStart; i < rangeEnd + 1; i++) {
            selection.push(i);
          }
        }
      }

  //  find open range

      if (pickFromArray && openRangeRegExp.exec(str)) {
        rangeStart = parseInt(RegExp.$1, 10);
        if (!isNaN(rangeStart) && rangeStart < arrayLength + 1) {
          for (i = rangeStart; i < arrayLength + 1; i++) {
            selection.push(i);
          }
        }
      }

      // find single items
      while (singleItemRegExp.exec(str)) {
        singleItem = parseInt(RegExp.$1, 10);
        if (!isNaN(singleItem) && !_.contains(selection, singleItem)) selection.push(singleItem);
      }

      return pickFromArray ?
        _.filter(array, function(val, index) {
          return _.contains(selection, index + 1); }) :
        _.sortBy(selection, function(num) { return num; });
    }

    return {

      parseSelectionString: function(str) {
        return parse(str);
      },

      selectFromArray: function(array, str) {
        return parse(str, array);
      }

    };
  }]);

