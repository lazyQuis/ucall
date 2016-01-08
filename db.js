var path = require('path')
  , LinvoDB = require("linvodb3")
  , DB = function(){
    LinvoDB.defaults.store = { db: require("medeadown") };
    LinvoDB.dbPath = path.dirname(process.execPath);
    this._info = new LinvoDB("info", {});
  }

DB.prototype.phoneRecordList = function(start, count, callback) {
  start = start || 0;
  count = count || 0;
  this._info.find({_cate:'callRecord'}).sort({ callDayTime: -1 }).skip(start).limit(count).exec(function (err, docs) {
    var data = 'NODATA';
    if(docs.length > 0 || start!=0){
      for(var i in docs){
        docs[i].contactId = docs[i]._id;
      }
      data = JSON.stringify(docs);
    }
    if(typeof callback === 'function'){
      callback(data);
    }
  });
};

//data:{callType,phoneNumber,name,callDayTime,callDuration}
DB.prototype.phoneRecordInsert = function(data) {
  if(!data._cate || data._cate !== 'callRecord'){
    console.log('insert:fail');
    return false;
  }
  this._info.insert(data, function (err, newDoc) {
    console.log('insert:success');
    console.log(newDoc);
  });
};

module.exports = new DB();