// 配置
let envir = 'online'
let ENVIRONMENT_CONFIG = {}

console.warn('|||||||||||||||||||||||||||||||||||||')
console.warn('若修改appkey为自己的appkey后，且自己的appey暂未开通订阅权限，需要注释掉im.js文件中”onpushevents: this.onPushEvents“这一行以及onFriends回调中subscribeEvent方法。或者。。。')
// 或者可以修改代码 ENVIRONMENT_CONFIG.openSubscription = false 
console.warn('|||||||||||||||||||||||||||||||||||||')
// 若修改appkey为自己的appkey后，且自己的appey暂未开通订阅权限，
// 需要注释掉im.js文件中”onpushevents: this.onPushEvents“这一行以及onFriends回调中subscribeEvent方法。
let configMap = {
    test: {
      appkey: '279ddeac0676c6046d85ce40223377e7',
      url: 'https://apptest.netease.im'
    },
    pre: {
      appkey: '279ddeac0676c6046d85ce40223377e7',
      url: 'http://preapp.netease.im:8184'
    },
    online: {
      appkey: '279ddeac0676c6046d85ce40223377e7',
      url: 'https://app.netease.im'
    },
};
ENVIRONMENT_CONFIG = configMap[envir];
// 是否开启订阅服务
ENVIRONMENT_CONFIG.openSubscription = false
ENVIRONMENT_CONFIG.privateConf = {
  "lbs_web": "http://59.111.108.145:8281/lbs/webconf.jsp",
  "link_ssl_web": false,
  "nos_uploader_web": "http://59.111.108.145:10080",
  "https_enabled": false,
  "nos_downloader": "59.111.108.145:10080/{bucket}/{object}",
  "nos_accelerate": "",
  "nos_accelerate_host": "",
  "nt_server": ""
}
// 是否开启私有化部署
ENVIRONMENT_CONFIG.openPrivateConf = false


module.exports = ENVIRONMENT_CONFIG
