var path = require('path')
  , Datastore = require('nedb')
  , DB = function(){
      this.path = path.dirname(process.execPath)+'/db/';
      var dbName = this.path+'info';
      this._info = new Datastore({ filename: dbName, autoload: true });
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