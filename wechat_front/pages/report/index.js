var util = require("../../utils/util.js");

Page({
  data:{
    chinaid:'',
  },
  onLoad:function(option){
    // 页面初始化 options为页面跳转所带来的参数
    var param = JSON.parse(option.param); 
    this.setData({
      chinaid:param.chinaid
    });
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  doUpload(){
    // 选择上传的图片
    wx.chooseImage({
      count: 1,            //这里是选择几张图片
      sizeType: ['compressed'],   //把上传的图片进行压缩图
      sourceType: ['album', 'camera'],    //选择相册或拍照
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = 'my-image' + Date.now() + filePath.match(/\.[^.]+?$/)[0]   //上传图片         的名字，根据时间自定义图片文件名，使得上传后的每一张文件名都不一样，放置重名覆盖。
        wx.cloud.uploadFile({    //将图片上传到云服务器的云存储中
          cloudPath, //云存储的路径
          filePath,  //本地图片路径
          success: res => {
            console.log('[上传文件] 成功：', res) 
            console.log(res.fileID)  // 上传后图片的 fileID
            // wx.navigateTo({   上传成功后跳转到某个页面
            //   url: '../storageConsole/storageConsole'
            // })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  chooseVideo() {
    let that = this
    // that.setData({
    //   clickFlag: true
    // })
    //1.拍摄视频或从手机相册中选择视频
    wx.chooseVideo({
      sourceType: ['camera'], // album 从相册选视频，camera 使用相机拍摄 'album',
      maxDuration: 7, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: 'front', //默认拉起的是前置或者后置摄像头，默认back, front = 前置摄像头
      compressed: true, //是否压缩所选择的视频文件
      success(res) {
        let tempFilePath = res.tempFilePath //选择定视频的临时文件路径（本地路径）
        let duration = res.duration //选定视频的时间长度
        let size = parseFloat(res.size / 1024 / 1024) //选定视频的数据量大小
        // let size = parseFloat(res.size/1024/1024).toFixed(1)  //选定视频的数据量大小
        // let height = res.height //返回选定视频的高度
        // let width = res.width //返回选中视频的宽度
        console.log('大小==', res.size, '高度==', res.height, '宽度==', res.width)
        console.log('視頻大小', size)
        console.log(tempFilePath)
        // that.data.duration = duration
        if (parseFloat(size) > 2) {
          // that.setData({
          //   clickFlag: false,
          // })
          // let beyondSize = parseFloat(size) - 100
          wx.showToast({
            title: '上传的视频大小超限，超出 2 MB,请重新上传',
            icon: 'none'
          })
        } else {
          //2.本地视频资源上传到服务器
          that.uploadFile(tempFilePath)
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  gen_report(){






    
  }


})