import IMController from '../../controller/im.js'
import { connect } from '../../redux/index.js'
import sha256 from '../../vendors/sha256'
import sha1 from '../../vendors/sha1'

let app = getApp()
let store = app.store
let pageConfig = {
  data: {
    account: '',// 用户输入账号
    password: ''//用户输入密码
  },
  // 测试使用
  onLoad() {
    this.resetStore()
  },
  onShow() {
    this.resetStore()
  },
  onShareAppMessage() {
    return {
      title: '网易云信DEMO',
      path: '/pages/login/login'
    }
  },
  /**
   * 重置store数据
   */
  resetStore: function () {
    store.dispatch({
      type: 'Reset_All_State'
    })
  },
  /**
   * 用户输入事件：dataset区分输入框类别
   */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },
  /**
   * 单击注册:跳转注册页
   */
  registerTap: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 执行登录逻辑
   */
  doLogin: function () {

    // lbl -2021/10/21 start
    var password = this.data.password;
    var juliao123 = "juliao123";
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var  passwordHash = sha1.sha1(sha256.sha256_digest(sha256.sha256_digest(password+ juliao123)) + timestamp);
    
    wx.request({
      url: 'http://115.159.211.222:8008/api/login/userlogin', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        UserEmail: this.data.account,
        PasswordHash: passwordHash,
        Timestamp:timestamp
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
       
        var accId = res.data.data.Accid;
        var accToken = res.data.data.AccToken;
        var curMasterAccId = res.data.data.CurMasterAccId;
        new IMController({
          token: accToken,
          account: accId,
          CurMasterAccId:curMasterAccId
        })
      }

      
    })
    // lbl -2021/10/21 end
   
   
  }
}
let mapStateToData = (state) => {
  return {
    isLogin: state.isLogin || store.getState().isLogin
  }
}
const mapDispatchToPage = (dispatch) => ({
  loginClick: function() {
    this.doLogin()
    return
  }
})
let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

Page(connectedPageConfig)
