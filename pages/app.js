//app.js

import {Chat} from "./Chat.js"

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //this.connectWebSocket();
    // new 聊天实例
    this.$chat = new Chat(this)
    this.$chat.connectSocket() // 连接

    

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
             
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    
  },
  $chat: null,
  globalData: {
    userInfo: null
  },
  getData: function () {
    wx.request({
      url: "http://www.darknetsty.xyz:443/v1/test",
      data: "",
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "POST",
      dataType: "json",//若设置json则直接返回的是对象，若其他返回貌似是String
      success: function (res) {
        var obj = res;//我们这里打断点来看数据是否获取到了
        //这里执行数据操作，
        console.log("sss");
      },
      fail: function (e) {

      },
      complete: function (obj) {

      }
    })
  },
  connectWebSocket: function () {
    console.log("创建webSocket连接");
    wx.connectSocket({
      url: 'ws://www.darknetsty.xyz:443/websocket/user',
      // url:'http://eservicesit.prlife.com.cn:7001',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("创建连接成功");
        //do something
      },
      fail: function (res) {
        console.log("创建连接失败,原因因::" + res.errMsg);
      },
      complete: function () {
        console.log("创建连接complete");
      }
    })

  },
  //发送消息
  sendMessage(message){
    this.$chat.sendMessage(message);
  }
})