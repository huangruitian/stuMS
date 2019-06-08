var mysql = require("mysql");//npm 下载驱动，node没有自带

function createConnection() {
    //为什么需要数据池？访问量大的时候，数据池就很好了，减少开销
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"123456",
        database:"school"
    })
    return connection;
}
module.exports.createConnection = createConnection;
