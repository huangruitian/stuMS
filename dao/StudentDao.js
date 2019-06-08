var DBUtil = require("./DBUtil");

function queryStudentCount(success) {
    //可以防止SQL注入
    var querySql = "select count(*) as count from student";
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,function (error,result) {
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryStudentByPage(offset,limit,success) {
    //可以防止SQL注入
    var querySql = "select * from student limit ?,?";
    var queryParams = [offset,limit];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,queryParams,function (error,result) {
          if(error == null){
              success(result);
          }else {
              console.log(error);
          }
    });
    connection.end();
}

module.exports.queryStudentByPage = queryStudentByPage;
module.exports.queryStudentCount = queryStudentCount;