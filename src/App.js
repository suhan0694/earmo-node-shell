const lineReplace = require('line-replace');

lineReplace({
    file: 'src/RefactoringStandarStudyAndroid.prop',
    line: 3,
    text: 'Answer to the Ultimate Question of Life, the Universe, and Everything else.',
    addNewLine: true,
    callback: ({file, line, text, replacedText}) => {}
  })