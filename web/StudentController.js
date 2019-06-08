var url = require("url");
//访问一个路径自动匹配一个方法
var path = new Map();
var studentService = require("../service/StudentService");

//处理这个请求的业务
function getStudentPage(resquest,response) {
    var params = url.parse(resquest.url,true).query;
    //严谨性判断
    if(params && params.offset && params.limit){
        studentService.queryStudentByPage(parseInt(params.offset),parseInt(params.limit),function (result) {
            //外面查成功了还需要查下总数
            studentService.queryStudentCount(function (resultCount) {
                response.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});//返回的请求头格式
                response.write(JSON.stringify({total:resultCount[0].count,rows:result}));
                response.end();
            })
        })
    }
}

path.set("/getStudentPage",getStudentPage);

module.exports.path = path;