var ucall = require('ucall');

ucall.db.phoneRecordList(18,0,function(data){
  console.log(data);
});


//insert record data
/*
for(var i=0; i<20; i++){
  var data = {
    _cate: 'callRecord',
    callType: 'INCOMING',
    phoneNumber: '0911123456',
    name: '王大蠻',
    callDayTime: '2016-02-01 00:00:00',
    callDuration: i
  }
  console.log(data);
  ucall.db.phoneRecordInsert(data);
}
*/