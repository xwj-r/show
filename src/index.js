import './css/index.scss';
import {
  config
} from '../config'
import {
  block
} from '../data'
import {
  getD3ChartType,
  getData,
  deepClone,
  inspectUrl,
  formatUrl,
  loadRem,
  isMobile,
  throttle,
  loadModal,
  $,
  createModel,
  formatFloatNumber
} from './js/util'

// import { Button } from 'selenium-webdriver';

class ShowPage {

  constructor(options) {

    // D3 密钥判断
    const that = this;

    // const projectId = location.pathname.match('[^/]+(?!.*/)')[0];
    window.d3Chart.setUserMd('c53822d351882c0c49acafc7c44f09ca')

    // 声明配置参数
    const defaultOptions = {
      // url: `https://dydata.io/vis/dychart/publish/${projectId}`
      url: '',

      publishTime: '', // 发布时间
      dataSouce: '', // 数据来源
      hidewatermark: false, // 隐藏背景水印
      hidelogo: false, // 隐藏log
      screenshot: {}, // 无水印截图参数
      screenshot_un: {}, // 有水印截图参数
      fileType: '',
      isSubscribed: false,
      isLogined: true,
      subscribeLoadfg: false,
      showLikeMask: false,
      itemId: '',
      metaId: '',
      sessionId: '',
      task: 0,
      imgurls: {
        watermarkImg: "",
        nowatermarkImg: "",
      },
      transmitLoadfg: false,
      // IOS 和 Android 弹窗
      showAndroidMask: false,
      showIOSMask: false,
      showViewDataTip: true,

      originalData: [
        []
      ],
      showTips: true,
      uploadImg_height: 0,
      // 判断是否是安卓手机
      isAndroid: false,
      // 阻止滑动
      flag: false,
      hasPaid:"",

      // 显示提示的数字  1 表示不显示提示  2 表示提示买高级会员 3 表示购买高级会员或者支付 4 表示收藏数据去网站购买
      showTipNum: 4,

      // 存放数据权限对象
      jsonDict: {
        data_permission: 'must_paid',
        is_senior_vip: false,
        payment_status: false,
        geotype: "3" // 1 是自营 3 是第三方
      }
    }

    // 合并参数
    this.opts = Object.assign({}, options, defaultOptions);
    
    // 判断是否为移动端，如果是则加载移动端样式
    loadRem()

   
    // 赋值配置属性
    this.initData()
    // 获取数据详情
    this.getDataDetail()
    
    // 如果使用的本地数据
    if (config.usingLocalData) {
      that.resolveArticle(block)
    } else {
      const that = this;

      getData(this.opts.url).then(function (res) {

        const data = JSON.parse(res)        
        if (data.resultCode === 1000) {
          that.loadBlock(data.data.article.contents.pages[0].blocks[0])
          that.opts.data = data.data;
          that.resolveArticle(data.data)
        } else if (data.resultCode === 6003) {
          // 加密项目
          // loadModal('password', that.opts.url, function(data) {
          //   that.resolveArticle(data.data)
          // })
        } else if (data.resultCode === 3001) {
          // 项目不存在
          // loadModal('not-found', that.opts.url)
        }
      }).catch(function (status) {
        console.log(`${status}`)
      })
    }

    // 绑定点击事件
    this.addEvent()

  }

