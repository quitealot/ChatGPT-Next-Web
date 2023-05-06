export const getQrCodeImg = () => {
                  return axios.post("http://www.opengptlearn.top:3000/getYdQrCode");
              }
getQrCodeImg().then(res=>{
        this.qrCodeImg = res.data.data.qrUrl;
        this.loading = false;
        //建立ws连接
        const ws = new WebSocket("ws://www.opengptlearn.top:3000/ws/wxLogin/" + res.data.data.tempUserId);
        ws.onmessage = (evt) => {
          console.log(evt.data);
          const res = JSON.parse(evt.data);
          if (res.wxMaUserInfo) {
          //获取用户信息 存入vuex 如果不使用vuex 可删除下列代码
            this.$store.commit("setUserInfo", res.wxMaUserInfo);
            ws.close();
            this.$router.push('/profile');
          }
        };
      })
              
