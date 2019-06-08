//自动加载全部的Controller
var fs = require("fs");
//总的Map,需要存所以的。
var pathMap = new Map();
//如何读取路径下的相应的文件呢？
var files = fs.readdirSync("./web");

for (let i = 0; i < files.length; i++){
    var temp = require("./web/" + files[i]);//每个控制文件都导出一个mapPath
    if(temp.path){//导出的path存在
     for(var [key,value] of temp.path){
        if(pathMap.get(key) == null){
            pathMap.set(key,value);
        }else{
            //利用Map的唯一结构，存所有的方法都是唯一的。
            throw new Error("url path异常，url:" + key);
        }
     }
    }
}
//加载好所以Controller层的方法导出
module.exports = pathMap;