var util = require("../../utils/util.js");

Page({
  data:{
    chinaid:'',
    modalHidden: true,
    modalHidden_v: true,
  },
  onLoad:function(option){
    // 页面初始化 options为页面跳转所带来的参数
    var param = JSON.parse(option.param); 
    this.setData({
      chinaid: param.chinaid
    });
    //console.log(param.chinaid);
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

  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalCandel_v: function() {
    // do something
    this.setData({
      modalHidden_v: true
    })
  },
  modalConfirm: function() {
    // do something
    let that = this
    that.setData({
      modalHidden: true
    })
    that.redirectTo(that.data)
  },

  doUpload(){
    // 选择上传的图片
    // let that = this
    this.setData({
      modalHidden: false
    })
  },

  modalConfirm_v: function() {
    // do something
    let that = this
    that.setData({
      modalHidden_v: true
    })
    //1.拍摄视频或从手机相册中选择视频
    wx.chooseVideo({
      sourceType: ['camera'], // album 从相册选视频，camera 使用相机拍摄 'album',
      maxDuration: 5, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: 'back', //默认拉起的是前置或者后置摄像头，默认back, front = 前置摄像头
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
          // that.uploadFile(tempFilePath)
          wx.uploadFile({
            url: 'http://10.249.46.5:5000/save_video',  //此处为后台服务器上传路径
            filePath: tempFilePath,
            name: 'video_file', 
            formData:{chinaid: that.data.chinaid},
            success: (res)=>{ //一下为自己的逻辑
              console.log(res.data.msg)
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
              // app.globalData.photoData=res.data;
              // do something
              wx.navigateBack({
                delta: 1 //返回上一级页面
              })
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
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  chooseVideo() {
    this.setData({
      modalHidden_v: false
    })
  },
  gen_report(){
    wx.navigateTo({
      url: '../report/index'
    })
  },
  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    //console.log('../main/index?param='+ param)
    // redirect
    wx.navigateTo({
      url: '../photo/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }
})