  // 赋值配置属性
  initData() {
    // this.opts.uploadImg_height = $('.from').getBoundingClientRect().y + $('.from').getBoundingClientRect().height;
    // console.log('heig'+this.opts.uploadImg_height);
    const urlData = formatUrl(location.href);

    this.opts.url = inspectUrl(urlData.id);

    if (!urlData.hidewatermark) {
      this.opts.hidewatermark = false;
    } else {
      this.opts.hidewatermark = urlData.hidewatermark === "true";
    }

    if (!urlData.hidelogo) {
      this.opts.hidelogo = false;
    } else {
      this.opts.hidelogo = urlData.hidelogo === "true";
    }
    // if(urlData.publishTime.length >= 10){
    //   this.opts.publishTime = urlData.publishTime.substring(0,10);
    // }else{
    //   this.opts.publishTime = '';
    // }
    // this.opts.dataSouce = urlData.dataSouce ? decodeURIComponent(urlData.dataSouce)+'</br>更多数据请在pc端登陆官网www.dydata.io' : '';
    
    // this.opts.isSubscribed = urlData.isSubscribed === "true";

    // this.opts.metaId = urlData.metaId;
    // this.vipLevel = urlData.vipLevel;
    // this.scrftoken = urlData.csrfToken;
    this.opts.sessionId = urlData.sessionId;
    // this.opts.fileType = urlData.fileType;
    // this.opts.isLogined = urlData.isLogined === "true";
    // this.opts.hasPaid = urlData.hasPaid === "true";


    // 默认通知微信小程序访问历史信息
    let history = {
      id: urlData.id,
      metaId: this.opts.metaId,
      fileType: this.opts.fileType
    };
    let historyData = JSON.stringify(history);
    window["wx"] && window["wx"].miniProgram.postMessage({ data: historyData });
    
    // 判断是安卓还是 ios 用户
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      this.opts.isAndroid = false;     
    } else if (/(Android)/i.test(navigator.userAgent)) {
      this.opts.isAndroid = true; 
    }

  }

  /**
   * @description [getDataDetail 获取数据详情]
   *
   * @memberof WeixinPreviewComponent
   */
  getDataDetail() {
    const that = this;
    that.opts.itemId = formatUrl(location.href).id.split('d_')[1];
    document.cookie = 'csrftoken=fs4J0NeAOSXXu2fcvaTi9fVdHaKj1P9qwdnrhkgbShGF4rKMS6I0AzPpWGpwXTJy';
    // const url = `http://192.168.31.146/mapp/detail/ref_info/1839615731772297216/?sessionId=qil2hmfy8eenyo40zgnm72d8hqv0jyk6`;
    const url = `https://www.dydata.io/mapp/detail/ref_info/${that.opts.itemId}/?sessionId=${that.opts.sessionId}`;
    
    jQuery.ajax({
      url: url,
      type: 'get',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      contentType: false,

      success: function (res) {
        let urlData = res.data;
        if(String(urlData.publish_time).length >= 10){
          that.opts.publishTime = urlData.publish_time.substring(0,10);
          }else{
            that.opts.publishTime = '';
          }
          that.opts.dataSouce = urlData.source ? decodeURIComponent(urlData.source)+'</br>更多数据请在pc端登陆官网www.dydata.io' : '';

          that.opts.isSubscribed = urlData.is_subscribed;

          that.opts.metaId = urlData.meta_id;
          that.opts.fileType = urlData.file_type;
          // that.opts.isLogined = urlData.is_logined; //目前不做判断逻辑 20210303
          that.opts.hasPaid = urlData.has_paid;

          // if (!that.opts.isLogined) {
          //   $(".login-mask").classList.remove('active')
          // }
        // that.opts.jsonDict = deepClone(res.data);
        // switch (that.opts.jsonDict.data_permission) {
        //   case 'free':
        //     that.opts.showTipNum = 1;
        //     break;
        //   case 'need_senior_vip':
        //     that.opts.showTipNum = 2;
        //     break;
        //   case 'need_senior_vip_or_paid':
        //     that.opts.showTipNum = 3;
        //     break;
        //   case 'must_paid':
        //     that.opts.showTipNum = 4;
        //     break;

        //   default:
        //     break;
        // }
        //this.showTipNum = 1;
        //resolve();
      },
      error: function (res) {
        console.log(res)
      }
    });
  }


  // 绑定事件
  addEvent() {
    const that = this;
    // 监听全屏按钮
    // $('.full-page').addEventListener('click', function () {
    //   if (document.fullscreenElement) {
    //     document.exitFullscreen()
    //   } else {
    //     $('header').style.display = 'none'
    //     $('footer').style.display = 'none'
    //     $('main').style.paddingBottom = '0'
    //     document.documentElement.requestFullscreen();
    //   }
    // })
    // document.addEventListener('fullscreenchange', function (e) {
    //   if (!document.fullscreenElement) {
    //     $('header').style.display = 'flex'
    //     $('footer').style.display = 'block'
    //     $('main').style.paddingBottom = '50px'
    //   }
    // })
    document.addEventListener('touchmove', function (event) { //监听滚动事件
      if (that.opts.flag) {
        event.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
      }
    }, {
      passive: false
    });

    $('.view-data').addEventListener('click', function () {
      // 是否登录
      if (!that.opts.isLogined) {
        window["wx"] && window["wx"].miniProgram.navigateTo({
          url: '/pages/auth/auth'
        });
      } else {
        // new Promise((resolve, reject) => {
        //   if ($('.view-data-text').innerHTML === '查看数据') {
        //     // 获取数据详情，判断文字内容显示
        //     //that.getDataDetail(resolve);
        //     resolve();
        //   } else {
        //     resolve();
        //   }
        // }).then(() => {

          if (!$('.page').classList.contains('active')) {
            $('.page').classList.add('active');
            $('.weixin-table').classList.remove('active')
            $('.view-data-img').src = './images/pie.svg';
            $('.view-data-text').innerHTML = "查看图表";
            $('.publish-time').classList.add('active');
            $('.view-data-tip').classList.remove('active');
            $('.from-tooltip').classList.add('active');
            
            $('body').setAttribute('style','position: fixed');
            window.scroll(0,0)
            // 百度统计
            window['_hmt'].push(['_trackEvent', 'wxshow', 'wxshow', 'wxshow-checkChart']);
          } else {
            $('.page').classList.remove('active');
            $('.weixin-table').classList.add('active');
            $('.view-data-img').src = './images/excel.svg';
            $('.view-data-text').innerHTML = "查看数据";
            $('.publish-time').classList.remove('active');
            $('.view-data-tip').classList.add('active');
            $('.from-tooltip').classList.remove('active');
            
            $('body').setAttribute('style','position: auto');
            // 百度统计
            window['_hmt'].push(['_trackEvent', 'wxshow', 'wxshow', 'wxshow-checkData']);
          }
        // })
      }
    })

    // $(".login-return").addEventListener("click", function() {
    //   window["wx"].miniProgram.switchTab({
    //     url: `/pages/home/index`
    //   });
    // })


    // $(".login-wx").addEventListener("click", function() {
    //   window["wx"] && window["wx"].miniProgram.navigateTo({
    //     url: '/pages/auth/auth'
    //   });
    // })

    $('.home').addEventListener('click', function () {
      // 百度统计
      window['_hmt'].push(['_trackEvent', 'wxshow', 'wxshow', 'wxshow-returnIndex']);
      window["wx"].miniProgram.switchTab({
        url: `/pages/home/index`
      });
    })

    $('.collection').addEventListener('click', function () {
      // 百度统计
      window['_hmt'].push(['_trackEvent', 'wxshow', 'wxshow', 'wxshow-like']);

      const opts = that.opts;

      if (!opts.isLogined) {
        window["wx"] && window["wx"].miniProgram.navigateTo({
          url: '/pages/auth/auth'
        });
      } else {
        if (!opts.subscribeLoadfg) {
          //修改样式
          if ($('.collection').classList.contains('active')) {
            $('.collection').classList.remove('active')
          } else {
            $('.collection').classList.add('active')
          }

          opts.subscribeLoadfg = true;
          opts.isSubscribed = (!opts.isSubscribed);

          if (opts.isSubscribed) {
            opts.showLikeMask = true;
            $('.like-mask').classList.remove('active')
            opts.flag = true;
            setTimeout(() => {
              $('.like-mask').classList.add('active')
              opts.flag = false;
            }, 1000);
          } else {
            opts.showDisLikeMask = true;
            $('.disLike-mask').classList.remove('active')
            opts.flag = true;
            setTimeout(() => {
              opts.showDisLikeMask = false;
              $('.disLike-mask').classList.add('active')
              opts.flag = false;
            }, 1000);
          }
          let url = "https://www.dydata.io/mapp/user/favorite"; //"/mapp/user/favorite"  ;
          let datap = `?metaId=${opts.metaId}&id=${opts.data.id}&isAdded=${opts.isSubscribed}&sessionId=${opts.sessionId}`;
          url += datap;

          getData(url).then((res) => {
            opts.subscribeLoadfg = false;
          });
        } else {
          alert("请不要频繁操作!");
        }
      }
    })

    // $('.purchase').addEventListener('click', function () {
    //   window["wx"].miniProgram.switchTab({
    //     url: `/pages/mymembership/index`
    //   });
    // })

    // $('.transmit').addEventListener('click', function () {
    //   // 百度统计
    //   window['_hmt'].push(['_trackEvent', 'wxshow', 'wxshow', 'wxshow-saveShare']);
    //   const opts = that.opts;
    //   if (!opts.isLogined) {
    //     window["wx"] && window["wx"].miniProgram.navigateTo({
    //       url: '/pages/auth/auth'
    //     });
    //   } else {
    //     if (!opts.transmitLoadfg) {
    //       opts.transmitLoadfg = true;
    //       opts.flag = true;
    //       createModel(`<div class="m-modal">
    //       <div class="m-modal-content">
    //           正在处理数据，请稍等......
    //       </div>
    //       </div>`, $("body"))
    //       setTimeout(() => {
    //         opts.imgurls.nowatermarkImg = null;
    //         opts.imgurls.watermarkImg = null;
    //         that.uploadImg(false);
    //         that.uploadImg(true);
    //       });
    //       opts.task = window.setInterval(() => {
    //         //console.log(JSON.stringify(opts.imgurls));
    //         if (opts.imgurls.nowatermarkImg && opts.imgurls.watermarkImg) {
    //           let nwi = encodeURIComponent(opts.imgurls.nowatermarkImg);
    //           let wi = encodeURIComponent(opts.imgurls.watermarkImg);
    //           //console.log(nwi + " " + wi);
    //           clearInterval(opts.task);
    //           opts.task = 0;
    //           opts.transmitLoadfg = false;
    //           $('.m-modal').remove();
    //           opts.flag = false;
    //           window["wx"].miniProgram.navigateTo({
    //             url: `/pages/viewchart/index?nowatermarkImg=${nwi}&watermarkImg=${wi}`
    //           });
    //         }
    //       }, 300);
    //     }
    //   }
    // })

    $('.download').addEventListener('click',()=>{
      const opts = that.opts;

      if (!opts.isLogined) {
        window["wx"] && window["wx"].miniProgram.navigateTo({
          url: '/pages/auth/auth'
        });
      } else {
        // let urlData = formatUrl(location.href);
        // let id = urlData.id
        // if (id.indexOf("_") > 0) {
        //   id = id.split("_")[1]
        // }

        
        // // 复制进剪切板
        //   var oInput = document.createElement('input');
        //   oInput.readOnly = "readOnly"
        //   oInput.value = "http://www.dydata.io/datastore/detail/" + id;
        //   document.body.appendChild(oInput);
        //   // 选择对象
        //   oInput.select();
        //   // 执行浏览器复制命令
        //   document.execCommand("Copy");
        //   $('.download-mask').classList.remove('active')
        $('.download-mask').classList.remove('active')
      }   
    })


    $('.download-copy').addEventListener('click',()=> {
      // 选择对象
      $('.model-url').select();
      // 执行浏览器复制命令
      document.execCommand("Copy");
      $('.download-mask').classList.add('active')
      // if ($(".tip").style.display === "none" || getComputedStyle($(".tip")).display === "none") {
      //   setTimeout(() => {
      //     $(".tip").style.display = "none";
      //   },3000)
      // }
      // $(".tip").style.display = "block"
      weui.toast('复制成功', {
        duration: 3000,
        className: "bears"
      });

    })

    $('.download-close').addEventListener("click",()=> {
      $('.download-mask').classList.add('active')
    })

    // $('.button-group').addEventListener('click', function () {
    //   $('.download-mask').classList.add('active');
    // })

    // $('.button-group').addEventListener('click', function () {
    //   $('.like-mask').classList.add('active')
    //   that.opts.flag = false;
    // })
  }

  //数据解密
  loadBlock(block) {

    var Base64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
      },
      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = Base64._utf8_decode(output);
        return output;
      },
      _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
        return utftext;
      },
      _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0,
          c1 = 0,
          c2 = 0,
          c3;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
          }
        }
        return string;
      }
    }

    // // 设置主题色
    // this.themeBackground.background = block.theme.colors[0];

    // 先将数据解密


    let dataSrc = deepClone(block.dataSrc.data[0]);
    const newDataSrc = [];
    dataSrc.forEach(list => {
      var res = list.map(function (item, index, input) {
        if (!isNaN(item)) {
          return item - 3;
        } else {
          if (/^b/.test(item)) {
            try {
              return Base64.decode(item.substring(1))
            } catch (err) {
              console.log(err)
            }
          }
        }
      })
      newDataSrc.push(res)
    })
    dataSrc = newDataSrc;

    this.opts.originalData[0] = formatFloatNumber(newDataSrc);

    // 判断是否过滤，列 6 行 6
    let newData;
    if (dataSrc.length > 4) {
      newData = dataSrc.slice(0, 4);
    } else {
      newData = dataSrc;
    }
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].length > 4) {
        newData[i] = newData[i].slice(0, 4)
      }
    }
    block.dataSrc.data[0] = newData;

    // try {
    //   const componentFactory: ComponentFactory<BlockComponent> = this.componentFactoryResolver.resolveComponentFactory(BlockComponent);
    //   const viewContainerRef = this.chartHost.viewContainerRef;
    //   const componentRef = viewContainerRef.createComponent(componentFactory);
    //   componentRef.instance.data = {
    //     setting: block,
    //   };
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // 解析项目
  resolveArticle(data) {
    const newData = deepClone(data)
    console.log(data);
    // 设置项目标题
    document.title = newData.title === '' ? '未命名' : newData.title

    // 初始化页面数据
    this.createTip(newData.title);

    // 解析 pageT
    this.resolveDesign(newData.article.contents.design)

    // 解析 block
    this.resolveBlock(newData.article.contents.pages[0].blocks)

    // 过滤数据
    this.filterData()  
  }
  
  // 初始化页面数据
  createTip(title) {
    $('h4').innerHTML = title;
    $('.title').innerHTML = title;
    let tip = $('.view-data-tip');
    const showViewDataTip = this.opts.showViewDataTip;
    const isAndroid = this.opts.isAndroid;
    const showTipNum = this.opts.showTipNum;
    const isSeniorVip = this.opts.jsonDict.is_senior_vip;
    const paymentStatus = this.opts.jsonDict.payment_status;
    let urlData = formatUrl(location.href);
    let id = urlData.id
    if (id.indexOf("_") > 0) {
      id = id.split("_")[1]
    }

    $('.model-url').value = "http://www.dydata.io/datastore/detail/" + id;

    if (this.opts.hidewatermark) {
      $('main').classList.remove('active');
    }

    const margin_top = $('header').getBoundingClientRect().height;

    $('.weixin-table').setAttribute('style', `top: ${margin_top + 5}px`);

    if (this.opts.hidelogo) {
      $('.page-logo').classList.add('active');
    }

    if(!this.opts.hasPaid) {
      tip.innerHTML = '注：标*部分数据在下载后的文件中完整显示';     
    }
    // 头部tips
    // if (showViewDataTip && !isAndroid && showTipNum === 2 && !isSeniorVip) {
    //   tip.innerHTML = '高级会员可查看*处隐藏数据<br>前往dycharts.com了解更多'
    // } else if (showViewDataTip && isAndroid && showTipNum === 2 && !isSeniorVip) {
    //   tip.innerHTML = '高级会员可查看*处隐藏数据<br>点击底部「购买」成为高级会员'
    // } else if (showViewDataTip && !isAndroid && showTipNum === 4 && !paymentStatus) {
    //   tip.innerHTML = '第三方数据请添加为「喜欢」<br>前往dycharts.com「我的喜欢」了解详情'
    // } else if (showViewDataTip && isAndroid && showTipNum === 4 && !paymentStatus) {
    //   tip.innerHTML = '第三方数据请添加为「喜欢」<br>前往dycharts.com「我的喜欢」单独购买'
    // } else if (showViewDataTip && !isAndroid && showTipNum === 3 && !paymentStatus && !isSeniorVip) {
    //   tip.innerHTML = '高级会员可查看*处隐藏数据<br>前往dycharts.com了解更多'
    // } else if (showViewDataTip && isAndroid && showTipNum === 3 && !paymentStatus && !isSeniorVip) {
    //   tip.innerHTML = '高级会员可查看*处隐藏数据<br>点击底部「购买」成为高级会员'
    // }

    if (this.opts.publishTime) {
      $('.publish-time').innerHTML = `发布时间：${this.opts.publishTime}`
    }
    if (this.opts.dataSouce) {
      $('.dataSouce').innerHTML = `数据来源：${this.opts.dataSouce}`
    }

    // 底部tips
    if (this.opts.showTips) {
      setTimeout(() => {
        $('.tips').style.display = 'none';
      }, 5000);
    }

    if (isMobile()) {
      $('.from-tooltip').classList.remove('active');
    }

    // 默认通知微信小程序访问历史信息
    let history = {
      id: this.opts.data.id,
      metaId: this.opts.metaId,
      fileType: this.opts.fileType
    };

    let historyData = JSON.stringify(history);
    window["wx"] && window["wx"].miniProgram.postMessage({
      data: historyData
    });

    if (this.opts.isSubscribed) {
      $('.collection').classList.add('active');
    }

    // if ((isAndroid && showTipNum === 2 && !isSeniorVip) || (isAndroid && showTipNum === 3 && !isSeniorVip && !paymentStatus)) {
    //   $('.purchase').setAttribute("style", "display: block");
    // }   
  }


  // 过滤数据
  filterData() {
    let hiddenData;

    // 免费 需要高级会员 需要支付
    // alert(`data_permission:${this.jsonDict.data_permission} is_senior_vip: ${this.jsonDict.is_senior_vip} payment_status: ${this.jsonDict.payment_status}`)
    // if (this.opts.showTipNum === 1 || ((this.opts.showTipNum === 2 || this.opts.showTipNum === 3) && this.opts.jsonDict.is_senior_vip) || ((this.opts.showTipNum === 3 || this.opts.showTipNum === 4) && this.opts.jsonDict.payment_status)) {
    if (this.opts.hasPaid) {
      hiddenData = deepClone(this.opts.originalData[0]);
    } else {
      hiddenData = (deepClone(this.opts.originalData[0])).map((item, index) => {
        // 如果行大于第 4 项，从第 5 项开始，数据变成 * 号（第一列数据不变）
        if (index >= 4) {
          item = item.map((d, i) => {
            if (i > 0) {
              d = '*';
            }
            return d;
          })
        }

        // 如果列大于第 4 项，从第 5 项开始，数据变成 * 号（第一行不变）
        if (index !== 0 && item.length >= 4) {
          item = item.map((d, i) => {
            if (i >= 4) {
              d = '*';
            }
            return d;
          })
        }

        // 将数据变成 8 项，不足的就会填充空白数据，多余的就会裁掉
        // if (this.originalData[0][0].length > 8) {
        //   item.length = 8;
        // }

        return item;
      });
    }
    
    this.createTable(hiddenData)
  }
  // 创建表格
  createTable(data) {
    const trs = $('.table-tbody')
    if (data) {
      data.map(items => {
        const tr = document.createElement('tr')
        items.forEach(element => {
          if(element){
            tr.innerHTML += `<td>${element}</td>`
          }else{
            tr.innerHTML += `<td></td>`
          }
        });
        trs.appendChild(tr);
      })
    }
  }

  // 解析 page
  resolveDesign(design) {
    const page = $('.page')
    const pageBox = $('article')
    this.setCss(page, {
      width: design.width,
      height: design.height,
      //backgroundColor: design.backgroundColor
    })

    this.updatePageSize(page, pageBox, design)

    // 窗口变化事件
    if (isMobile()) {
      const that = this;
      window.onresize = throttle(function () {
        that.updatePageSize(page, pageBox, design)
      }, 200);
    }
  }

  // 动态更新页面大小
  updatePageSize(page, pageBox, design) {
    // 针对画布大小单独处理
    let scaleWidth;
    if (isMobile()) {
      scaleWidth = document.body.clientWidth
    } else if (window.self !== window.top) {
      // iframe
    } else {
      scaleWidth = '700';
    }
    const scale = scaleWidth / design.width;
    page.style.transform = `scale(${scale})`

    if (isMobile()) {
      pageBox.style.height = design.height * scale + 'px'
    } else {
      pageBox.style.height = design.height * scale + 80 + 'px'
    }
  }

  // 解析 block
  resolveBlock(blocks) {
    for (let i = 0; i < blocks.length; i++) {
      switch (blocks[i].type) {
        case 'image':
          this.resolveImg(blocks[i])
          break;

        case 'chart':
          this.resolveChart(blocks[i])
          break;

        case 'text':
          this.resolveText(blocks[i])
          break;

        case 'shape':
          this.resolveShape(blocks[i])
          break;

        default:
          break;
      }
    }
  }

  // 解析 image
  resolveImg(block) {
    const box = $('.page')
    const img = document.createElement('img')
    const blockProps = block.props

    // 针对图片单独处理
    if (config.usingLocalData) {
      img.src = `../../images/${new URL(block.src).pathname.match('[^/]+(?!.*/)')[0]}`
    } else {
      img.src = block.src
    }

    this.setCss(img, {
      left: block.position.left,
      top: block.position.top,
      width: blockProps.size.width,
      height: blockProps.size.height,
      border: `${blockProps.border.strokeWidth}px ${blockProps.border.strokeType} ${blockProps.border.strokeColor}`,
      borderRadius: blockProps.borderRadius,
      opacity: blockProps.opacity,
      transform: blockProps.size.rotate
    })

    box.appendChild(img)
  }

  // 解析 block
  resolveChart(block) {
    const box = $('.page')
    const chart = document.createElement('div')
    chart.className = 'block-container'
    const blockProps = block.props

    this.setCss(chart, {
      left: block.position.left,
      top: block.position.top,
      width: blockProps.size.width,
      height: blockProps.size.height,
      transform: blockProps.size.rotate
    })
    box.appendChild(chart)

    // 容器添加完成以后渲染图表
    getD3ChartType(block.templateId, chart).setOption(block)


  }

  // 解析文本
  resolveText(block) {
    const box = $('.page')
    const text = document.createElement('textarea')
    const blockProps = block.props
    text.innerHTML = blockProps.content
    text.readOnly = 'readonly'
    text.className = 'textarea'

    this.setCss(text, {
      left: block.position.left,
      top: block.position.top,
      width: blockProps.size.width,
      height: blockProps.size.height,
      transform: blockProps.size.rotate,
      opacity: blockProps.opacity,
      // 独有属性
      fontSize: blockProps.fontSize,
      fontFamily: blockProps.fontFamily,
      color: blockProps.color,
      letterSpacing: blockProps.letterSpacing,
      lineHeight: blockProps.lineHeight,
      textAlign: blockProps.basic.align,
      fontWeight: blockProps.basic.bold
    })

    box.appendChild(text)
  }

  // 解析 shape
  resolveShape(block) {
    switch (block.shapeType) {
      // 图标
      case 'icon':
        this.resolveIcon(block)
        break;

        // 其他 shape
      default:
        this.resolveDefaultShape(block)
        break;
    }
  }

  // 解析 icon
  resolveIcon(block) {
    const box = $('.page')
    const shapeBox = document.createElement('div')
    const blockProps = block.props
    shapeBox.className = 'shape-box'
    shapeBox.innerHTML = block.src

    // 设置 shape 盒子位置
    this.setCss(shapeBox, {
      left: block.position.left,
      top: block.position.top,
      width: blockProps.size.width,
      height: blockProps.size.height,
      transform: blockProps.size.rotate,
      opacity: blockProps.opacity,
    })

    box.appendChild(shapeBox)

    // 设置 svg
    const shapeSvg = shapeBox.querySelector('svg')
    this.setSvgStyle(shapeSvg, {
      opacity: blockProps.opacity / 100,
      fill: blockProps.fill.fillColor[0],

      rx: blockProps.specified ? blockProps.specified.rx : 0,
      ry: blockProps.specified ? blockProps.specified.ry : 0,
      x: blockProps.specified ? blockProps.specified.x : 0,
      y: blockProps.specified ? blockProps.specified.y : 0,
      cx: blockProps.specified ? blockProps.specified.cx : 0,
      cy: blockProps.specified ? blockProps.specified.cy : 0,
      r: blockProps.specified ? blockProps.specified.r : 0,

      x1: blockProps.specified ? blockProps.specified.x1 : 0,
      y1: blockProps.specified ? blockProps.specified.y1 : 0,
      x2: blockProps.specified ? blockProps.specified.x2 : 0,
      y2: blockProps.specified ? blockProps.specified.y2 : 0,

      stroke: blockProps.strokeColor,
      strokeWidth: blockProps.strokeWidth,
      strokeDasharray: blockProps.strokeDasharray,
    })
  }

  // 解析基本 shpae
  resolveDefaultShape(block) {
    const box = $('.page')
    const shapeBox = document.createElement('div')
    const blockProps = block.props
    shapeBox.className = 'shape-box'

    // 设置 shape 盒子位置
    this.setCss(shapeBox, {
      left: block.position.left,
      top: block.position.top,
      width: blockProps.size.width,
      height: blockProps.size.height,
      transform: blockProps.size.rotate,
      opacity: blockProps.opacity,
    })

    // shape 应用的样式
    const shapeStyles = {
      width: blockProps.size.width + 'px',
      height: blockProps.size.height + 'px',
      opacity: blockProps.opacity / 100,
      fill: blockProps.fill.fillColor[0],

      rx: blockProps.specified ? blockProps.specified.rx : 0,
      ry: blockProps.specified ? blockProps.specified.ry : 0,
      x: blockProps.specified ? blockProps.specified.x : 0,
      y: blockProps.specified ? blockProps.specified.y : 0,
      cx: blockProps.specified ? blockProps.specified.cx : 0,
      cy: blockProps.specified ? blockProps.specified.cy : 0,
      r: blockProps.specified ? blockProps.specified.r : 0,

      x1: blockProps.specified ? blockProps.specified.x1 : 0,
      y1: blockProps.specified ? blockProps.specified.y1 : 0,
      x2: blockProps.specified ? blockProps.specified.x2 : 0,
      y2: blockProps.specified ? blockProps.specified.y2 : 0,

      stroke: blockProps.strokeColor,
      strokeWidth: blockProps.strokeWidth,
      strokeDasharray: blockProps.strokeDasharray,

      linearGradientStart: {
        'stop-color': blockProps.fill.fillColor[0],
        'stop-opacity': 1
      },
      linearGradientEnd: {
        'stop-color': blockProps.fill.fillColor[1],
        'stop-opacity': 1
      },
    }

    switch (block.shapeType) {
      case 'rectangle':
      case 'round-rectangle':
        shapeBox.innerHTML = `
          <svg width="100%" height="100%" preserveAspectRatio="none" stroke-miterlimit="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect class="svg-element"
              width="${shapeStyles.width}" height="${shapeStyles.height}" opacity="${shapeStyles.opacity}"
              fill="${shapeStyles.fill}" rx="${shapeStyles.rx}" ry="${shapeStyles.ry}" x="${shapeStyles.x}"
              y="${shapeStyles.y}" stroke="${shapeStyles.stroke}" stroke-width="${shapeStyles.strokeWidth}"
              stroke-dasharray="${shapeStyles.strokeDasharray}"></rect>
          </svg>
        `
        break;

      case 'line':
        shapeBox.innerHTML = `
          <svg width="100%" height="100%" class="line-wrap">
            <line class="line" width="${shapeStyles.width}"
              height="${shapeStyles.height}" opacity="${shapeStyles.opacity}" fill="${shapeStyles.stroke}"
              x1="${shapeStyles.x1}" y1="${shapeStyles.y1}" x2="${shapeStyles.x2}" y2="${shapeStyles.y2}"
              stroke="${shapeStyles.stroke}" stroke-width="${shapeStyles.strokeWidth}" stroke-dasharray="${shapeStyles.strokeDasharray}"
              marker-start="${shapeStyles.markerStart}" marker-end="${shapeStyles.markerEnd}"></line>
          </svg>
        `
        break;

      case 'oval':
        shapeBox.innerHTML = `
          <svg width="100%" height="100%" preserveAspectRatio="none" stroke-miterlimit="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <ellipse class="svg-element" 
              opacity="${shapeStyles.opacity}" fill="${shapeStyles.fill}" cx="${shapeStyles.cx}" cy="${shapeStyles.cy}"
              rx="${shapeStyles.rx}" ry="${shapeStyles.ry}" stroke="${shapeStyles.stroke}" stroke-width="${shapeStyles.strokeWidth}"
              stroke-dasharray="${shapeStyles.strokeDasharray}"></ellipse>
          </svg>
        `
        break;

      case 'triangle':
        shapeBox.innerHTML = `
        <svg width="100%" height="100%" preserveAspectRatio="none" stroke-miterlimit="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="svg-element" 
            points="${block.path}" width="${shapeStyles.width}" height="${shapeStyles.height}" opacity="${shapeStyles.opacity}" fill="${shapeStyles.fill}" stroke="${shapeStyles.stroke}" stroke-width="${shapeStyles.strokeWidth}" stroke-dasharray="${shapeStyles.strokeDasharray}"></polygon>
        </svg>
        `
        break;

      case 'pentagon':
        shapeBox.innerHTML = `
        <svg width="100%" height="100%" preserveAspectRatio="none" stroke-miterlimit="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="svg-element" points="${block.path}"
            width="${shapeStyles.width}" height="${shapeStyles.height}" opacity="${shapeStyles.opacity}"
            fill="${shapeStyles.fill}" stroke="${shapeStyles.stroke}" stroke-width="${shapeStyles.strokeWidth}"
            stroke-dasharray="${shapeStyles.strokeDasharray}"></polygon>
        </svg>
        `
        break;

      default:
        break;
    }

    box.appendChild(shapeBox)

  }

  // 设置页面 CSS
  setCss(el, opts) {
    this.setStyle(el, {
      // 基本配置
      width: opts.width ? opts.width + 'px' : null,
      height: opts.height ? opts.height + 'px' : null,
      left: opts.left ? opts.left + 'px' : null,
      top: opts.top ? opts.top + 'px' : null,

      // 图片
      backgroundColor: opts.backgroundColor ? opts.backgroundColor : null,
      border: opts.border ? opts.border : null,
      borderRadius: opts.borderRadius ? opts.borderRadius : null,
      opacity: opts.opacity ? opts.opacity : null,
      transform: opts.rotate ? 'rotate(' + opts.rotate + 'deg)' : null,

      // 文本
      fontSize: opts.fontSize ? opts.fontSize + 'px' : null,
      fontFamily: opts.fontFamily ? opts.fontFamily : null,
      color: opts.color ? opts.color : null,
      letterSpacing: opts.letterSpacing ? opts.letterSpacing + 'px' : null,
      lineHeight: opts.lineHeight ? opts.lineHeight : null,
      textAlign: opts.textAlign ? opts.textAlign : null,
      fontWeight: opts.fontWeight ? 'bold' : null
    });
  }

  // 设置 CSS 属性
  setStyle(node, opts) {
    for (var index in opts) {
      node['style'][index] = opts[index];
    }
  }

  // 设置 svg 属性
  setSvgStyle(node, opts) {
    for (var index in opts) {
      node.setAttribute(index, opts[index])
    }
  }

  uploadImg(iswatermark) {
    const that = this;
    window.scrollTo(0,0);//移至顶部开始截图
    const uploadUrl = `https://www.dydata.io/dychart/upload/base64_image`;

    $('.show-container').setAttribute('style', ' overflow: visible');
    $('.from-box').setAttribute('style', 'border: none')
    //$('.from-tooltip').setAttribute('style', 'padding-bottom: 0rem');

    let y = 0; 

    if ($('.view-data-text').innerHTML === '查看图表') {
      $('.title').classList.remove('active');
      $('.page').classList.remove('active');
      $('.publish-time').classList.remove('active');
      $('.from-tooltip').classList.remove('active');
      y = $('.title').getBoundingClientRect().y - 48;
    }


    if (iswatermark) {
      $('main').classList.remove('active')
    }heig
    const height = $('.from').getBoundingClientRect().y + $('.from').getBoundingClientRect().height - 37 -y;
    
    html2canvas($('main'), {
      x: 0,
      y: y,
      width: innerWidth,
      height: height,
      logging: false,
      ignoreElements: (a) => {
        //   // if (a.tagName === "style") {
        //   //   return false;
        //   // }
        if (a.id === "weixin-table") {
          return true;
        }
        //   return false;
      }
    }).then(screenshot => {
      // 样式还原
      $('.show-container').setAttribute('style', 'overflow:""');
      $('.from-box').setAttribute('style', 'border-bottom: 1px dashed #d1d1d1')
      //$('.from-tooltip').setAttribute('style', 'padding-bottom: 1.05rem')
      if ($('.view-data-text').innerHTML === '查看图表') {
        $('.title').classList.add('active');
        $('.page').classList.add('active');
        $('.publish-time').classList.add('active');
        $('.from-tooltip').classList.add('active');
      }
      if (iswatermark) {
        $('main').classList.add('active')
      }
      let imgBase64 = screenshot.toDataURL('image/png');
      let block = imgBase64.split(";");
      let contentType = block[0].split(":")[1];
      let realData = block[1].split(",")[1];
      let blob = that.base64toBinary(realData, contentType);

      jQuery.ajax({
        url: uploadUrl,
        type: 'post',
        async: false,
        xhrFields: {
          withCredentials: true
        },
        processData: false,
        contentType: false,
        cache: false,
        data: blob,
        dataType: 'json',
        success: function (res) {
          let url = `https://image.dydata.io/${res.data}`;

          if (iswatermark) {
            that.opts.imgurls.nowatermarkImg = url;
            console.log('无水印' + url);
          } else {
            that.opts.imgurls.watermarkImg = url;
            console.log('有水印' + url);
          }
        },
        error: function (res) {
          console.log(res)
        }
      });
    })

  }

  base64toBinary(b64Data, contentType) {
    contentType = contentType || '';
    const byteCharacters = atob(b64Data);
    let byteArrays = new ArrayBuffer(byteCharacters.length);
    let ia = new Uint8Array(byteArrays);
    for (let i = 0; i < byteCharacters.length; i++) {
      ia[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArrays], {
      type: contentType
    });
    return blob;
  }

};
new ShowPage();