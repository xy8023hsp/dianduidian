/**
 * Chat
 * 
 */
import baseConfig from './baseConfig.js'
// import { wxLogin } from './login'

class Chat {


  constructor(app) {
    this.chat_id = null // chat_id
    this.connectStatus = 0 // websocket 连接状态 0：未连接，1：已连接
    this.heartListen = null // 心跳
    this.watcherList = [] // 订阅者
    this.app = app // 方便在Chat内部操作app
  }




  /* 初始化连接 */
  connectSocket() {
    // this.userInfoReadyCallback = res => {
    //   this.setData({
    //     userInfo: res.userInfo,
    //     hasUserInfo: true
    //   })
    // }
    const userinfo = this.app.globalData.userInfo;
    //console.info(this.app)
    //console.info(this.chat_id)
    this.chat_id = new Date().getTime()
    //console.info(userinfo.nickName);
    //const token = wx.getStorageSync('token')
    // const url = `${baseConfig.socketUrl}/webSocket`;
    // const url = `wss://www.dianduidiantwo.xyz/wss/websocket/`+this.chat_id;
    const url = `wss://www.dianduidiantwo.xyz/wss`;
    console.log(url);
    
    console.log('开始连接')
    // websocket连接
    wx.connectSocket({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: res => {
        console.log('连接成功', res)
        // 设置连接状态
        this.connectStatus = 1
        // 心跳
        clearInterval(this.heartListen)
        this.heartListen = setInterval(() => {
          if (this.connectStatus === 0) {
            console.log('监听到没心跳了，抢救一下')
            clearInterval(this.heartListen)
            this.reconnect()
          } else {
             console.log('我还活着')
          }
        }, 30000)
      },
      fail: err => {
        console.error('连接失败')
      }
    })
    // 监听webSocket错误
    wx.onSocketError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！')
      // 修改连接状态
      this.connectStatus = 0
    })
    // 监听WebSocket关闭
    wx.onSocketClose(res => {
      console.log('监听到 WebSocket 已关闭！')
      this.connectStatus = 0
    })
    // websocket打开
    wx.onSocketOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
    })
    // 收到websocket消息
    wx.onSocketMessage(res => {
      this.getSocketMsg(JSON.parse(res.data))  // 收到的消息为字符串，需处理一下
    })

  }

  /* 重连 */
  reconnect() {
    console.log('尝试重连')
    wx.closeSocket() // 重连之前手动关闭一次
    this.connectSocket()
  }

  /* 关闭websocket */
  closeSocket(removeChat) {
    wx.closeSocket({
      success: res => {
        // code
      }
    })
  }

  /* 添加watcher */
  addWatcher(fn) {
    console.info("进来了");
    this.watcherList.push(fn)
    return this.watcherList.length - 1 // 返回添加位置的下标，Page unload的时候方便删除List成员
  }

  /* 删除watcher */
  delWatcher(index) {
    this.watcherList.splice(index, 1)
    // console.log('销毁watcher', this.watcherList)
  }

  /* 收到消息 */
  getSocketMsg(data) {
    data.code = 0;
    console.log('收到消息', data)
    if (data.code == 5100) { // 处理登录过期
      wxLogin()
        .then(res => {
          console.log('登录成功')
          // 重新登录成功，发起重连
          this.reconnect()
        })
        .catch(err => {
          console.error('登录失败', err)
        })
      // 正确状态
    } else if (data.code == 0) {
      // 给每个订阅者发消息
      const list = this.watcherList
      for (let i = 0; i < list.length; i++) {
        list[i](data)
      }
      // 其他返回类型
    } else {
      // balabalabala
    }
  }

  // 这里可以写一些方法，如发送消息等
  // code
  sendMessage(message){
    wx.sendSocketMessage({
      data: JSON.stringify(message)
    })
  }
}


export {Chat};