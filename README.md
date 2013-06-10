range-selection-parser
======================

AngularJS module to parse range selection strings from user input, for example '2, 5, 7-9'.


**Example:**

Clone the repo and point your browser to ```example/example.html```

**Usage:**

Inject service ```rangeSelectionParser``` to your controller and then

```

rangeSelectionParser.parseSelectionString('3, 6-9');
  // => [3, 6, 7, 8, 9]

rangeSelectionParser.selectFromArray(['a', 'b', 'c', 'd', 'e'], '1-3, 5');
  // => ['a', 'b', 'c', 'e']

rangeSelectionParser.selectFromArray(['aa', 'bb', 'cc', 'dd'], '2-');
  // => ['bb', 'cc', 'dd']
```

Parser is very forgiving:

```
rangeSelectionParser.parseSelectionString(' 0 ,  5- 9 13');
  // => [0, 5, 6, 7, 8, 9, 13]
```

**Testing**

Run tests on command line with Karma

```
karma start
```


