var db = require('./db')
  , guiGet = function(){
      return global.window.nwDispatcher.requireNwGui();
    }
  , ucall = {
    db:db,
    init:function(){
      var win = guiGet().Window.get();
      win.on('restore', function() {
        win.resizeTo(500, 750);
      });
    },
    windowShow:function(){
    	var win = guiGet().Window.get();
    	win.show();
      win.resizeTo(500, 750);
    }
  }

module.exports = ucall;