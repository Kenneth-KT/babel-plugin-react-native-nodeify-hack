'use strict';

exports.default = function(babel) {

  var rootPath = process.cwd();
  var modulesBase = rootPath + '/node_modules';

  var pushGlobalAssign = function(nodePath, globalName, localName) {
    if (localName == null) localName = globalName;
    nodePath.pushContainer('body', t.expressionStatement(
      t.assignmentExpression('=',
        t.memberExpression(
          t.identifier('global'),
          t.identifier(globalName)
        ),
        t.identifier(localName)
      )
    ));
  }

  var moduleJsPath = function(moduleJs) {
    return modulesBase + moduleJs;
  }

  var t = babel.types;

  return {
    visitor: {
      Program: function Program(path, state) {
        switch (state.file.opts.filename) {
          case moduleJsPath('/buffer/index.js'):
            pushGlobalAssign(path, 'Buffer');
            break;
          case moduleJsPath('/process/browser.js'):
            pushGlobalAssign(path, 'process');
            break;
        }
      }
    }
  };
};

Object.defineProperty(exports, "__esModule", { value: true });
