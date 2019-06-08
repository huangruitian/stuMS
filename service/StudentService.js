//查询数据库是DAO做的
var studentDao = require("../dao/StudentDao");

function queryStudentByPage(offset,limit,success) {
    studentDao.queryStudentByPage(offset,limit,success);
}
function queryStudentCount(success) {
    studentDao.queryStudentCount(success);
}
module.exports.queryStudentByPage = queryStudentByPage;
module.exports.queryStudentCount = queryStudentCount;