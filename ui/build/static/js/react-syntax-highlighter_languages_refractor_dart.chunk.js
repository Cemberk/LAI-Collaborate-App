"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_dart"],{

/***/ "./node_modules/refractor/lang/dart.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/dart.js ***!
  \*********************************************/
/***/ ((module) => {



module.exports = dart;
dart.displayName = 'dart';
dart.aliases = [];

function dart(Prism) {
  Prism.languages.dart = Prism.languages.extend('clike', {
    string: [{
      pattern: /r?("""|''')[\s\S]*?\1/,
      greedy: true
    }, {
      pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    }],
    keyword: [/\b(?:async|sync|yield)\*/, /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|external|extends|factory|final|finally|for|get|if|implements|import|in|library|new|null|operator|part|rethrow|return|set|static|super|switch|this|throw|try|typedef|var|void|while|with|yield)\b/],
    operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
  });
  Prism.languages.insertBefore('dart', 'function', {
    metadata: {
      pattern: /@\w+/,
      alias: 'symbol'
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_dart.chunk.js.map