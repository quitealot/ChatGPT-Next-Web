//yd二维码获取
            router.post("/getYdQrCode", function (req, res) {
              axios
                  .get("https://yd.jylt.cc/api/wxLogin/tempUserId?secret=056ab15c")
                  .then((resp) => {
                    res.json(resp.data);
                  })
                  .catch((err) => {
                    res.json({
                      code: 200,
                      msg: "获取二维码失败！",
                      data: err,
                    });
                  });
            });
 //模拟ws连接池
              let hash = {}
              //yd登录扫码登录回调
              router.post("/wxLoginCallback", function (req, res) {
                //  可以处理返回的用户信息 存入数据库 判断是否是新用户等……
                //...
                //将易登返回的数据通过websocket推给前端
                hash[req.body.tempUserId].send(JSON.stringify(req.body));
                res.json({
                  code: 0,
                  msg: "登录授权成功！",
                });
              });
              //与前端建立websocket连接
              router.ws('/ws/wxLogin/:tempUserId', function(ws, req) {
                hash[req.params.tempUserId] = ws;
                ws.on("close", function(){
                  for(let i in hash){
                    if(hash[i] == this){
                      delete hash[i];
                    }
                  }
                  console.log(hash);
                });
              });
