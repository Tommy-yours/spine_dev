Page({
  data: {
    src: '',
    size: 0,
    chinaid: '',
  },
  onLoad:function(option){
    // 页面初始化 options为页面跳转所带来的参数
    var param = JSON.parse(option.param); 
    this.setData({
      chinaid: param.chinaid
    });
    // console.log('wode: '+param.chinaid);
  },
  takePhoto() {
    let that = this
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        // wx.getFileInfo({
        //   filePath:res.tempImagePath,
        //   success: (res)=> {
        //     let size=res.size/1024/1024;
        //     this.setData({
        //       size: size
        //     })
        //     console.log(res.size)
        //     console.log(res.digest)
        //   }
        // })
        wx.uploadFile({
          url: 'http://10.249.46.5:5000/save_image',  //此处为后台服务器上传路径
          filePath: res.tempImagePath,
          name: 'image_file', 
          formData:{chinaid: that.data.chinaid},
          success: (res)=>{ //一下为自己的逻辑
            // console.log(res.data.msg)
            // wx.showToast({
            //   title: '上传成功',
            //   icon: 'none'
            // })

            setTimeout(() => {
              wx.showToast({
                title: '上传成功',
                icon: "none",
              });
              setTimeout(() => {
                wx.hideToast();
                wx.navigateBack({
                  delta: 1 //返回上一级页面
                })
              }, 300)
            }, 0);
  
            // app.globalData.photoData=res.data;
            // do something
            // wx.navigateBack({
            //   delta: 1 //返回上一级页面
            // })
            // wx.showToast({
            //   title: '上传成功',
            //   icon: 'none'
            // })
          },
          fail:()=>{
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            })
            // wx.navigateBack({
            //   delta: 1 //返回上一级页面
            // })
          }
        })
      }
    })
  },
  cameraError(e) {
    console.log(e.detail)
    wx.showToast({
      title: '以拒绝，使用请手动开启',
      icon:'none'
    })
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1 //返回上一级页面
      })
    },3000)
  }
})