//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    indicatorColor: '#f7f7f7',
    mianyang_map_markers: [
      {
        iconPath: "/static/icons/map_marker.png",
        id: 0,
        latitude: 31.457208,
        longitude: 104.718552,
        width: 30,
        height: 30
      }
    ],
  },
  onLoad: function() {
    
  },
  openLocation: function(e) {
    if (!e.changedTouches) {
      return;
    }
    wx.openLocation({
      latitude: 31.457208,
      longitude: 104.718552,
      name: '王子大酒店',
    });
    e.stop
  }
})