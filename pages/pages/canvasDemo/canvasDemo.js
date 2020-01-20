import Canvas from '/canvas.js'
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw('runCanvas',0,60000);
  },
})