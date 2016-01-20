var http = require('http')
  , cheerio = require('cheerio')

exports.urlInfo = function(number,callback) {
  var options = {
    host: 'number.whoscall.com',
    port: 80,
    path: '/zh-TW/tw/'+number+'/'
  };
  http.get(options, function(res) {
    //console.log(res.statusCode);
    var body = '';
    res.on("data", function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var $ = cheerio.load(body);
      var name = $('span[itemprop=name]').text() || '無搜尋結果';
      //console.log(name);
      if(typeof callback === 'function'){
        callback(name);
      }
    });
  }).on('error', function(e) {
    //console.log("Got error: " + e.message);
    if(typeof callback === 'function'){
      callback('暫無服務');
    }
  });

}