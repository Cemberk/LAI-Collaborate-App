"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_csp"],{

/***/ "./node_modules/refractor/lang/csp.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/csp.js ***!
  \********************************************/
/***/ ((module) => {



module.exports = csp;
csp.displayName = 'csp';
csp.aliases = [];

function csp(Prism) {
  /**
   * Original by Scott Helme.
   *
   * Reference: https://scotthelme.co.uk/csp-cheat-sheet/
   *
   * Supports the following:
   *  - CSP Level 1
   *  - CSP Level 2
   *  - CSP Level 3
   */
  Prism.languages.csp = {
    directive: {
      pattern: /\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,
      alias: 'keyword'
    },
    safe: {
      pattern: /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,
      alias: 'selector'
    },
    unsafe: {
      pattern: /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,
      alias: 'function'
    }
  };
}

/***/ })

}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_csp.chunk.js.map