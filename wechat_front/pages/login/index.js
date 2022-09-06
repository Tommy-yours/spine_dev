var util = require("../../utils/util.js");

Page({
  data:{
    loginBtnTxt:"登录",
    loginBtnBgBgColor:"#1CBCB4",
    btnLoading:false,
    disabled:false,
    inputUserName: '',
    inputPassword: '',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
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
  formSubmit:function(e){
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit:function (param){
    // var flag = this.checkUserName(param)&&this.checkPassword(param)
    var flag = this.checkChinaid(param)
    if(flag){
        this.setLoginData1();
        this.checkUserInfo(param);
    } 
  },
  setLoginData1:function(){
    this.setData({
      loginBtnTxt:"登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#999",
      btnLoading:!this.data.btnLoading
    });
  },
  setLoginData2:function(){
    this.setData({
      loginBtnTxt:"登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor:"#ff9900",
      btnLoading:!this.data.btnLoading
    });
  },
  checkUserName:function(param){
    var email = util.regexConfig().email; 
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    if(email.test(inputUserName)||phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的邮箱或者手机号码'
      });
      return false;
    }
  },
  checkPassword:function(param){
    var userName = param.username.trim();
    var password = param.password.trim();
    if(password.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入密码'
      });
      return false;
    }else{
      return true;
    }
  },

  checkChinaid:function(param){
    var chinaid = param.chinaid.trim();
    if(chinaid.length<=0){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入身份证号'
      });
      return false;
    }else{
      return true;
    }
  },

  checkUserInfo:function(param){
    // var username = param.username.trim();
    // var password = param.password.trim();
    var chinaid = param.chinaid.trim();
    var that = this;
    // (username=='admin@163.com'||username=='18555555555')&&password=='000000'

    // 与后端交互开始
    // 原始代码
    // if(chinaid == '123'){
    //     setTimeout(function(){
    //       wx.showToast({
    //         title: '成功',
    //         icon: 'success',
    //         duration: 600
    //       });
    //       that.setLoginData2();
    //       that.redirectTo(param);
    //     },1000);
    // }else{
    //   wx.showModal({
    //     title: '提示',
    //     showCancel:false,
    //     content: '用户名或密码有误，请重新输入'
    //   });
    //   this.setLoginData2();
    // }
    console.log('begin request!')
    console.log(chinaid)

    wx.request({   //请求地址'http://192.168.1.107:5000/user_login',10.249.46.5
      url: 'http://10.249.46.5:5000/user_login',
      method: 'POST',    
      data:{
        china_id: chinaid
      },
      header: {  //请求头
        // 'content-type': 'application/json'
        "Content-Type": "application/x-www-form-urlencoded"
      },
      //如果在sucess直接写this就变成了wx.request()的this了
      success: function (res) {
        // res.data相当于ajax里面的data,为后台返回的数据
        //打印后台返回的数据
        // console.log(res)
        console.log(res.data)
        //直接把后台返回的数据 赋值给names 就可以直接调用names了
        //that.setData({ names: res.data.message })
        if(res.data['is_register'] == 'yes'){
          setTimeout(function(){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 500
            });
            that.setLoginData2();
            that.redirectTo(param);
          },600);
        }
        else{
          console.log('fail res!!!!')
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: '未查询到身份信息'
          });
          that.setLoginData2();
        }
      }
    })
  },
  redirectTo:function(param){
    //需要将param转换为字符串
    param = JSON.stringify(param);
    //console.log('../main/index?param='+ param)
    wx.redirectTo({
      url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    })
  }

})