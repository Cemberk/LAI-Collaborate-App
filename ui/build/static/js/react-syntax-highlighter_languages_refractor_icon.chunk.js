"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_icon"],{

/***/ "./node_modules/refractor/lang/icon.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/icon.js ***!
  \*********************************************/
/***/ ((module) => {



module.exports = icon;
icon.displayName = 'icon';
icon.aliases = [];

function icon(Prism) {
  Prism.languages.icon = {
    comment: /#.*/,
    string: {
      pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
      greedy: true
    },
    number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
    'builtin-keyword': {
      pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
      alias: 'variable'
    },
    directive: {
      pattern: /\$\w+/,
      alias: 'builtin'
    },
    keyword: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
    function: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
    operator: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
    punctuation: /[\[\](){},;]/
  };
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_icon.chunk.js.map