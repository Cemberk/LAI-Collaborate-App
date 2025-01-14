"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_sass"],{

/***/ "./node_modules/refractor/lang/sass.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/sass.js ***!
  \*********************************************/
/***/ ((module) => {



module.exports = sass;
sass.displayName = 'sass';
sass.aliases = [];

function sass(Prism) {
  ;

  (function (Prism) {
    Prism.languages.sass = Prism.languages.extend('css', {
      // Sass comments don't need to be closed, only indented
      comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: true
      }
    });
    Prism.languages.insertBefore('sass', 'atrule', {
      // We want to consume the whole line
      'atrule-line': {
        // Includes support for = and + shortcuts
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: {
          atrule: /(?:@[\w-]+|[+=])/m
        }
      }
    });
    delete Prism.languages.sass.atrule;
    var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
    var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
      pattern: /(\s+)-(?=\s)/,
      lookbehind: true
    }];
    Prism.languages.insertBefore('sass', 'property', {
      // We want to consume the whole line
      'variable-line': {
        pattern: /^[ \t]*\$.+/m,
        inside: {
          punctuation: /:/,
          variable: variable,
          operator: operator
        }
      },
      // We want to consume the whole line
      'property-line': {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
          property: [/[^:\s]+(?=\s*:)/, {
            pattern: /(:)[^:\s]+/,
            lookbehind: true
          }],
          punctuation: /:/,
          variable: variable,
          operator: operator,
          important: Prism.languages.sass.important
        }
      }
    });
    delete Prism.languages.sass.property;
    delete Prism.languages.sass.important; // Now that whole lines for other patterns are consumed,
    // what's left should be selectors

    Prism.languages.insertBefore('sass', 'punctuation', {
      selector: {
        pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
        lookbehind: true
      }
    });
  })(Prism);
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_sass.chunk.js.map