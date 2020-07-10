// 获取当前图表类型，指定渲染方式
export function getD3ChartType(templateId, chartBox) {
  switch (templateId) {
    case '5544734748594536492':                           // 基础环形图（圆角）
      return new window.d3Chart.RoundCornerDonutChart(chartBox);
    case '5544734748594536493':                           // 基础饼图（圆角）
      return new window.d3Chart.RoundCornerPieChart(chartBox);
    case '5944734748594536331':                           // 玫瑰图
      return new window.d3Chart.RoseChart(chartBox);
    case '5943734748594536331':                           // 扇形玫瑰图
      return new window.d3Chart.QuarterRoseChart(chartBox);
    case '5544734748594536499':                           // 平滑对比面积图
      return new window.d3Chart.OverlapAreaChart(chartBox);
    case '5612096174443311134':                           // 阶梯折线图
      return new window.d3Chart.StepLineChart(chartBox);
    case '5945734748594536331':                           // 玉玦图
      return new window.d3Chart.RadialBarChart(chartBox);
    case '5948734748594536332':                           // 线性玉玦图
      return new window.d3Chart.RadialLineChart(chartBox);
    case '4447460703254610031':                           // 水球图
      return new window.d3Chart.WaveCircleChart(chartBox);
    case '5544734748594536473':                           // 人形柱状图
      return new window.d3Chart.IconBarChart(chartBox);
    case '5543733748594536505':                           // 两列基本桑基图
      return new window.d3Chart.SimpleSankeyChart(chartBox);
    case '5543733748594536504':                           // 横向桑基图
      return new window.d3Chart.SankeyChart(chartBox);
    case '5543533748794536504':                           // 纵向桑基图
      return new window.d3Chart.VerticalSankeyChart(chartBox);
    case '4447460703254610041':                           // 人形饼图
      return new window.d3Chart.IconPieChart(chartBox);
    case '5544734748594536494':                           // 双层环图
      return new window.d3Chart.TwoLevelDonutChart(chartBox);
    case '5544734748594536500':                           // 弦图
      return new window.d3Chart.ChordChart(chartBox);
    case '5544734748594536503':                           // 单层矩形树图
      return new window.d3Chart.OneLevelTreemapChart(chartBox);
    case '5544734748594536502':                           // 双层矩形树图
      return new window.d3Chart.TwoLevelTreemapChart(chartBox);
    case '5543734748594537504':                           // 旭日图
      return new window.d3Chart.SunburstChart(chartBox);
    case '5543734748595436502':                           // 横向无权重树图
      return new window.d3Chart.TreeChart(chartBox);
    case '5543734748594536502':                           // 横向权重树图
      return new window.d3Chart.WeightedTreeChart(chartBox);
    case '5544734748594536478':                           // 分面柱图
      return new window.d3Chart.MultipleBarChart(chartBox);
    case '5544734748594536487':                           // 人口金字塔图
      return new window.d3Chart.PyramidChart(chartBox);
    case '5544734748594536491':                           // 雷达图
      return new window.d3Chart.RadarChart(chartBox);
    case '5544734748594536486':                           // 河流图
      return new window.d3Chart.StreamgraphChart(chartBox);
    case '4612096174443311107':                           // 分组气泡图
      return new window.d3Chart.GroupingBubbleChart(chartBox);
    case '5544734748594536484':                           // 日历热力图
      return new window.d3Chart.CalendarHeatmapChart(chartBox);
    case '5612096174443311145':                           // 空心柱状图
      return new window.d3Chart.HollowChart
    case '5544734748594536330':                           // 变化瀑布图
      return new window.d3Chart.ChangeWaterfallHistogramChart(chartBox);
    case '5544734748594536326':                           // 组成瀑布图
      return new window.d3Chart.FormWaterfallHistogramChart(chartBox);
    case '5544734748594536498':                           // 平滑堆叠面积图
      return new window.d3Chart.StackedChart(chartBox);

    // ------------------ 6.2 换库之后新增  -------------------------

    case '444746070325460997':                            // 基础饼图
      return new window.d3Chart.PieChart(chartBox);

    case '444746070325460998':                            // 基础环形图
      return new window.d3Chart.DonutChart(chartBox);

    case '444746070325460999':                            // 变形饼图
      return new window.d3Chart.DeformedPieChart(chartBox);

    case '4544734748594536433':                           // 折线对比图
      return new window.d3Chart.BeeLineChart(chartBox);

    case '5948734748594536789':                           // 平滑线图
      return new window.d3Chart.SmoothLineChart(chartBox);

    case '444734748594536323':                            // 基础柱状图
      return new window.d3Chart.SimpleBarChart(chartBox);

    case '154772011302084304':                            // 基本条形图
      return new window.d3Chart.BasicHorizontalBarChart(chartBox);

    case '3612096174443311105':                           // 分组柱状图
      return new window.d3Chart.GroupedBarChart(chartBox);

    case '3612096174443311107':                           // 堆叠柱状图
      return new window.d3Chart.StackBarChart(chartBox);

    case '3612096174443311106':                           // 正负分组条形图
      return new window.d3Chart.NegativeHorizontalBarChart(chartBox);

    case '3612096174443311110':                           // 分组条形图
      return new window.d3Chart.GroupedHorizontalBarChart(chartBox);

    case '3612096174443311109':                           // 堆叠条形图
      return new window.d3Chart.StackHorizontalBarChart(chartBox);

    case '5544734748594536332':                           // 折柱混合图
      return new window.d3Chart.MixLineBarChart(chartBox);

    case '4544734748594536434':                           // 堆叠面积图（折线）
      return new window.d3Chart.StackedLinearChart(chartBox);

    case '451905388296536065':                            // 雷达图（相对值）
      return new window.d3Chart.PolygonRadarChart(chartBox);

    case '5544734748594536339':                           // 漏斗图
      return new window.d3Chart.FunnelChart(chartBox);

    case '154778025133261039':                           // 百分比堆叠面积图
      return new window.d3Chart.PercentageAreaChart(chartBox);

    case '154778102528502157':                            // 百分比堆叠柱状图
      return new window.d3Chart.PercentageBarChart(chartBox);

    case '154777746677828400':                            // 半圆环
      return new window.d3Chart.HalfPieChart(chartBox);

    case '154778171740391769':                            // 圆环进度图
      return new window.d3Chart.ProgressRoundPieChart(chartBox);

    case '154778145806026722':                            // 条状进度图
      return new window.d3Chart.BarProgressChart(chartBox);

    case '154777820323716078':                            // 半圆环进度图
      return new window.d3Chart.HalfProgressPieChart(chartBox);

    case '154771854328053247':                            // 弧长链接图
      return new window.d3Chart.ArcDiagramChart(chartBox);

    case '154778232785223023':                            // 斜率图
      return new window.d3Chart.SlopeChart(chartBox);

    case '154777693253141239':                            // 甘特图
      return new window.d3Chart.GanttChart(chartBox);

    case '154778205305403383':                            // 排名变化图
      return new window.d3Chart.RankingChangeChart(chartBox);

    case '5544734748594536495':                           // 极化对称堆叠条形图
      return new window.d3Chart.SymmetricChart(chartBox);

    case '444746070325460995':                            // 基础折线图
      return new window.d3Chart.SimpleLineChart(chartBox);

    case '7612096173333355101':                           // 对比漏斗图
      return new window.d3Chart.ContrastiveFunnelChart(chartBox);

    case '7612096173333355103':                           // 雷达图（直线相对值）
      return new window.d3Chart.RelativeRadarChart(chartBox);

    case '7612096176663355107':                           // 堆叠圆球
      return new window.d3Chart.StackCircleChart(chartBox);

    case '7612096176663355107':                           // 堆叠圆球
      return new window.d3Chart.StackCircleChart(chartBox);

    case '7612096176663355103':                           // 区间面积图
      return new window.d3Chart.RangeAreaChart(chartBox);

    case '7612096176663355104':                           // 区间柱状图
      return new window.d3Chart.RangeBarChart(chartBox);

    case '7612096176663355105':                           // 区间条形图
      return new window.d3Chart.RangeHorizontalBarChart(chartBox);

    case '7612096174443355101':                           // 极坐标下的层叠柱状图
      return new window.d3Chart.PolarStackBarChart(chartBox);

    case '7612096174443355102':                           // 极坐标下的层叠柱状图（空心）
      return new window.d3Chart.PolarStackDonutBarChart(chartBox);

    case '7612096176663355106':                           // 玫瑰图（空心）
      return new window.d3Chart.RoseDonutChart(chartBox);

    case '7612096173333355102':                           // 直方图
      return new window.d3Chart.HistogramChart(chartBox);

    case '114473474859453649':                            // 词云图
      return new window.d3Chart.WordCloudChart(chartBox);

    default:                                              // 默认
      return new window.d3Chart.PieChart(chartBox);
  }
}

