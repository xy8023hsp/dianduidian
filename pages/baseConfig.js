
const baseConfig = {
  //本地测试模式
  socketUrl: "www.dianduidian.xyz:443",
  isFile: false,
  //接口开发路径
  file: {//配置本地的开发路径
    api: {
      test: "../data/test.js",
      login: "../data/login.js",
      login_noPhone: "../data/login_noPhone.js",
    }
  },
  //接口生产路径
  dev: {
    api_old: {	//配置测试路径		
      normalOrder: "http://www.xxxxxx.club/api/xxxxx.html",
    },
    api: {	//配置正式的api路径
      agency: "https://xxxxxxxxx.com.cn/xxxxx",
    }
  }
}
module.exports = baseConfig;
