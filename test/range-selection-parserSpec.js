describe('service rangeSelectionParser', function () {
  var service;

  beforeEach(module('range-selection-parser'));
  beforeEach(inject(function(rangeSelectionParser) {
    service = rangeSelectionParser;
  }));

  describe('Method parseSelectionString', function () {
    it('should parse selection string', function () {
      var tests = [
        { result: [4, 5, 6],
          strings: [
            '4     -   6',
            'foo4-6',
            '4 -6-'
          ]
        },
        { result: [3, 6, 7, 8, 9],
          strings: [ '3, 6-9' ]},
        { result: [],
          strings: [
            'foo',
            'bar'
          ]
        },
        { result: [0, 1, 2, 3, 4, 5],
          strings: [
            '0- 5',
            '0-5'
          ]
        },
        { result: [1, 2, 3, 7, 8],
          strings: [
            '1-3 7-8',
            '1 - 3, 7 - 8',
            '  1 - 3.  7-8',
            '1 - 3, 7 - 8'
          ]
        },
        { result: [0, 5, 6, 7, 9],
          strings: [
            '0, 5-7, 9',
            'foo0 5   -7x9']
        }
      ];

      _.each(tests, function(test) {
        _.each(test.strings, function(str) {
          expect(service.parseSelectionString(str)).toEqual(test.result);
        });
      });

      expect(service.parseSelectionString(' 0 ,  5- 9 13')).toEqual([0, 5, 6, 7, 8, 9, 13]);


    })
  });

  describe('Method selectFromArray', function () {
    it('should parse selection string and select corresponding items from array', function() {
      var sampleArray = ['foo', 'bar', 'baz', 'bay', 'bax', 'baq']
        , tests = [
          { result: ['foo', 'bay', 'bax', 'baq'],
            strings: [
              '1,4-',
              '  1  4 -',
              ' 1,foo4-']
          },
          { result: ['bay', 'bax', 'baq'],
            strings: [
              '4     -   6',
              'foo4-6',
              '4 -6-'
            ]
          },
          { result: [],
            strings: [
              'foo',
              'bar'
            ]
          },
          { result: ['foo', 'bar', 'baz', 'bay', 'bax'],
            strings: [
              '0- 5',
              '0-5'
            ]
          },
          { result: ['foo', 'baz', 'bay', 'bax'],
            strings: [
              '1, 3-5',
              '1 ,  3  -5',
              'foo1,3-5'
            ]
          }
        ];

      _.each(tests, function(test) {
        _.each(test.strings, function(str) {
          expect(service.selectFromArray(sampleArray, str)).toEqual(test.result);
        });
      });

      expect(service.selectFromArray(['a', 'b', 'c', 'd', 'e'], '1-3, 5'))
        .toEqual(['a', 'b', 'c', 'e']);
      expect(service.selectFromArray(['aa', 'bb', 'cc', 'dd'], '2-'))
        .toEqual(['bb', 'cc', 'dd']);
    });
  });

});
