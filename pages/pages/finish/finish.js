//finish.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:"",
    mydecade: 0,
    mytheunit: 0,
    decade: 0,
    theunit: 0,
    youname:"",
    myname:"",
    youtuUrl:"",
    mytuUrl:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = JSON.parse(options.mdata)
    console.info(data)
    that.setData({
      "mdata": data
    })
    let victorIda = 'mdata.victorId'
    var youscore = that.data.mdata.robots[0].score;
    var myscore = that.data.mdata.robots[1].score;
    if (youscore > myscore){
      var victorId = that.data.mdata.robots[0].machineId;
      var result = "失败";
    } else if (youscore == myscore) {
      var victorId = "00000000";
      var result = "平局";
    } else{
      var victorId = that.data.mdata.robots[1].machineId;
      var result = "胜利";
    }
    that.setData({
      "result": result,
      [victorIda]: victorId,
        mydecade: parseInt(this.data.mdata.robots[1].score / 10),
        mytheunit: this.data.mdata.robots[1].score % 10,
      myname: this.data.mdata.robots[1].name ,
      mytuUrl: this.data.mdata.robots[1].tuUrl,
        decade: parseInt(this.data.mdata.robots[0].score / 10),
      theunit: this.data.mdata.robots[0].score % 10,
      youname: this.data.mdata.robots[0].name,
      youtuUrl: this.data.mdata.robots[0].tuUrl,
    })
    var webSocket = 'mdata.webSocketId';
    that.setData({
      [webSocket]: '1003-solo'
    });
    //每秒向服务器去实时数据
    app.sendMessage(that.data.mdata);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

//单人对战
toagame: function (e) {
    wx.redirectTo({
      url: '../matching/matching?name=' + this.data.mdata.robots[1].name + "&tu=" + this.data.mdata.robots[1].tuUrl
    })

},
click: function(e){
  //点击取消按钮跳转到首页
  wx.switchTab({
    url: '../index/index'
  })
}

})