// 数据请求
export function getData(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText, this)
        } else {
          var resJson = { code: this.status, response: this.response }
          reject(resJson, this)
        }
      }
    }
    xhr.send()
  })
}

// 克隆函数（这里仅仅考虑对象与数组，够用即可）
export function deepClone(o) {
  // 根据传入的元素判断是数组还是对象
  let c = o instanceof Array ? [] : {};
  for (let i in o) {
    // 注意数组也是对象类型，如果遍历的元素是对象，进行深度拷贝
    c[i] = typeof o[i] === 'object' ? deepClone(o[i]) : o[i];
  }
  return c;
}

// 检查请求地址
export function inspectUrl(id) {

  if (!id) throw new Error(`need request address`)
  let url;

  // 单图 && dataStore
  if (id.indexOf('_') > 0) {
    const tag = id.split('_')[0]
    if (tag === 'd') {
      // dataStore
      url = `https://dydata.io/dychart/data_chart_publish/${id.split('_')[1]}`
    } else if (tag === 'c') {
      // 单图
      url = `https://dydata.io/dychart/chart_publish/${id.split('_')[1]}`
    } else if (tag === 'c') {
      // iframe
    }
  } else {
    // 否则信息图
    url = `https://dydata.io/dychart/publish/${id}`
  }

  return url;
}

