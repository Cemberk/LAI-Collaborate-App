"use strict";
(globalThis["webpackChunkcreate_react_app"] = globalThis["webpackChunkcreate_react_app"] || []).push([["react-syntax-highlighter_languages_refractor_typescript"],{

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
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_typescript.chunk.js.map