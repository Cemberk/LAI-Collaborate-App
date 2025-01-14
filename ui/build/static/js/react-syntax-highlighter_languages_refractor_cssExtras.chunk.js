"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_cssExtras"],{

/***/ "./node_modules/refractor/lang/css-extras.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/css-extras.js ***!
  \***************************************************/
/***/ ((module) => {



module.exports = cssExtras;
cssExtras.displayName = 'cssExtras';
cssExtras.aliases = [];

function cssExtras(Prism) {
  Prism.languages.css.selector = {
    pattern: Prism.languages.css.selector,
    inside: {
      'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      'pseudo-class': /:[-\w]+/,
      class: /\.[-:.\w]+/,
      id: /#[-:.\w]+/,
      attribute: {
        pattern: /\[(?:[^[\]"']|("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1)*\]/,
        greedy: true,
        inside: {
          punctuation: /^\[|\]$/,
          'case-sensitivity': {
            pattern: /(\s)[si]$/i,
            lookbehind: true,
            alias: 'keyword'
          },
          namespace: {
            pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
            lookbehind: true,
            inside: {
              punctuation: /\|$/
            }
          },
          attribute: {
            pattern: /^(\s*)[-\w\xA0-\uFFFF]+/,
            lookbehind: true
          },
          value: [/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, {
            pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/,
            lookbehind: true
          }],
          operator: /[|~*^$]?=/
        }
      },
      'n-th': [{
        pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
        lookbehind: true,
        inside: {
          number: /[\dn]+/,
          operator: /[+-]/
        }
      }, {
        pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
        lookbehind: true
      }],
      punctuation: /[()]/
    }
  };
  Prism.languages.insertBefore('css', 'property', {
    variable: {
      pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
      lookbehind: true
    }
  });
  Prism.languages.insertBefore('css', 'function', {
    operator: {
      pattern: /(\s)[+\-*\/](?=\s)/,
      lookbehind: true
    },
    hexcode: /#[\da-f]{3,8}/i,
    entity: /\\[\da-f]{1,8}/i,
    unit: {
      pattern: /(\d)(?:%|[a-z]+)/,
      lookbehind: true
    },
    number: /-?[\d.]+/
  });
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_cssExtras.chunk.js.map