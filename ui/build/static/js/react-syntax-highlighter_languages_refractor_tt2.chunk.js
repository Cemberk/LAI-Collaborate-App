"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_tt2"],{

/***/ "./node_modules/refractor/lang/markup-templating.js":
/*!**********************************************************!*\
  !*** ./node_modules/refractor/lang/markup-templating.js ***!
  \**********************************************************/
/***/ ((module) => {



module.exports = markupTemplating;
markupTemplating.displayName = 'markupTemplating';
markupTemplating.aliases = [];

function markupTemplating(Prism) {
  ;

  (function (Prism) {
    /**
     * Returns the placeholder for the given language id and index.
     *
     * @param {string} language
     * @param {string|number} index
     * @returns {string}
     */
    function getPlaceholder(language, index) {
      return '___' + language.toUpperCase() + index + '___';
    }

    Object.defineProperties(Prism.languages['markup-templating'] = {}, {
      buildPlaceholders: {
        /**
         * Tokenize all inline templating expressions matching `placeholderPattern`.
         *
         * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
         * `true` will be replaced.
         *
         * @param {object} env The environment of the `before-tokenize` hook.
         * @param {string} language The language id.
         * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
         * @param {(match: string) => boolean} [replaceFilter]
         */
        value: function (env, language, placeholderPattern, replaceFilter) {
          if (env.language !== language) {
            return;
          }

          var tokenStack = env.tokenStack = [];
          env.code = env.code.replace(placeholderPattern, function (match) {
            if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
              return match;
            }

            var i = tokenStack.length;
            var placeholder; // Check for existing strings

            while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) ++i; // Create a sparse array


            tokenStack[i] = match;
            return placeholder;
          }); // Switch the grammar to markup

          env.grammar = Prism.languages.markup;
        }
      },
      tokenizePlaceholders: {
        /**
         * Replace placeholders with proper tokens after tokenizing.
         *
         * @param {object} env The environment of the `after-tokenize` hook.
         * @param {string} language The language id.
         */
        value: function (env, language) {
          if (env.language !== language || !env.tokenStack) {
            return;
          } // Switch the grammar back


          env.grammar = Prism.languages[language];
          var j = 0;
          var keys = Object.keys(env.tokenStack);

          function walkTokens(tokens) {
            for (var i = 0; i < tokens.length; i++) {
              // all placeholders are replaced already
              if (j >= keys.length) {
                break;
              }

              var token = tokens[i];

              if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                var k = keys[j];
                var t = env.tokenStack[k];
                var s = typeof token === 'string' ? token : token.content;
                var placeholder = getPlaceholder(language, k);
                var index = s.indexOf(placeholder);

                if (index > -1) {
                  ++j;
                  var before = s.substring(0, index);
                  var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                  var after = s.substring(index + placeholder.length);
                  var replacement = [];

                  if (before) {
                    replacement.push.apply(replacement, walkTokens([before]));
                  }

                  replacement.push(middle);

                  if (after) {
                    replacement.push.apply(replacement, walkTokens([after]));
                  }

                  if (typeof token === 'string') {
                    tokens.splice.apply(tokens, [i, 1].concat(replacement));
                  } else {
                    token.content = replacement;
                  }
                }
              } else if (token.content
              /* && typeof token.content !== 'string' */
              ) {
                walkTokens(token.content);
              }
            }

            return tokens;
          }

          walkTokens(env.tokens);
        }
      }
    });
  })(Prism);
}

/***/ }),

/***/ "./node_modules/refractor/lang/tt2.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/tt2.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var refractorMarkupTemplating = __webpack_require__(/*! ./markup-templating.js */ "./node_modules/refractor/lang/markup-templating.js");

module.exports = tt2;
tt2.displayName = 'tt2';
tt2.aliases = [];

function tt2(Prism) {
  Prism.register(refractorMarkupTemplating);

  (function (Prism) {
    Prism.languages.tt2 = Prism.languages.extend('clike', {
      comment: /#.*|\[%#[\s\S]*?%\]/,
      keyword: /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|TAGS|THROW|TRY|SWITCH|UNLESS|USE|WHILE|WRAPPER)\b/,
      punctuation: /[[\]{},()]/
    });
    Prism.languages.insertBefore('tt2', 'number', {
      operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|or|not)\b/,
      variable: {
        pattern: /[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*/i
      }
    });
    Prism.languages.insertBefore('tt2', 'keyword', {
      delimiter: {
        pattern: /^(?:\[%|%%)-?|-?%]$/,
        alias: 'punctuation'
      }
    });
    Prism.languages.insertBefore('tt2', 'string', {
      'single-quoted-string': {
        pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
        greedy: true,
        alias: 'string'
      },
      'double-quoted-string': {
        pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
        greedy: true,
        alias: 'string',
        inside: {
          variable: {
            pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i
          }
        }
      }
    }); // The different types of TT2 strings "replace" the C-like standard string

    delete Prism.languages.tt2.string;
    Prism.hooks.add('before-tokenize', function (env) {
      var tt2Pattern = /\[%[\s\S]+?%\]/g;
      Prism.languages['markup-templating'].buildPlaceholders(env, 'tt2', tt2Pattern);
    });
    Prism.hooks.add('after-tokenize', function (env) {
      Prism.languages['markup-templating'].tokenizePlaceholders(env, 'tt2');
    });
  })(Prism);
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_tt2.chunk.js.map