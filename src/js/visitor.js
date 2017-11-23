var r = n(355)
, i = n.n(r)
, s = "http://zhongla.apibi.palmap.cn/hbi/v1/gddx/"
, m = {
  totalIn: s + "connectionFlowDay",
  realTime: s + "connectionFlow",
  avgStay: s + "getAvgDwellForConnectionMac",
  phoneBrand: s + "brandRankList",
  popularEx: s + "getFenceFlowWithTime",
  connectTrend: s + "getShopConnectionNumTrend",
  heatMap: s + "getPointTrend?",
  totalNum: s + "accumulatedFlow"
}


var F = echarts.init(document.getElementById("stayTime"));
F.showLoading({
  maskColor: "transparent"
});
var B = null
, M = function(e, a) {
  for (var n = [], t = 0, o = e.length; t < o; t++)
      n.push(e[t][a]);
  return n
}
, H = function(e, a) {
  for (var n = [], t = 0, o = e.length; t < o; t++)
      n.push(e[t][a]);
  return n
}
, P = function() {
  B && (clearTimeout(B),
  B = null),
  $.get(m.connectTrend).done(function(e) {
      if (e) {
          for (var a = 0; a < e.length; a++)
              if ("18:00" === e[a].key) {
                  e = e.slice(0, a);
                  break
              }
          for (var n = 0; n < e.length; n++)
              if ("08:00" === e[n].key) {
                  e = e.slice(n);
                  break
              }
          var t = [];
          if (e.length > 96)
              for (var o = 0; o < e.length; o++)
                  o % 4 == 0 && t.push(e[o]);
          else if (e.length > 48)
              for (var l = 0; l < e.length; l++)
                  l % 2 == 0 && t.push(e[l]);
          else
              t = i()(e);
          e = t,
          F.hideLoading();
          var r = {
              title: {
                  text: "WiFi用户趋势图",
                  show: !1
              },
              tooltip: {
                  trigger: "axis"
              },
              legend: {
                  data: []
              },
              grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: !0
              },
              toolbox: {
                  feature: {}
              },
              xAxis: {
                  type: "category",
                  boundaryGap: !1,
                  splitLine: {
                      show: !1
                  },
                  axisLabel: {
                      textStyle: {
                          color: "#677789"
                      }
                  },
                  axisPointer: {
                      lineStyle: {
                          color: "pink",
                          width: 2,
                          opacity: .5
                      }
                  },
                  data: M(e, "key")
              },
              yAxis: {
                  type: "value",
                  splitLine: {
                      show: !1
                  },
                  axisLabel: {
                      textStyle: {
                          color: "#677789"
                      }
                  }
              },
              series: [{
                  type: "line",
                  symbol: "circle",
                  symbolSize: 16,
                  itemStyle: {
                      normal: {
                          color: {
                              type: "radial",
                              x: .5,
                              y: .5,
                              r: .5,
                              colorStops: [{
                                  offset: 0,
                                  color: "#84CCF2"
                              }, {
                                  offset: 1,
                                  color: "#4062F2"
                              }],
                              globalCoord: !1
                          }
                      },
                      emphasis: {
                          color: {
                              type: "radial",
                              x: .5,
                              y: .5,
                              r: .5,
                              colorStops: [{
                                  offset: 0,
                                  color: "pink"
                              }, {
                                  offset: 1,
                                  color: "pink"
                              }],
                              globalCoord: !1
                          }
                      }
                  },
                  lineStyle: {
                      normal: {
                          color: "#82E1F6",
                          width: 3
                      }
                  },
                  data: H(e, "value")
              }]
          };
          F.setOption(r);
          var s = {};
          s.currentIndex = -1,
          B = setInterval(function() {
              var e = r.series[0].data.length;
              F.dispatchAction({
                  type: "downplay",
                  seriesIndex: 0,
                  dataIndex: s.currentIndex
              }),
              s.currentIndex = (s.currentIndex + 1) % e,
              F.dispatchAction({
                  type: "highlight",
                  seriesIndex: 0,
                  dataIndex: s.currentIndex
              }),
              F.dispatchAction({
                  type: "showTip",
                  seriesIndex: 0,
                  dataIndex: s.currentIndex
              })
          }, 2e3)
      }
  }).error(function(e) {
      console.error(e)
  })
};
P();