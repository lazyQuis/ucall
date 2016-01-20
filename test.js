var ucall = require('ucall');

/**
 * db control
 */
//insert record data
//for(var i=0; i<20; i++){
//  var data = {
//    _cate: 'callRecord',
//    callType: 'INCOMING',
//    phoneNumber: '0911123456',
//    name: '王大蠻',
//    callDayTime: '2016-02-01 00:00:00',
//    callDuration: i
//  }
//  console.log(data);
//  ucall.db.phoneRecordInsert(data);
//}

//list record data
//ucall.db.phoneRecordList(0,0,function(data){
//  console.log(data);
//});

/**
 * page info
 */
ucall.urlCallInfo('0277083858',console.log);