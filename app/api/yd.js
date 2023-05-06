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
