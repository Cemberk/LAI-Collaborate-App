"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_textile"],{

/***/ "./node_modules/refractor/lang/textile.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/textile.js ***!
  \************************************************/
/***/ ((module) => {



module.exports = textile;
textile.displayName = 'textile';
textile.aliases = [];

function textile(Prism) {
  ;

  (function (Prism) {
    // We don't allow for pipes inside parentheses
    // to not break table pattern |(. foo |). bar |
    var modifierRegex = /(?:\([^|)]+\)|\[[^\]]+\]|\{[^}]+\})+/.source;
    var modifierTokens = {
      css: {
        pattern: /\{[^}]+\}/,
        inside: {
          rest: Prism.languages.css
        }
      },
      'class-id': {
        pattern: /(\()[^)]+(?=\))/,
        lookbehind: true,
        alias: 'attr-value'
      },
      lang: {
        pattern: /(\[)[^\]]+(?=\])/,
        lookbehind: true,
        alias: 'attr-value'
      },
      // Anything else is punctuation (the first pattern is for row/col spans inside tables)
      punctuation: /[\\\/]\d+|\S/
    };
    var textile = Prism.languages.textile = Prism.languages.extend('markup', {
      phrase: {
        pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
        lookbehind: true,
        inside: {
          // h1. Header 1
          'block-tag': {
            pattern: RegExp('^[a-z]\\w*(?:' + modifierRegex + '|[<>=()])*\\.'),
            inside: {
              modifier: {
                pattern: RegExp('(^[a-z]\\w*)(?:' + modifierRegex + '|[<>=()])+(?=\\.)'),
                lookbehind: true,
                inside: modifierTokens
              },
              tag: /^[a-z]\w*/,
              punctuation: /\.$/
            }
          },
          // # List item
          // * List item
          list: {
            pattern: RegExp('^[*#]+(?:' + modifierRegex + ')?\\s+.+', 'm'),
            inside: {
              modifier: {
                pattern: RegExp('(^[*#]+)' + modifierRegex),
                lookbehind: true,
                inside: modifierTokens
              },
              punctuation: /^[*#]+/
            }
          },
          // | cell | cell | cell |
          table: {
            // Modifiers can be applied to the row: {color:red}.|1|2|3|
            // or the cell: |{color:red}.1|2|3|
            pattern: RegExp('^(?:(?:' + modifierRegex + '|[<>=()^~])+\\.\\s*)?(?:\\|(?:(?:' + modifierRegex + '|[<>=()^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|', 'm'),
            inside: {
              modifier: {
                // Modifiers for rows after the first one are
                // preceded by a pipe and a line feed
                pattern: RegExp('(^|\\|(?:\\r?\\n|\\r)?)(?:' + modifierRegex + '|[<>=()^~_]|[\\\\/]\\d+)+(?=\\.)'),
                lookbehind: true,
                inside: modifierTokens
              },
              punctuation: /\||^\./
            }
          },
          inline: {
            pattern: RegExp('(\\*\\*|__|\\?\\?|[*_%@+\\-^~])(?:' + modifierRegex + ')?.+?\\1'),
            inside: {
              // Note: superscripts and subscripts are not handled specifically
              // *bold*, **bold**
              bold: {
                pattern: RegExp('(^(\\*\\*?)(?:' + modifierRegex + ')?).+?(?=\\2)'),
                lookbehind: true
              },
              // _italic_, __italic__
              italic: {
                pattern: RegExp('(^(__?)(?:' + modifierRegex + ')?).+?(?=\\2)'),
                lookbehind: true
              },
              // ??cite??
              cite: {
                pattern: RegExp('(^\\?\\?(?:' + modifierRegex + ')?).+?(?=\\?\\?)'),
                lookbehind: true,
                alias: 'string'
              },
              // @code@
              code: {
                pattern: RegExp('(^@(?:' + modifierRegex + ')?).+?(?=@)'),
                lookbehind: true,
                alias: 'keyword'
              },
              // +inserted+
              inserted: {
                pattern: RegExp('(^\\+(?:' + modifierRegex + ')?).+?(?=\\+)'),
                lookbehind: true
              },
              // -deleted-
              deleted: {
                pattern: RegExp('(^-(?:' + modifierRegex + ')?).+?(?=-)'),
                lookbehind: true
              },
              // %span%
              span: {
                pattern: RegExp('(^%(?:' + modifierRegex + ')?).+?(?=%)'),
                lookbehind: true
              },
              modifier: {
                pattern: RegExp('(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])' + modifierRegex),
                lookbehind: true,
                inside: modifierTokens
              },
              punctuation: /[*_%?@+\-^~]+/
            }
          },
          // [alias]http://example.com
          'link-ref': {
            pattern: /^\[[^\]]+\]\S+$/m,
            inside: {
              string: {
                pattern: /(\[)[^\]]+(?=\])/,
                lookbehind: true
              },
              url: {
                pattern: /(\])\S+$/,
                lookbehind: true
              },
              punctuation: /[\[\]]/
            }
          },
          // "text":http://example.com
          // "text":link-ref
          link: {
            pattern: RegExp('"(?:' + modifierRegex + ')?[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
            inside: {
              text: {
                pattern: RegExp('(^"(?:' + modifierRegex + ')?)[^"]+(?=")'),
                lookbehind: true
              },
              modifier: {
                pattern: RegExp('(^")' + modifierRegex),
                lookbehind: true,
                inside: modifierTokens
              },
              url: {
                pattern: /(:).+/,
                lookbehind: true
              },
              punctuation: /[":]/
            }
          },
          // !image.jpg!
          // !image.jpg(Title)!:http://example.com
          image: {
            pattern: RegExp('!(?:' + modifierRegex + '|[<>=()])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?'),
            inside: {
              source: {
                pattern: RegExp('(^!(?:' + modifierRegex + '|[<>=()])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)'),
                lookbehind: true,
                alias: 'url'
              },
              modifier: {
                pattern: RegExp('(^!)(?:' + modifierRegex + '|[<>=()])+'),
                lookbehind: true,
                inside: modifierTokens
              },
              url: {
                pattern: /(:).+/,
                lookbehind: true
              },
              punctuation: /[!:]/
            }
          },
          // Footnote[1]
          footnote: {
            pattern: /\b\[\d+\]/,
            alias: 'comment',
            inside: {
              punctuation: /\[|\]/
            }
          },
          // CSS(Cascading Style Sheet)
          acronym: {
            pattern: /\b[A-Z\d]+\([^)]+\)/,
            inside: {
              comment: {
                pattern: /(\()[^)]+(?=\))/,
                lookbehind: true
              },
              punctuation: /[()]/
            }
          },
          // Prism(C)
          mark: {
            pattern: /\b\((?:TM|R|C)\)/,
            alias: 'comment',
            inside: {
              punctuation: /[()]/
            }
          }
        }
      }
    });
    var phraseInside = textile['phrase'].inside;
    var nestedPatterns = {
      inline: phraseInside['inline'],
      link: phraseInside['link'],
      image: phraseInside['image'],
      footnote: phraseInside['footnote'],
      acronym: phraseInside['acronym'],
      mark: phraseInside['mark']
    }; // Only allow alpha-numeric HTML tags, not XML tags

    textile.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i; // Allow some nesting

    var phraseInlineInside = phraseInside['inline'].inside;
    phraseInlineInside['bold'].inside = nestedPatterns;
    phraseInlineInside['italic'].inside = nestedPatterns;
    phraseInlineInside['inserted'].inside = nestedPatterns;
    phraseInlineInside['deleted'].inside = nestedPatterns;
    phraseInlineInside['span'].inside = nestedPatterns; // Allow some styles inside table cells

    var phraseTableInside = phraseInside['table'].inside;
    phraseTableInside['inline'] = nestedPatterns['inline'];
    phraseTableInside['link'] = nestedPatterns['link'];
    phraseTableInside['image'] = nestedPatterns['image'];
    phraseTableInside['footnote'] = nestedPatterns['footnote'];
    phraseTableInside['acronym'] = nestedPatterns['acronym'];
    phraseTableInside['mark'] = nestedPatterns['mark'];
  })(Prism);
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_textile.chunk.js.map