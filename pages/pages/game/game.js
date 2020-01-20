//game.js
//获取应用实例
const app = getApp()
import Canvas from '../canvas.js'

Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    dbutton: 'https://dian-1259675363.cos.ap-chengdu.myqcloud.com/image/button/dianji.png',
    mydecade: 0,
    mytheunit: 0,
    watcherIndex: '',
    decade: 0,
    theunit: 0,
    timerc: '', //倒数三秒计时器的名字
    reciprocalNum: '60'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    var data = JSON.parse(options.mdata)
    this.setData({
      "mdata": data
    })

    this.draw('runCanvas', 0, 60000);
    var that = this;
    const watcherIndex = app.$chat.addWatcher(that.dealFn)
    that.setData({
      watcherIndex
    })
    console.log('添加至 watcherList', app.$chat.watcherList)
    var webSocket = 'mdata.webSocketId';
    let reciprocalNum = that.data.reciprocalNum;
    that.setData({
    timerc: setInterval(function () {
      that.setData({
        [webSocket]: '1002-solo'
      });
      //每秒向服务器去实时数据
      app.sendMessage(that.data.mdata);
      if (reciprocalNum == 0) {
        console.info("执行定时器关闭操作");
        clearInterval(that.data.timerc);
        //游戏时间到，跳转到结束页
        var mdata = JSON.stringify(that.data.mdata);
        // console.info(mdata)
         wx.redirectTo({
           url: '../finish/finish?mdata=' + mdata
         })

      }
      
      reciprocalNum--;
    }, 1000)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 销毁
    app.$chat.delWatcher(this.data.watcherIndex)

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  click: function() {
  var myscore = 'mdata.robots[1].score';
  this.setData({
    [myscore]: this.data.mdata.robots[1].score+1,
    mydecade: parseInt(this.data.mdata.robots[1].score/10),
    mytheunit: this.data.mdata.robots[1].score%10
  })
},
  // 处理收到websocket消息
  dealFn(data) {
    
   // console.log('这是在 game 中收到的消息', data)
    
      this.setData({
        "mdata": data
      })
      var score = 'mdata.robots[0].score';
    this.setData({
      [score]: this.data.mdata.robots[0].score + 1,
      decade: parseInt(this.data.mdata.robots[0].score / 10),
      theunit: this.data.mdata.robots[0].score % 10
    })
    
  }

})