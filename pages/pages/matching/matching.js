//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    robot: {
      machineId: '',
      webSocketId: '1001-solo',
      oneselfName: '',
      oneselfTu: ''
    },

    timer: '', //定时器名字
    countDownNum: '0', //倒计时初始值
    youName: '?????',
    youImageUrl: 'https://dian-1259675363.cos.ap-chengdu.myqcloud.com/image/beijing/%E5%8C%B9%E9%85%8D%E5%9B%BE%E6%A0%87.png',
    meName: '肖宇',
    meImageUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Fatkp888k9NDZPd98hoUMxmGHmNMmJ22g6cduIp9ia9sMtqKCGibWoWZDYGVryYKibqXjnZE9FBGSj04WZIibiajzvQ/132',
    watcherIndex: '',
    buttondown: '取消',
    touxiang: 'https://dian-1259675363.cos.ap-chengdu.myqcloud.com/image/touxiang/touxiang',
    disabled: '',
    timerc: '', //倒数三秒计时器的名字
    reciprocalNum: '3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // that.setData({
    //   meName: options.name,
    //   meImageUrl: options.tu,
    // })
    //var item = JSON.parse(options.jsonStr);
    const watcherIndex = app.$chat.addWatcher(that.dealFn)
    that.setData({
      watcherIndex
    })
    console.log('添加至 watcherList', app.$chat.watcherList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.getSystemInfo({
      success({
        windowHeight
      }) {
        console.info(windowHeight);
        hcenter: windowHeight;
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.countDown();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(that.data.timer);
    clearInterval(that.data.timerc);
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


  countDown: function() {
    let that = this;
    let countDownNum = that.data.countDownNum; //获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就加一，实现同步
        countDownNum++;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 3) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为60，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          var machineId = 'robot.machineId';
          var oneselfName = 'robot.oneselfName';
          var oneselfTu = 'robot.oneselfTu';
          //console.info(that.data.meName)
          that.setData({
            [machineId]: that.createRandomId(),
            [oneselfName]: that.data.meName,
            [oneselfTu]: that.data.meImageUrl
          })
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          //时间到，没有匹配到人，分配电脑；
          //console.info(that.data.robot);
          app.sendMessage(that.data.robot);


        }
      }, 1000)
    })
  },
  createRandomId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
  },
  // 处理收到websocket消息
  dealFn(data) {
    //console.log('这是在 matching 中收到的消息', data)
    //匹配人满，进入准备环节,按钮变成准备
    var tuUrl = data.robots[0].tuUrl;
    var yname = data.robots[0].name;
    var toux = this.data.touxiang;
    if (data.baseNum == 2) {
      this.setData({
        mdata: data,
        buttondown: '准备',
        youImageUrl:  tuUrl,
        youName: yname
      })
    }
  },

  start: function() {
    let that = this;
    if (that.data.buttondown == '准备') {
      let reciprocalNum = that.data.reciprocalNum;
      that.setData({
        disabled: 'true',

        timerc: setInterval(function() {
          if (reciprocalNum == 0) {
            clearInterval(that.data.timerc);
            //开始时间到，跳转到游戏页
            var mdata = JSON.stringify(that.data.mdata);
            console.info(mdata)
            wx.redirectTo({
              url: '../game/game?mdata=' + mdata
            })

          }
          that.setData({
            buttondown: reciprocalNum
          })
          reciprocalNum--;
        }, 1000)
      })


    }else{
    //点击取消按钮跳转到首页
    wx.switchTab({
      url: '../index/index'
    })
    // wx.redirectTo({
    //   url: '../matching/matching?name=' + e.currentTarget.dataset.name + "&tu=" + e.currentTarget.dataset.avatarurl
    // })
  }
  }
})