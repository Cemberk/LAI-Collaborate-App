"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_tsx"],{

/***/ "./node_modules/refractor/lang/jsx.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/jsx.js ***!
  \********************************************/
/***/ ((module) => {



module.exports = jsx;
jsx.displayName = 'jsx';
jsx.aliases = [];

function jsx(Prism) {
  ;

  (function (Prism) {
    var javascript = Prism.util.clone(Prism.languages.javascript);
    Prism.languages.jsx = Prism.languages.extend('markup', javascript);
    Prism.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i;
    Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/i;
    Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i;
    Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
    Prism.languages.insertBefore('inside', 'attr-name', {
      spread: {
        pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
        inside: {
          punctuation: /\.{3}|[{}.]/,
          'attr-value': /\w+/
        }
      }
    }, Prism.languages.jsx.tag);
    Prism.languages.insertBefore('inside', 'attr-value', {
      script: {
        // Allow for two levels of nesting
        pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
        inside: {
          'script-punctuation': {
            pattern: /^=(?={)/,
            alias: 'punctuation'
          },
          rest: Prism.languages.jsx
        },
        alias: 'language-javascript'
      }
    }, Prism.languages.jsx.tag); // The following will handle plain text inside tags

    var stringifyToken = function (token) {
      if (!token) {
        return '';
      }

      if (typeof token === 'string') {
        return token;
      }

      if (typeof token.content === 'string') {
        return token.content;
      }

      return token.content.map(stringifyToken).join('');
    };

    var walkTokens = function (tokens) {
      var openedTags = [];

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var notTagNorBrace = false;

        if (typeof token !== 'string') {
          if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
            // We found a tag, now find its kind
            if (token.content[0].content[0].content === '</') {
              // Closing tag
              if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                // Pop matching opening tag
                openedTags.pop();
              }
            } else {
              if (token.content[token.content.length - 1].content === '/>') {// Autoclosed tag, ignore
              } else {
                // Opening tag
                openedTags.push({
                  tagName: stringifyToken(token.content[0].content[1]),
                  openedBraces: 0
                });
              }
            }
          } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
            // Here we might have entered a JSX context inside a tag
            openedTags[openedTags.length - 1].openedBraces++;
          } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
            // Here we might have left a JSX context inside a tag
            openedTags[openedTags.length - 1].openedBraces--;
          } else {
            notTagNorBrace = true;
          }
        }

        if (notTagNorBrace || typeof token === 'string') {
          if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
            // Here we are inside a tag, and not inside a JSX context.
            // That's plain text: drop any tokens matched.
            var plainText = stringifyToken(token); // And merge text with adjacent text

            if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
              plainText += stringifyToken(tokens[i + 1]);
              tokens.splice(i + 1, 1);
            }

            if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
              plainText = stringifyToken(tokens[i - 1]) + plainText;
              tokens.splice(i - 1, 1);
              i--;
            }

            tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
          }
        }

        if (token.content && typeof token.content !== 'string') {
          walkTokens(token.content);
        }
      }
    };

    Prism.hooks.add('after-tokenize', function (env) {
      if (env.language !== 'jsx' && env.language !== 'tsx') {
        return;
      }

      walkTokens(env.tokens);
    });
  })(Prism);
}

/***/ }),

/***/ "./node_modules/refractor/lang/tsx.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/tsx.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var refractorJsx = __webpack_require__(/*! ./jsx.js */ "./node_modules/refractor/lang/jsx.js");

var refractorTypescript = __webpack_require__(/*! ./typescript.js */ "./node_modules/refractor/lang/typescript.js");

module.exports = tsx;
tsx.displayName = 'tsx';
tsx.aliases = [];

function tsx(Prism) {
  Prism.register(refractorJsx);
  Prism.register(refractorTypescript);
  var typescript = Prism.util.clone(Prism.languages.typescript);
  Prism.languages.tsx = Prism.languages.extend('jsx', typescript);
}

/***/ }),

/***/ "./node_modules/refractor/lang/typescript.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/typescript.js ***!
  \***************************************************/
/***/ ((module) => {



module.exports = typescript;
typescript.displayName = 'typescript';
typescript.aliases = ['ts'];

function typescript(Prism) {
  Prism.languages.typescript = Prism.languages.extend('javascript', {
    // From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
    keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
  });
  Prism.languages.ts = Prism.languages.typescript;
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_tsx.chunk.js.map