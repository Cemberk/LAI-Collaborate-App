"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_sas"],{

/***/ "./node_modules/refractor/lang/sas.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/sas.js ***!
  \********************************************/
/***/ ((module) => {



module.exports = sas;
sas.displayName = 'sas';
sas.aliases = [];

function sas(Prism) {
  Prism.languages.sas = {
    datalines: {
      pattern: /^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,
      alias: 'string',
      inside: {
        keyword: {
          pattern: /^(\s*)(?:(?:data)?lines|cards)/i,
          lookbehind: true
        },
        punctuation: /;/
      }
    },
    comment: [{
      pattern: /(^\s*|;\s*)\*.*;/m,
      lookbehind: true
    }, /\/\*[\s\S]+?\*\//],
    datetime: {
      // '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt
      pattern: /'[^']+'(?:dt?|t)\b/i,
      alias: 'number'
    },
    string: {
      pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/,
      greedy: true
    },
    keyword: /\b(?:data|else|format|if|input|proc\s\w+|quit|run|then|libname|set|output|options)\b/i,
    // Decimal (1.2e23), hexadecimal (0c1x)
    number: /\b(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,
    operator: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
    punctuation: /[$%@.(){}\[\];,\\]/
  };
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_sas.chunk.js.map