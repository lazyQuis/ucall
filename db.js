var path = require('path')
  , Datastore = require('nedb')
  , DB = function(){
      this._file = {};
    }

DB.prototype.dbGet = function(name) {
  if(!this._file[name]){
    var dbPath = path.dirname(process.execPath)+'/db/';
    if(process._nw_app){
      dbPath = process._nw_app.dataPath+'/db/';
    }
    var dbName = dbPath+name;
    this._file[name] = new Datastore({ filename: dbName, autoload: true });
  }
  return this._file[name];
}

DB.prototype.phoneRecordList = function(start, count, callback) {
  start = start || 0;
  count = count || 0;
  this.dbGet('info').find({_cate:'callRecord'}).sort({ callDayTime: -1 }).skip(start).limit(count).exec(function (err, docs) {
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
    console.log(docs.length);
  });
};

DB.prototype.phoneRecordRemain = function(count){
  var _me = this;
  _me.dbGet('info').find({_cate:'callRecord'}).sort({ callDayTime: -1 }).skip(0).limit(count+1).exec(function (err, docs) {
    if(docs.length<(count+1)){
      return false;
    }
    docs.splice(docs.length-1);
    _me.dbGet('info').remove({}, { multi: true }, function (err, numRemoved) {
      _me.dbGet('info').insert(docs);
    });
  });
}

//data:{callType,phoneNumber,name,callDayTime,callDuration}
DB.prototype.phoneRecordInsert = function(data) {
  var _me = this;
  if(!data._cate || data._cate !== 'callRecord'){
    console.log('insert:fail');
    return false;
  }
  _me.dbGet('info').insert(data, function (err, newDoc) {
    console.log(newDoc);
    _me.phoneRecordRemain(150);
  });
};

module.exports = new DB();