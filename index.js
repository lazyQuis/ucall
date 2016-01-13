var db = require('./db')
  , guiGet = function(){
      return global.window.nwDispatcher.requireNwGui();
    }
  , ucall = {
    db:db,
    init:function(){
      var win = guiGet().Window.get();
      var manifest = process._nw_app.manifest;
      win.on('restore', function() {
        win.resizeTo(manifest.window.width, manifest.window.height);
      });
    },
    windowShow:function(){
      var win = guiGet().Window.get();
      var manifest = process._nw_app.manifest;
      win.show();
      win.resizeTo(manifest.window.width, manifest.window.height);
    }
  }

module.exports = ucall;