// 格式化请求地址
export function formatUrl(url) {
  const param = {};
  url.replace(/[?&](.*?)=([^&]*)/g, (m, $1, $2) => param[$1] = $2);
  return param;
}

// 加载移动端自适应
export function loadRem() {

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent) || /(Wechat)/i.test(navigator.userAgent) || /(WindowsWechat)/i.test(navigator.userAgent)  ) {
    // 加载 rem 布局
    (function (designWidth, maxWidth) {
      var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement('style'),
        tid;

      function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
      }

      if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
      } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
      }
      // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行 2 次
      refreshRem();

      win.addEventListener('resize', function () {
        // 防止执行两次
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }, false);

      win.addEventListener('pageshow', function (e) {
        // 浏览器后退的时候重新计算
        if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      }, false);

      if (doc.readyState === 'complete') {
        doc.body.style.fontSize = '16px';
      } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
          doc.body.style.fontSize = '16px';
        }, false);
      }
    })(750, 750);
    document.querySelector('body').classList.add('is-mobile')
  }
}

// 判断是否是移动端
export function isMobile() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent) || /(WindowsWechat)/i.test(navigator.userAgent)
}

// 节流
export function throttle(fn, delay) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, delay);
  }
};

// 弹窗
export function loadModal(tag, url, fn) {
  const modal = document.createElement('div')

  if (tag && tag === 'not-found') {
    modal.innerHTML = `
      <div class="not-found-box">
        <div class="box-header">
          <img src="https://ss1.dydata.io/dylog-m1.png" alt="logo">
        </div>
        <div class="title">项目不存在</div>
        <p>您访问的项目链接已经失效，目前无法访问</p>
        <a href="https://dycharts.com/appv2/#/pages/home/createproject" alt="create-project"><button>免费创建项目</button></a>
      </div>
    `
  } else if (tag && tag === 'password') {
    modal.innerHTML = `
      <div class="password-box">
        <div class="box-header">
          <img src="https://ss1.dydata.io/dylog-m1.png" alt="logo">
        </div>
        <div class="title">加密项目</div>
        <p>该项目受保护，您需要通过密码访问</p>
        <input type="password" placeholder="请输入密码" />
        <div class="msg">请输入密码</div>
        <button>打开</button>
      </div>
    `
  }
 
  modal.className = 'project-modal'
  document.querySelector('body').appendChild(modal)

  // 事件绑定
  if (tag && tag === 'password') {
    const input = document.querySelector('.password-box input')
    const msg = document.querySelector('.password-box .msg')
    const button = document.querySelector('.password-box button')

    input.addEventListener('keyup', function(e) {
      if (e.target.value === '') {
        msg.innerHTML = '请输入密码'
        msg.style.visibility = 'visible'
      } else {
        msg.style.visibility = 'hidden'
      }
    })

    button.addEventListener('click', function() {
      if (input.value !== '') {
        getData(`${url}?password=${input.value}`).then(function (res) {
          const data = JSON.parse(res)
          if (data.resultCode === 6004) {
            msg.innerHTML = '密码错误'
            msg.style.visibility = 'visible'
          } else if (data.resultCode === 1000) {
            document.querySelector('body').removeChild(modal)
            fn && fn(data)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    })
  }
}

// 封装querySelector方法
export function $(ele) {
  return document.querySelector(ele);
}

export function createModel(data, el) {
  const modal = document.createElement('div');
  modal.innerHTML = data;
  el.appendChild(modal)
}

export function formatFloatNumber(data) {
  console.log(data);
  
  const newData = (deepClone(data)).map(item => {
    return item.map(item => {
      if (item === '') {
        return;
      } else {
        if (!isNaN(item) && (item !== parseInt(item))) {
          return Math.ceil(Number(item) * 10000) / 10000
        } else {
          return item
        }
      }
    })
  })
  return newData;
}