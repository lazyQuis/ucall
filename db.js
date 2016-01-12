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
  });
};

//data:{callType,phoneNumber,name,callDayTime,callDuration}
DB.prototype.phoneRecordInsert = function(data) {
  if(!data._cate || data._cate !== 'callRecord'){
    console.log('insert:fail');
    return false;
  }
  this.dbGet('info').insert(data, function (err, newDoc) {
    //console.log('insert:success');
    console.log(newDoc);
  });
};

module.exports = new DB();