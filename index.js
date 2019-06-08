var http = require("http");
var url = require("url");
var fs = require("fs");
var loader = require("./loader");

http.createServer(function(req,res){
    var pathName = url.parse(req.url).pathname;
    console.log(pathName);
    var isStatic = isStaticPage(pathName);
    // console.log(isStatic);
    if(isStatic){//请求页面
        try {
            var data = fs.readFileSync("./page" + pathName);
            res.writeHead(200);
            res.write(data);
            res.end();
        }catch (e) {
            res.writeHead(404);
            res.write("<html><body>404 NotFound</body></html>");
            res.end();
        }
    }else{//请求数据
        for (temp of loader){
            if(new RegExp("^" + temp[0] + "$").test(pathName)){//防止路径单调
                temp[1](req,res);
                return;
            }
        }
        res.writeHead(404);
        res.write("<html><body>404 NotFound</body></html>");
        res.end();
    }
}).listen(12306);

function isStaticPage(pathName) {
    var statics = [".html",".js",".css",".jpg",".woff2",".ttf"];
    for(var i = 0; i < statics.length; i++){
        //保证是最后一个
        if(pathName.indexOf(statics[i]) == pathName.length - statics[i].length){
            return true;
        }
    }
    return  false;
}