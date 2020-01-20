//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: ['btn1', 'btn2','btn3'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  start: function(e){
    var id = e.currentTarget.dataset.id
    console.log(id);

    if(id =="btn1"){
      this.solo(e);
    }else if(id == "btn2"){
      this.multiplayerGame(e);
    }else if(id == "btn3"){
      this.found(e);
    }
  },

//单人对战
solo: function(e){
  wx.redirectTo({
    url: '../matching/matching?name=' + e.currentTarget.dataset.name + "&tu="+e.currentTarget.dataset.avatarurl
  })
},
//多人对站
  multiplayerGame: function (e) {
    wx.switchTab({
      url: '../image'
    })
  },
//创建房间
  found: function (e) {
    console.info("sd")
    wx.switchTab({
      url: '../image'
    })
  },
})
