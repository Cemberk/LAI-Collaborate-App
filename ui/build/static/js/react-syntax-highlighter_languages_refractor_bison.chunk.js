"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_bison"],{

/***/ "./node_modules/refractor/lang/bison.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/bison.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var refractorC = __webpack_require__(/*! ./c.js */ "./node_modules/refractor/lang/c.js");

module.exports = bison;
bison.displayName = 'bison';
bison.aliases = [];

function bison(Prism) {
  Prism.register(refractorC);
  Prism.languages.bison = Prism.languages.extend('c', {});
  Prism.languages.insertBefore('bison', 'comment', {
    bison: {
      // This should match all the beginning of the file
      // including the prologue(s), the bison declarations and
      // the grammar rules.
      pattern: /^[\s\S]*?%%[\s\S]*?%%/,
      inside: {
        c: {
          // Allow for one level of nested braces
          pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
          inside: {
            delimiter: {
              pattern: /^%?\{|%?\}$/,
              alias: 'punctuation'
            },
            'bison-variable': {
              pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
              alias: 'variable',
              inside: {
                punctuation: /<|>/
              }
            },
            rest: Prism.languages.c
          }
        },
        comment: Prism.languages.c.comment,
        string: Prism.languages.c.string,
        property: /\S+(?=:)/,
        keyword: /%\w+/,
        number: {
          pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i,
          lookbehind: true
        },
        punctuation: /%[%?]|[|:;\[\]<>]/
      }
    }
  });
}

/***/ }),

/***/ "./node_modules/refractor/lang/c.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/c.js ***!
  \******************************************/
/***/ ((module) => {



module.exports = c;
c.displayName = 'c';
c.aliases = [];

function c(Prism) {
  Prism.languages.c = Prism.languages.extend('clike', {
    'class-name': {
      pattern: /(\b(?:enum|struct)\s+)\w+/,
      lookbehind: true
    },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
  });
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      // allow for multiline macro definitions
      // spaces after the # character compile fine with gcc
      pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: true,
      alias: 'property',
      inside: {
        // highlight the path of the include statement as a string
        string: {
          pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
          lookbehind: true
        },
        // highlight macro directives as keywords
        directive: {
          pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
          lookbehind: true,
          alias: 'keyword'
        }
      }
    },
    // highlight predefined macros as constants
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
  });
  delete Prism.languages.c['boolean'];
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_bison.chunk.js.map