// pages/bless/bless.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message: '',
    other_messages: [],
    message_height: 0,
  },
  onMessageChange: function(data, event) {
    this.setData({
      message: data.detail.value,
    })
  },
  sendMessage: function() {
    const msg = this.data.message.trim();
    if (msg.length <= 0) {
      return;
    }
    const new_msg = {
      nick: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      msg: msg,
    }
    var other_msgs = this.data.other_messages;
    other_msgs.push(new_msg);
    wx.request({
      url: 'https://www.lorryzz.cn/wedding/messages/new',
      method: 'post',
      data: new_msg,
    })
    this.setData({
      other_messages: other_msgs,
      message: '',
      message_height: other_msgs.length * 1000,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
        },
        fail: res => {
          console.log('fail: ', res)
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  fetchMessages: function() {
    wx.request({
      url: 'https://www.lorryzz.cn/wedding/messages',
      method: 'post',
      data: {},
      success: (res) => {
        this.setData({
          other_messages: res.data.data.reverse(),
        });

        if (this.data.visible) {
          setTimeout(() => {
            this.fetchMessages();
          }, 2000)
        }
      }
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
    this.setData({
      visible: true,
    }, () => {
      this.fetchMessages();
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      visible: false,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  }
})