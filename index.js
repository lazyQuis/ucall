//useless
var db = require('./db')
  , pi = require('./pageInfo')
  , guiGet = function(){
      return global.window.nwDispatcher.requireNwGui();
    }
  , ucall = {
      db:db,
      urlCallInfo:pi.urlInfo,
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
      },
      urlOpen:function(url){
        var gui = guiGet();
        gui.Shell.openExternal(url);
      }
    }

module.exports = ucall;
