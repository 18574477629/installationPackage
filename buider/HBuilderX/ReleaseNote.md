# HBuilder X - Release Notes
======================================
## 2.4.6.20191210
* 修复 鼠标悬停预览代码后，导致撤销失效的Bug
* 【uni-app插件】
  + App平台 修复 纯 vue 项目配置 condition 后运行报错的Bug [详情](https://ask.dcloud.net.cn/question/84752)
  + App-Android平台 修复 选择位置 概率出现定位中心点不居中的Bug [详情](https://ask.dcloud.net.cn/question/84819)
  + H5平台 修复 发行模式启用摇树优化后，运行报 getApp 出错的Bug [详情](https://ask.dcloud.net.cn/question/84763)

## 2.4.5.20191209
* 新增 查找索引符号，可快速查找函数、变量、markdown标题等文档结构图中的内容 （快捷键 Ctrl+Shift+o）
* 新增 鼠标悬停在代码折叠后的省略号处，可悬浮预览被折叠内容
* 优化 文件路径提示
* 优化 字符搜索的性能和指示器样式
* 优化 字符搜索时点击大小写、全词匹配等操作时自动触发重新搜索
* 优化 文件搜索的性能，补充匹配字符高亮
* 修复 某些情况下，git/svn项目，更新代码或切换分支后，文件内容没有更新的Bug
* 修复 无标题文档不更新title的Bug
* 修复 某些情况下，状态栏语言名称丢失的Bug
* 修复 初次修改文档，中文输入法输入卡顿的Bug
* 修复 当文件第一行是空行时，再次打开编辑器折叠计算错误的Bug
* 修复 通过拖拽分栏后的tabbar背景色不正确的Bug
* 修复 某些情况下，分左右两栏，没有对齐的Bug
* 修复 vscode快捷键方案，搜索上一个/下一个字符，快捷键显示错误的Bug
* 修复 win7 安装插件窗口滚动条过细的Bug
* 修复 win7 QQ输入法输入单引号时触发移动光标的Bug
* 修复 项目管理器，焦点在目录文件上时，按Ctrl+Shift+c复制路径不生效的Bug
* 修复 打开WebView调试控制台，菜单状态错误的Bug
* 删除 uni-app项目的manifest.json可视化视图删除自定义组件模式选择，因为已不再支持非自定组件模式
* 【uni-app插件】
  + 新增 支持在页面文件调用 `App.vue` 中定义的函数方法 [#665](https://github.com/dcloudio/uni-app/issues/665)
  + 优化 `babel.config.js` 文件里的 `@vue/babel-preset-app` 支持配置 `modules:false` ，让打包后的代码体积更小，运行更快 [#929](https://github.com/dcloudio/uni-app/issues/929)
  + 修复 发行模式下使用 scss ，部分情况条件编译不生效的 Bug [1013](https://github.com/dcloudio/uni-app/issues/1013)
  + App平台 新增 nvue(uni-app编译模式) 控制是否自动包裹 scroll 组件（通过 pages.json 里 style 的 `disableScroll` 属性配置页面) [详见](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App平台 新增 nvue(uni-app编译模式) webview 组件加载的HTML支持调用部分uni API [详情](https://ask.dcloud.net.cn/question/83399)
  + App平台 优化 选择位置，全新UI、支持传入经纬度参数、一键到达当前位置
  + App平台 修复 真机运行 指定页面为首页时白屏的Bug
  + App平台 修复 nvue 导航栏 titleNView 的 type 属性设置为 transparent 时不生效的Bug [详情](https://ask.dcloud.net.cn/question/66907)
  + App平台 修复 nvue(weex编译模式) uni.scanCode 打开扫码页面空白的Bug [详情](https://ask.dcloud.net.cn/question/83820)
  + App平台 修复 nvue picker 组件多次打开后无法关闭的Bug [详情](https://ask.dcloud.net.cn/question/83417)
  + App-Android平台 优化 应用退出后不清掉后台，再次启动可能出现白屏的问题 [详情](https://ask.dcloud.net.cn/question/77397)
  + App-Android平台 修复 首页为 nvue 时反复启动应用后可能出现假死状态的Bug [详情](https://ask.dcloud.net.cn/question/83611)
  + App-Android平台 修复 应用在 tabbar 页面跳转到其它页面在Android10上可能出现图片闪烁的Bug
  + App-Android平台 修复 nvue scroll-view 组件无法触发 touchstart/touchend 事件及动态设置 scroll-left 属性可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/83256)
  + App-Android平台 修复 nvue input 组件设置 autofocus 属性为 true 在subnvue页面可能出现软键盘弹出后自动隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83014)
  + App-Android平台 修复 nvue map 组件下的view子节点不显示的Bug [详情](https://ask.dcloud.net.cn/question/83719)
  + App-Android平台 修复 nvue live-pusher 组件推流成功后拉流可能显示绿屏或卡在首帧的Bug [详情](https://ask.dcloud.net.cn/question/83198)
  + App-iOS平台 新增 tabbar和navigationBar 支持设置高斯模糊（毛玻璃）效果 [详情](https://ask.dcloud.net.cn/article/36617)
  + App-iOS平台 修复 nvue view 组件设置 border 属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/83206)
  + App-iOS平台 修复 iOS 13 系统中 textarea 输入的内容，比 placeholder 偏左一点的Bug [详情](https://ask.dcloud.net.cn/question/83373)
  + App-iOS平台 修复 faceID 识别成功时不能正确触发成功回调的Bug [详情](https://ask.dcloud.net.cn/question/83068)
  + App-iOS平台 修复 网络请求 uni.request 设置请求的 header 中存在非字符串值可能会引起崩溃的Bug
  + H5平台 新增 uni.chooseImage 、uni.chooseVideo 支持返回文件名
  + H5平台 新增 支持使用 uni.loadFontFace 加载字体
  + H5平台 修复 webview 组件 加载的HTML中调用 uni.getEnv 错误的Bug [详情](https://github.com/dcloudio/uni-app/issues/1011)
  + H5平台 修复 h5 平台组件的自定义事件无法接收多个参数的Bug [#1016](https://github.com/dcloudio/uni-app/issues/1016)
  + H5平台 修复 在企业微信中 uni.chooseImage 无法使用的Bug [详情](https://github.com/dcloudio/uni-app/issues/82872)
  + 小程序平台 修复 不能直接在模版内使用 $emit 的 Bug [详情](https://ask.dcloud.net.cn/question/82865)
  + 微信小程序平台 修复在发行模式使用 lodash@4.17.15 ，运行报错的 Bug[#994](https://github.com/dcloudio/uni-app/issues/994)
  + 支付宝小程序平台 修复 for 循环中 ref 生成的多个组件数组长度不准确的Bug [#930](https://github.com/dcloudio/uni-app/issues/930)
  + 头条小程序平台 修复 当 rpx 后跟着 !important 时，发行模式下 rpx 未被编译成px的Bug [#1014](https://github.com/dcloudio/uni-app/issues/1014)
  + 百度小程序平台 修复 页面 onShow 只能触发一次的Bug
  + uni-ui 新增 uni-transition 过渡动画组件
  + uni-ui 新增 uni-fab 悬浮按钮支持nvue
  + uni-ui 优化 uni-calendar 切换月份必选中每月1号的Bug
  + uni-ui 优化 uni-calendar 视图样式,优化逻辑代码实现,使性能更好
  + uni-ui 优化 uni-calendar 切换月份返回事件
  + uni-ui 优化 uni-grid 用户可自定义宫格内容，如添加角标、红点、修改背景色等
  + uni-ui 优化 uni-load-more 支持调整图标大小
  + uni-ui 优化 uni-popup 弹出层动画，使动画更流畅
  + uni-ui 优化 uni-swipe-action 组件间联动效果更流畅
  + uni-ui 修复 uni-calendar 动态获取 selected 属性就会导致切换不了月份的Bug
  + uni-ui 修复 uni-calendar H5 端选择月份按钮不能点击的Bug
  + uni-ui 修复 uni-grid 正方形宫格显示不正确的Bug
  + uni-ui 修复 uni-grid 动态数据不渲染的Bug
  + uni-ui 修复 uni-popup 点击蒙版关闭后，再次打开弹框失败的Bug
  + uni-ui 修复 uni-popup type 属性为静态值时导致弹出层错误的Bug
  + uni-ui 修复 uni-swipe-action autoClose 属性开启状态下滑动不正常的Bug
* 【5+App插件】
  + Android平台 优化 启动时申请手机存储权限，若用户拒绝则会弹出说明文字。满足部分应用商店要求的权限申请需申明的要求 [详情](https://ask.dcloud.net.cn/article/36549#externalstorage)
  + Android平台 修复 Webview窗口设置drag滑屏操作手势，快速滑动操作可能引起白屏的Bug [详情](https://ask.dcloud.net.cn/question/82668)
  + Android平台 修复 视频播放控件（VideoPlayer）可能无法播放某些本地视频文件的Bug
  + Andrpid平台 修复 数据库执行SQL语句（plus.sqlite.executeSql）传入错误sql语句时，可能在控制台输出错误日志且不触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/83203)
  + iOS平台 新增 Webview窗口原生标题栏样式属性 blurEffect，支持高斯模糊（毛玻璃）效果 [详情](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + iOS平台 补齐 直播推流（LivePusher）控件支持设置最小码率（min-bitrate）和最大码率（max-bitrate）
  + iOS平台 修复 Webview窗口原生标题栏的搜索框（searchInput）获取焦点会导致placeholder文字移位的Bug [详情](https://ask.dcloud.net.cn/question/83027)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）可能出现长图片不能滚动的Bug [详情](https://ask.dcloud.net.cn/question/82455)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）可能无法正常显示部分网络地址图片的Bug [详情](https://ask.dcloud.net.cn/question/83542)
  + iOS平台 修复 使用UniPush或个推推送在后台统计数据中没有展示数和点击数的Bug [详情](https://ask.dcloud.net.cn/question/83292)
  + iOS平台 修复 用户拒绝访问相机后，调用摄像头拍照或录像时不会触发错误回调的Bug
  + iOS平台 修复 配置使用高德或百度地图后，定位默认没有使用gcj02坐标的Bug
  + iOS平台 修复 系统日期（plus.nativeUI.pickDate）、时间（plus.nativeUI.pickTime）选择框与系统提示框遮罩颜色不一致的Bug
  + iOS平台 修复 苹果应用内支付IAP恢复购买接口（restoreComplateRequest）有可能不会返回恢复购买凭证的Bug

## 2.4.2.20191115
* 【uni-app插件】
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，picker 组件文字超出无法隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83048)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.scanCode 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82984)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.chooseLocation 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82988)
  + App-Android平台 修复 nvue barcode 组件设置 autostart 为true时在部分设备可能出现黑屏的Bug
  + App-iOS平台 修复 纯nvue项目 侧滑关闭后无法触发上个页面生命周期 onShow 的Bug [详情](https://ask.dcloud.net.cn/question/81830)
  + H5平台 修复 uni.getImageInfo 回调信息中 path 错误的Bug [详情](https://ask.dcloud.net.cn/question/82793)
  + H5平台 修复 路由后退时弹出的 picker 无法自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/82684)
  + H5平台 修复 在夸克浏览器（iOS）onReachBottom 生命周期只触发一次的Bug [详情](https://ask.dcloud.net.cn/question/67636)
  + H5平台 修复 在手机QQ浏览器 onReachBottom 无法触发的Bug [详情](https://ask.dcloud.net.cn/question/82795)
  + H5平台 修复 在网络断开的情况下 SocketTask.send 回调不正确的Bug [#744](https://github.com/dcloudio/uni-app/issues/744)
  + 微信小程序 调整微信基础库版本为2.9.2，解决微信2.9.3基础库input事件不触发的Bug [详情](https://developers.weixin.qq.com/community/develop/doc/000a067cd0c6102d0d79558e65bc00?highLine=bindinput)
  + 钉钉小程序 修复 多层组件嵌套的情况下，子组件生命周期不触发的Bug
  + 百度小程序 修复 onShow在onLoad之前触发的Bug [详情](https://ask.dcloud.net.cn/question/82822)
* 【5+App插件】
  + iOS平台 修复 创建本地消息（plus.push.createMessage）在iOS10及以上系统只显示最后一条的Bug [详情](https://ask.dcloud.net.cn/question/82560)

## 2.4.1.20191114
* 新增 迷你地图（右侧缩略图，可在滚动条右键菜单开启关闭，快捷键 win: Alt+o；mac: Ctrl+o）
* 新增 鼠标悬停在滚动条或迷你地图的非当前页区域时，小窗预览指示文档
* 新增 JSON文件 支持文档结构图。包括uni-app的pages.json的文档结构图（快捷键 win: Alt+w；mac: Ctrl+w）
* 新增 编辑器标签卡超出一屏时，支持鼠标滚轮横向滚动标签卡
* 新增 底部状态栏新增文档结构图、终端两个快捷按钮
* 修复 预览状态下打开文档结构图后，点击文档结构图的item跳转到编辑器对应位置时焦点不在编辑器上的Bug
* 修复 修改文件触发自动保存时，再次撤销成未修改状态时，切换标签卡时提示临时文件需要恢复的Bug
* 修复 Vue文件 {{}} 附近输入中文￥自动转换成$的Bug
* 修复 已关闭项目丢失项目别名的Bug
* 修复 某些情况下初次自定义代码块未生效的Bug
* 优化 设置过自定义代码块的语言，自动显示在【代码块设置】菜单列表中，无需再次查找
* 修复 SVN/Git项目导入，输入url后回车，当前窗口被关闭的Bug
* 修复 对运行中的项目，右键菜单操作【关闭项目】造成崩溃闪退的Bug
* 修复 日志文件积累时间较长后，造成占用硬盘空间过大的Bug
* 优化 加快某些大文档在外部变更后重新渲染的速度
* 优化 打开较多文档时主题切换的速度
* 修复 跳转到指定行，代码没有展开折叠的Bug
* 修复 触发全部折叠时行尾的折叠指示器框大小不对的Bug
* 优化 文字搜索右侧显示搜索结果的数字指示
* 修复 小屏幕（高度为768像素）下一些界面适配的Bug
* 修复 vscode快捷键方案，eslint校验，跳转到下一个错误，快捷键错误的Bug
* 优化 更新逻辑，非app用户不会收到app插件更新通知
* 修复 Windows 分栏时编辑器焦点切换时标签卡title背景色没有变化的Bug
* 修复 Mac Command+m 无法最小化窗体的Bug
* 修复 Mac 暗色主题下，弹窗文字颜色看不清的Bug
* 修复 Mac 10.15 右键菜单字体异常的Bug
* 优化 Mac app运行到iOS模拟器，自动记忆上次运行的模拟器
* 调整 删除快应用发布的菜单，请在快应用官方工具发布快应用
* 优化 App打包 提供更清晰的界面指示、完善提示语
* 新增 App打包 支持新的Android公共测试证书 [详情](https://ask.dcloud.net.cn/article/68)
* 新增 uni-app 新建页面时允许不创建同名目录
* 【uni-app插件】
  + 【重要】公告：非自定义组件模式停止支持 [详情](https://ask.dcloud.net.cn/article/36385)
  + 【重要】nvue文件编译模式默认从 weex 模式修改为 uni-app 模式。推荐使用多端可用、更成熟、组件更丰富的 uni-app 模式。如仍需使用 weex 模式，需在manifest中手动配置
  + 【重要】uni ui 新版正式发布，同时兼容vue和nvue。欢迎插件市场作者也升级自己的组件，同时兼容nvue [详情](https://uniapp.dcloud.io/component/README?id=uniui)
  + App平台 新增 自定义组件模式下的 crypto.getRandomValues 方法，获取符合密码学要求的安全随机值
  + App平台 新增 生物认证API，包括指纹和 Apple Face ID [详情](https://uniapp.dcloud.io/api/system/authentication)
  + APP平台 新增 nvue picker 组件支持多列
  + APP平台 优化 picker、扫码、选择位置、打开位置API的界面通过原生实现，提升性能体验（nvue为weex编译模式时未优化）
  + APP平台 修复 swiper 设置为autoplay时滑动导致速度加快的Bug [详情](https://ask.dcloud.net.cn/question/82431)
  + App平台 修复 uni.requestPayment API 回调结果中没有支付收据的Bug [详情](https://github.com/dcloudio/uni-app/issues/621#issuecomment-518001954)
  + App-Android平台 优化 weex原生渲染引擎的圆角和边框绘制效率
  + App-Android平台 修复 tabBar 页面真机运行可能无法同步更新的Bug
  + App-Android平台 修复 64位专用包 启动时概率出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/79556)
  + App-Android平台 修复 input 组件在部分场景获取焦点可能引起软键盘闪现后自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/81642)
  + App-Android平台 修复 nvue input 组件密码框焦点切换时可能出现自动关闭软键盘的Bug [详情](https://ask.dcloud.net.cn/question/81779)
  + App-Android平台 修复 nvue map 组件在真机运行同步更新时可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/81364)
  + App-Android平台 修复 nvue video 组件在应用首页中可能无法正常播放视频的Bug [详情](https://ask.dcloud.net.cn/question/81877)
  + App-Android平台 修复 nvue video 组件前后台切换不触发 onShow/onHide 事件的Bug [详情](https://ask.dcloud.net.cn/question/81812)
  + App-Android平台 修复 websocket 传输数据类型为 ArrayBuffer 某些情况下报错的Bug [详情](https://ask.dcloud.net.cn/question/81687)
  + App-iOS平台 修复 nvue页面在iOS13及以上系统默认字体不对的Bug
  + App-iOS平台 修复 nvue list 组件 scroll 事件返回的 isDragging 属性不正确的Bug [详情](https://github.com/dcloudio/uni-app/issues/932)
  + App-iOS平台 修复 nvue list 组件滚动时 scrollStart/scrollEnd 事件返回参数值为负数的Bug
  + App-iOS平台 修复 nvue swiper 组件动态修改 current 属性触发 transition 事件返回的参数不准确的Bug
  + App-iOS平台 修复 uni.hideKeyboard 不能收起软键盘的Bug [#903](https://github.com/dcloudio/uni-app/issues/903)
  + App-iOS平台 修复 picker 组件可能被软键盘遮挡的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 input 组件输入中文时失焦导致文字消失的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 nvue text 组件设置 line-height 属性可能引起显示不正确的Bug
  + App-iOS平台 修复 nvue live-pusher 组件设置 whiteness 属性为false不生效的Bug
  + App-iOS平台 修复 nvue barcode 组件动态修改属性不生效的Bug
  + H5平台 修复 wxs getDataset() 函数获取不到参数的Bug。uni ui 的 swiperaction 组件的问题也因此得到修复 [详情](https://ask.dcloud.net.cn/question/82718)
  + H5平台 修复 picker 组件初始值不是合法日期/时间的情况下返回值不正确的Bug
  + 百度小程序 修复 新版百度小程序生命周期下组件内mounted不触发的Bug
  + 百度小程序 修复 页面 onShow 触发两次的Bug [详情](https://ask.dcloud.net.cn/question/81243)
  + 百度小程序 修复 3.105.17 以上的调试库页面 onReady 事件比 onLoad 事件执行的要早的Bug [详情](https://ask.dcloud.net.cn/question/81504)
  + uni ui 优化 uni-swipe-action 组件在nvue中使用 BindingX ，使跟手动画更流畅
  + uni ui 优化 uni-list 组件在nvue中使用原生list组件，提升性能
  + uni ui 修复 uniNoticeBar跑马灯组件，在Android平台webview版本高于66时，且在隐藏的tabbar的vue页面中使用，造成App卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + hello uni-app 新增 生物认证API示例
  + 新闻模板 优化 顶部tab栏目增加下滑横线（支持app-nvue、app-vue、h5、微信小程序、qq小程序，其他端暂无下滑横线）
* 【5+App插件】
  + Android平台 新增 获取移动智能设备标识公共服务平台提供的匿名设备标识符[OAID](https://www.html5plus.org/doc/zh_cn/device.html#plus.device.getOAID)、开发者匿名设备标识符VAID、及应用匿名设备标识符AAID，可用于解决Android10无法获取设备标识（如IMEI、IMSI、Wi-Fi MAC地址等）的问题
  + Android平台 新增 在manifest中配置 App 启动时申请设备IMEI等信息的权限策略，默认调整为应用第一次启动时申请 [详情](https://ask.dcloud.net.cn/article/36549)
  + Android平台 新增 Webview窗口支持暂停（[pause](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.pause)）和恢复（[resume](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.resume)）操作，解决页面中如果存在持续渲染隐藏后可能引起卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + Android平台 新增 文件上传支持配置分块上传参数[chunkSize](https://www.html5plus.org/doc/zh_cn/uploader.html#plus.uploader.UploadOptions)，解决不能真实返回上传进度的Bug [详情](https://ask.dcloud.net.cn/question/79930)
  + Android平台 修复 Webview子窗口先隐藏（hide）再添加（append）到父窗口依然显示的Bug [详情](https://ask.dcloud.net.cn/question/81427)
  + Android平台 修复 二维码（Barcode）扫描在设备横屏时显示异常的Bug [详情](https://ask.dcloud.net.cn/question/79997)
  + Android平台 修复 创建视频播放控件（VideoPlayer）时，没有开始播放视频也会停止后台背景音频的Bug [详情](https://ask.dcloud.net.cn/question/82034)
  + Android平台 优化 视频播放的操作条的拖动误触和图标美化问题
  + Android平台 修复 在部分设备上插拔usb硬件设备可能引起应用重启的Bug [详情](https://ask.dcloud.net.cn/question/81362)
  + iOS平台 修复 Webview窗口使用WKWebview内核时截屏绘制（draw）设置 clip 参数无效的Bug [详情](https://ask.dcloud.net.cn/question/45969)
  + iOS平台 修复 Webview窗口全部关闭（close）时可能引起应用崩溃的Bug
  + iOS平台 修复 Webview窗口设置自定义标题栏按钮点击时可能引起应用崩溃的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件无法自动识别视频方向的Bug [详情](https://ask.dcloud.net.cn/question/79320)
  + iOS平台 修复 调用摄像头拍照（captureImage）时设置resolution参数为high、low、medium时可能引起图片显示方向不正确的Bug [详情](https://ask.dcloud.net.cn/question/80814)
  + iOS平台 修复 系统相册选择图片（plus.gallery.pick）可能返回不是选中图片的Bug [详情](https://ask.dcloud.net.cn/question/81055)
  + iOS平台 修复 文件下载暂停后再继续文件名后面会自动添加数字的Bug [详情](https://ask.dcloud.net.cn/question/66523)
  + iOS平台 修复 平台绝对路径转换成本地URL路径（plus.io.convertAbsoluteFileSystem）可能返回null的Bug [详情](https://ask.dcloud.net.cn/question/51954)
  + iOS平台 修复 设置应用屏幕常亮（plus.device.setWakelock）在iOS13.1.3系统可能引起崩溃的Bug
  + iOS平台 修复 Native.JS获取当前Webview窗口的原生实例对象（plus.ios.currentWebview）可能返回为空的Bug [详情](https://ask.dcloud.net.cn/question/81037)

## 2.3.7.20191024
* 修复 Vuex mapState mapActions mapMutations 映射的函数属性无法转到定义和无法提示的Bug
* 修复 html 连续编写有默认值的属性时(例如 autocomplete accesskey等)， 覆盖位置不对的Bug
* 优化 uni-app globaldata代码提示及转到定义
* 新增 App打包 对manifest中的iOS通用链接进行前置校验
* 【uni-app插件】
  + 修复 在 App.vue 的 onLaunch 中，不支持 this.globalData 的 Bug
  + H5平台 修复 开启 treeShaking 后 picker 组件无法使用的Bug [#841](https://github.com/dcloudio/uni-app/issues/841)
  + App-Android平台 修复 input组件使用特定输入法（如搜狗）时，无法正常切换键盘模式的Bug [详情](https://ask.dcloud.net.cn/question/80172)
  + App-iOS平台 修复 nvue map组件的标记点（markers）的 iconPath 属性值设置为相对路径时可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/79444)
* 【5+App插件】
  + Android平台 修复 微信分享内容包含网络图片时，第二次操作分享会失败的Bug [详情](https://ask.dcloud.net.cn/question/81234)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）3张图片且current属性设置为2时显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/79564)
  + 5+引擎开源，开发者可自主编译自己的引擎，[Android地址](https://github.com/dcloudio/H5P.Android)、[iOS引擎地址](https://github.com/dcloudio/H5P.iOS)

## 2.3.6.20191021
* 【uni-app插件】
  + App平台 修复 nvue bindingx API bind 参数导致异常的Bug [详情](https://ask.dcloud.net.cn/question/80735)
  + App平台 修复 tabBar 设置 borderStyle 为 black 不生效的Bug [详情](https://ask.dcloud.net.cn/question/80921)
  + App平台 修复 tabBar 使用默认高度时 uni.getSystemInfo 获取的 windowHeight 不正确的Bug [详情](https://ask.dcloud.net.cn/question/80888)
  + App-Android平台 修复 tabBar 调用 uni.setTabBarItem 动态设置tabBar某一项内容导致选中状态失效的Bug [详情](https://ask.dcloud.net.cn/question/80941)
  + App-iOS平台 修复 tabBar 页面因内存不足而白屏后无法自动恢复的Bug [详情](https://ask.dcloud.net.cn/question/80927)
  + App-iOS平台 修复 tabBar 设置 icon 图标可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/80946)
  + App-iOS平台 修复 nvue list组件 scroll 事件返回的参数缺少 isDragging 属性的Bug [详情](https://ask.dcloud.net.cn/question/80928)
* 【5+App插件】
  + Android平台 修复 HBuilderX2.3.5引出的上传文件 uploadFile 可能失败的Bug [详情](https://ask.dcloud.net.cn/question/80815)

## 2.3.5.20191018
* 新增 Vuex、Vue-Router代码提示
* 新增 本地历史记录功能。（右键菜单-本地历史记录。并可在【设置】-【常用配置】，调整最大文件数量等参数）
* 新增 首次启动显示欢迎向导
* 新增 预览图片时，状态栏右下角显示图片的文件大小和像素尺寸
* 修复 文件保存时恰好设备断电导致文件损坏的Bug
* 优化 自动保存临时文件的策略。取消固定周期保存临时文件，更改为内容变更后自动保存，同时删除了【设置】中的`自动保存临时文件周期`配置项
* 修复 某些情况下HBulderX更新失败的Bug
* 修复 当项目存在时，拖入一个相同项目导致崩溃的Bug
* 优化 折叠 点击右侧折叠方框可展开折叠
* 优化 文件搜索，列表隐藏时关闭进度条
* 优化 Alt+鼠标左键转到定义时，无需移动鼠标也能触发显示下划线
* 修复 某些情况下因字体渲染导致方法参数提示窗口位置异常的Bug
* 修复 当设置编辑器处于懒加载的状态时，切换到设置时由于记录焦点变换造成的崩溃Bug
* 修复 nvue文件 import from 导入组件，无法转到定义的Bug
* 修复 nvue文件 uni-app生命周期函数内，调用method方法，转到定义失败的Bug
* 修复 App真机运行 iOS 项目文件过多的情况下，同步文件失败的Bug
* 修复 App真机运行 Mac 运行控制台打印的日志时间没有对齐的Bug
* 修复 App真机运行 某些情况下xcode模拟器无法自动启动的Bug
* 新增 App云端打包 本地校验证书密码，减少证书密码错误造成的无效打包
* 优化 App云端打包 界面文字描述以及布局，明确显示版本号，减少版本号相同引发的无效打包
* 新增 uni-app manifest.json H5发行时是否自动裁剪没有使用的组件和API的配置
* 【uni-app插件】
  + 【重要】App平台 重构 tabBar，原生支持 midButton（中间凸起），支持高度调节（App、H5默认高度统一为50px），降低内存占用，避免iOS白屏。注意不再支持通过 plus API 操作 tabBar [详情](https://uniapp.dcloud.io/collocation/pages?id=tabbar)
  + App平台 新增 nvue 云打包支持原生混淆源码 [详情](https://ask.dcloud.net.cn/article/36437)
  + App平台 新增 nvue （uni-app编译模式）内置 bindingx 模块，可以免安装node模块直接使用
  + App平台 新增 nvue API uni.createSelectorQuery(仅支持id选择器)
  + App平台 修复 nvue swiper组件纵向滚动时，transition 事件属性值不正确的Bug [详情](https://ask.dcloud.net.cn/question/79694)
  + App平台 修复 nvue swiper组件设置 current 后滑动不触发 change 事件的Bug [详情](https://ask.dcloud.net.cn/question/79469)
  + App平台 修复 nvue 部分机型样式 width 设置为 750rpx 不会占满整个屏幕的Bug [详情](https://ask.dcloud.net.cn/question/79565)
  + App平台 修复 nvue barcode组件扫码成功触发 marked 事件返回参数条码数据为空的Bug [详情](https://ask.dcloud.net.cn/question/79475)
  + App平台 修复 uni.canvasGetImageData 和 uni.canvasPutImageData 位置大小不正确的Bug [详情](https://ask.dcloud.net.cn/question/79273)
  + App平台 修复 使用 plus.webview API 手工创建webview时，默认注入uni-app组件样式，导致干扰html页面样式的Bug
  + App-Android平台 修复 WebSocket 在Android4.4手机上使用 ws 协议时无法连接服务器的Bug [详情](https://ask.dcloud.net.cn/question/79534)
  + App-Android平台 修复 WebSocket 传输二进制数据时 uni.onSocketMessage 返回为字符串数据的Bug
  + App-Android平台 修复 nvue video组件的 show-progress 属性值设置为 false 不生效的Bug [详情](https://github.com/dcloudio/uni-app/issues/788)
  + App-Android平台 修复 nvue video组件在 swiper 中实现仿抖音效果时滑动不灵敏的Bug
  + App-Android平台 修复 nvue live-pusher组件动态设置 beauty whiteness 属性值无效的Bug [详情](https://ask.dcloud.net.cn/question/80285)
  + App-Android平台 修复 nvue live-pusher组件没有开始推流时无法切换摄像头的Bug
  + App-Android平台 修复 nvue image组件的 src 属性值为空时 placeholder 无法正常显示的Bug
  + App-iOS平台 新增 nvue live-pusher组件支持 orientation 属性设置画面方向 
  + App-iOS平台 修复 nvue map组件的点击控件事件 @controltap 不响应的Bug [详情](https://ask.dcloud.net.cn/question/80170)
  + 百度小程序 修复 开发时修改保存页面，百度模拟器页面无法正常刷新的Bug
  + uni ui 实现nvue化，源码及示例工程详见：[https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui](https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui)
  + uni统计 修复 关闭统计的情况下，统计系统事件（如：登录、分享）还能上报数据的 Bug
* 【5+App插件】
  + 【重要】Android平台 更新 个推/UniPush SDK（4.3.7.0），解决无法上架谷歌应用市场（GooglePlay）的问题 [详情](https://ask.dcloud.net.cn/article/36479)
  + 【重要】Android平台 修复 MIUI11中toast背景为白色，导致前景色无法看清的Bug [详情](https://ask.dcloud.net.cn/question/80328)
  + 【重要】iOS平台 更新 微信登录、分享、支付SDK（1.8.6.1），适配iOS13，需要配置通用链接（Universal Links）[详情](https://ask.dcloud.net.cn/article/36445)
  + Android平台 更新 微信登录、分享、支付SDK（5.4.3），适配Android10
  + Android平台 更新 QQ登录、分享SDK（3.3.5），新浪微博登录、分享SDK（4.4.1）
  + Android平台 更新 高德地图SDK（6.8.0），解决在部分手机上可能出现黑屏的Bug
  + Android平台 修复 数据库查询SQL语句（plus.sqlite.selectSql）返回结果中的浮点数据类型精度丢失的Bug [详情](https://ask.dcloud.net.cn/question/79541)
  + Android平台 修复 在双卡手机上获取国际移动用户识别码（IMSI）只能返回一个值的Bug [详情](https://ask.dcloud.net.cn/question/79863)
  + Android平台 修复 Android10设备上获取设备唯一标识（UUID）为空的Bug [详情](https://ask.dcloud.net.cn/question/80200)
  + Android平台 修复 上传任务（plus.uploader.createUpload）提交的请求头中包含多个Cookie的Bug [详情](https://ask.dcloud.net.cn/question/74619)
  + Android平台 修复 蓝牙断开设备连接（plus.bluetooth.closeBLEConnection）可能不触发onBLEConnectionStateChange事件的Bug
  + Android平台 修复 微信分享图片无法加载带重定向的url链接的Bug
  + Android平台 修复 Webview窗口动画在特定情况下可能会将pop-in/out动画自动变为slide-in/out-right的Bug
  + iOS平台 更新 QQ登录、分享SDK（3.3.6），新浪微博登录、分享SDK（3.2.5）
  + iOS平台 修复 iOS13上配置后台播放音乐可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/80253)
  + iOS平台 修复 图片压缩（plus.zip.compressImage）设置缩放图片的宽度（width）和高度（height）无效的Bug [详情](https://ask.dcloud.net.cn/question/79993)
  + iOS平台 修复 iPhone11上查询设备是否为刘海屏（plus.navigator.hasNotchInScreen）返回值不正确的Bug [详情](https://ask.dcloud.net.cn/question/80291)
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 show-progress 属性不生效的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 autoplay 属性值为 true 后加载雪花可能显示不正常的Bug
  + iOS平台 修复 指纹识别（Fingerprint）判断当前设备是否支持（plus.fingerprint.isSupport）返回值可能不正确的Bug
  + iOS平台 修复 Webview窗口设置软键盘模式（softinputMode）为adjustResize时，新开页面并弹出软键盘后返回可能白屏的Bug
  + iOS平台 修复 数据库（SQLite）多次打开数据库后，调用判断数据库是否打开（plus.sqlite.isOpenDatabase）返回值可能不正确的Bug
  + iOS平台 修复 数据库（SQLite）在HX中真机运行可能出现SQL语句操作（plus.sqlite.executeSql）无法正常执行的Bug
  + iOS平台 修复 系统相册选择图片文件时如果相册中没有图片返回时loading界面不消失的Bug

## 2.3.3.20190923
* 【uni-app插件】
  + App-Android平台 新增 uni.request 网络请求增加参数 sslVerify，配置是否验证 ssl 证书。但建议使用普遍受信的证书而不是忽略证书校验。[详情](https://uniapp.dcloud.io/api/request/request)
  + App-iOS平台 调整 非自定义组件模式 逻辑层默认从 WKWebview 切回 UIWebview，避免 uni.request 无法跨域的问题。但仍建议开发者尽快升级自定义组件模式
  + App-iOS平台 新增 非自定义组件模式 iOS13上页面无法滚动的问题，如不能很快升级为自定义组件模式，可临时使用本文的方案2来解决，[详情](https://ask.dcloud.net.cn/article/36410)
  + App-iOS平台 修复 nvue swiper组件包含子组件少于3个时布局可能不正确的Bug
  + App-iOS平台 修复 nvue video组件退出全屏动画会闪现底层组件的Bug 
  + H5端 修复 监听页面滚动（onPageScroll）后切换页面报错的Bug [详情](https://ask.dcloud.net.cn/question/78955)
* 【5+App插件】
  + iOS平台 修复 iOS13上保存图片到系统相册（plus.gallery.save）失败的Bug

## 2.3.2.20190921
* 修复 uni-app iOS13以下系统 无法启动debugger的Bug
* 修复 uni-app manifest中未设置组件编译模式时无法启动debugger的Bug
* 【uni-app插件】
  + App平台 修复 uni.writeBLECharacteristicValue 无法写入数据的Bug [详情](https://ask.dcloud.net.cn/question/79204)
  + App平台 修复 调用 uni.pageScrollTo 时页面内元素 fixed 定位失效的Bug [详情](https://ask.dcloud.net.cn/question/73179)
  + App平台 修复 调用 uni.switchTab 某些情况下白屏的Bug
  + App平台 修复 nvue map组件的点击标记点事件（@markertap）参数中markerId属性不正确的Bug
  + App平台 修复 调用 uni.setNavigationBarColor 导致其他页面状态栏颜色一起改变的Bug
  + App平台 修复 应用启动后立刻调用 uni.hideTabBar 导致页面高度错误的Bug [详情](https://ask.dcloud.net.cn/question/77611)
  + App-iOS平台 修复 调用 uni.setNavigationBarColor 导致隐藏状态的导航栏显示的Bug
  + App-iOS平台 修复 nvue swiper组件 垂直滑动且高度较低时内容可能出现重叠的Bug 
  + App-iOS平台 修复 nvue refresh组件 某些情况下闪退的Bug
  + H5平台 修复 longpress 事件消息对象的 touches/changedTouches 属性不正确的Bug [详情](https://ask.dcloud.net.cn/question/79149)
  + uni统计 修复 网络异常时，上报重试机制失效的Bug
* 【5+App插件】
  + Android平台 修复 系统相册选择文件（plus.gallery.pick）设置selected参数时多次选择失效的Bug [详情](https://ask.dcloud.net.cn/question/78931)
  + iOS平台 修复 视频播放（VideoPlayer）控件退出全屏后状态栏方向不对的Bug [详情](https://ask.dcloud.net.cn/question/79171)
  + iOS平台 修复 iOS13上获取系统状态栏样式（plus.navigator.getStatusBarStyle）总是反馈dark的Bug。此问题同时会导致uni-app状态栏颜色混乱的Bug [详情](https://ask.dcloud.net.cn/question/79189)
  + iOS平台 修复 iOS13上获取系统状态高度不正确的Bug [详情](https://ask.dcloud.net.cn/question/79219)
  + iOS平台 修复 iOS13上WKWebview的input组件设置自动聚焦无效的Bug

## 2.3.1.20190920
* 【uni-app插件】
  + App平台 修复 vue页面 scroll-view 组件在 iOS13 无法滚动的 Bug [详情](https://ask.dcloud.net.cn/question/78627)
  + H5平台 修复 uni.request 方法发起 GET 请求之前出现 OPTIONS 预检请求的 Bug
  + 头条小程序 修复 this.$refs 部分场景无法获取组件引用的 Bug [#791](https://github.com/dcloudio/uni-app/issues/791)
  + uni统计 修复 小程序端发行后所有页面都添加 onShareAppMessage 的 Bug [#792](https://github.com/dcloudio/uni-app/issues/792)
  
## 2.3.0.20190919
* 新增 windows 沉浸式标题栏。统一标题栏和界面主题的颜色，增加窗体内容区的高度（可在设置中切换回普通标题栏）
* 优化 html中vue的代码提示、转到定义
* 新增 点击右侧滚动条信息点，直达对应位置
* 新增 支持vue cli web项目直接在内置浏览器中预览（如未npm install，需先执行）
* 新增 Windows 程序关闭前，提示是否创建桌面快捷方式
* 新增 Eclipse快捷键方案切换【菜单-工具-快捷键切换】
* 新增 智能双击 双击选中es6模板字符串功能
* 新增 识别支付宝、百度、头条、QQ小程序文件
* 新增 代码提示 支持支付宝小程序数据、更新微信小程序最新数据。在uni-app项目中自动加载，在其他项目中，手动在状态栏的代码提示库中选择
* 优化 折叠的图标样式
* 优化 断电时正在写入的文件损坏的概率
* 优化 代码高亮 酷黑主题的代码选中背景色
* 修复 已关闭工程列表展开状态下关闭程序, 再次启动程序后已关闭工程列表位置显示错误的Bug
* 修复 Mac 多光标取消 `command + 右键` 弹出右键菜单的Bug
* 修复 预览窗口打开时，新打开文件，弹出对话框导致欢迎页面UI文字重叠显示的Bug
* 修复 markdown 列表前缀后按BackSpace无法整体删除列表符的Bug
* 修复 代码高亮 HTML文件中js字符串多行显示时的着色及es6模板字符串在酷黑主题下着色异常的Bug
* 修复 历史剪贴板的多行内容粘贴时变成了一行的Bug
* 修复 scss/less 选择器嵌套的代码内容中无法提示CSS属性的Bug
* 修复 scss 代码提示 无法提示!default的Bug
* 修复 Windows 进入全屏模式后，底部操作系统的工具栏仍然存在的Bug
* 修复 窗口最大化时通过打开方式打开文件时窗口状态不正确的Bug
* 新增 nvue文件关联
* 修复 调用npm运行时npm路径初始化不正确的bug
* 新增 App 真机运行 支持iOS13
* 新增 App manifest可视化界面 增加iOS13的蓝牙配置项
* 优化 真机运行 Mac通过WiFi连接的iOS手机不再显示在运行列表中
* 新增 uni-app 真机运行 支持nvue文件保存后直接刷新App页面，不用重启应用，提升调试速度
* 修复 uni-app nvue文件 代码助手无法提示uni-app生命周期的Bug
* 新增 uni-app manifest可视化界面 增加nvue页面编译模式
* 修复 uni-app 在其它文件中，uni.scss定义的全局变量无法提示的Bug
* 【uni-app插件】
  + 【重要】uni统计平台上线，一份报表，掌握业务全景 [详情](https://tongji.dcloud.net.cn) 注意小程序需加 tongji.dcloud.io 到域名白名单
  + 【重要】调整：编译模式默认为自定义组件模式。若开发者需要非自定义组件模式，需在manifest.json中明确配置usingComponents节点为false
  + 【重要】公告：非自定义组件模式，将于2019年11月1日起，停止支持。请开发者尽快升级 [详情](https://ask.dcloud.net.cn/article/36385)
  + 【重要】App/微信小程序/H5 新增 支持wxs，支付宝小程序平台支持SJS，百度小程序平台支持Filter [详情](https://uniapp.dcloud.io/frame?id=wxs)
  + 【重要】App平台 优化使用Tab时应用的内存占用，提升Android平台窗体动画和页面滚动的平滑度（自定义组件模式）
  + 【重要】App平台 iOS环境，uni-app 编译模式下的nvue页面及所有vue页面，web-view组件从UIWebview调整为WKWebview。[详情](https://ask.dcloud.net.cn/article/36348)
  + 【重要】App平台 新增 nvue 页面支持 vuex 的使用 [详情](https://uniapp.dcloud.io/use-weex?id=vue-%e5%92%8c-nvue-%e5%85%b1%e4%ba%ab%e7%9a%84%e5%8f%98%e9%87%8f%e5%92%8c%e6%95%b0%e6%8d%ae)
  + 新增 编译时增加警告信息（不影响运行）
  + 新增 支持sass-loader 8.0.0版本 [#776](https://github.com/dcloudio/uni-app/issues/776)
  + 优化 image 组件支持自闭合写法 [#625](https://github.com/dcloudio/uni-app/issues/625)
  + 优化 autoprefixer 目标浏览器兼容，减少生成的 css 代码
  + 修复 部分模板写法导致编译器报错的Bug [#604](https://github.com/dcloudio/uni-app/issues/604)
  + 修复 mode 不正确导致 cli 下读取 .env 错误的Bug [#710](https://github.com/dcloudio/uni-app/issues/710)
  + 修复 for 循环中绑定多个事件方法，参数获取不正确的Bug [#720](https://github.com/dcloudio/uni-app/issues/720)
  + 修复 静态资源过大时编译报错的 Bug
  + 修复 部分样式编译时未自动增加 webkit 前缀的 Bug [#769](https://github.com/dcloudio/uni-app/issues/769)
  + App/H5/支付宝小程序平台 新增 导航栏支持配置图片(titleImage) [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App/H5/支付宝小程序平台 新增 支持导航栏透明(transparentTitle) [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App/H5平台 新增 uni.getSystemInfo 支持返回安全区信息（safeArea）
  + App/H5平台 新增 swiper 组件支持 transition 事件
  + App/H5平台 修复 input、textarea 组件禁用状态黑色文字在 iOS 颜色变浅的 Bug
  + App平台 优化 页面背景样式生效时机，解决深色背景等特定场景下，页面切换时闪白的问题
  + App平台 修复 iOS13 页面无法滚动的Bug [详情](https://ask.dcloud.net.cn/question/77877)
  + App平台 新增 uni.onKeyboardHeightChange 支持监听键盘高度变化
  + App平台 新增 uni.getSystemInfo 支持返回手机品牌信息（brand） [详情](https://ask.dcloud.net.cn/question/77313)
  + App平台 新增 nvue 中支持 uni.scss
  + App平台 新增 uni-app 编译模式下的 nvue 页面支持 recycle-list 组件 [详情](https://uniapp.dcloud.io/component/recycle-list)
  + App平台 新增 uni-app 编译模式下的 nvue 页面支持 picker-view 组件
  + App平台 优化 websocket 支持创建多个连接，支持收发 ArrayBuffer 类型数据
  + App平台 优化 renderer配置为native的纯nvue项目，uni.request 发起网络请求时，Content-Type 默认设置为 application/json
  + App平台 优化 uni.request 自动去除 url 首尾空白字符
  + App平台 优化 input 组件 @focus 事件支持获取键盘高度
  + App平台 优化 nvue Android系统switch的样式与性能
  + App平台 优化 nvue button 组件内部支持嵌套 text 组件
  + App平台 修复 nvue 环境 movable-area 组件手势和滚动冲突的 Bug
  + App平台 修复 调用 setNavigationBarTitle 不生效的Bug
  + App平台 修复 微信自定义组件运行时报错的Bug [详情](https://ask.dcloud.net.cn/question/77358)
  + App平台 修复 键盘高度变化事件不生效的 Bug
  + App平台 修复 页面中 web-view 组件的页面加载完成之前标题栏会显示 null 的 Bug
  + App平台 修复 解决 scroll-view、movable-view 组件触摸滑动时会触发下拉刷新的 Bug
  + App平台 修复 纯nvue项目 uni.scanCode、uni.chooseLocation 接口不触发回调的Bug
  + App平台 修复 纯nvue项目 uni.stopPullDownRefresh 不生效的Bug
  + App平台 修复 纯nvue项目 开发运行期间新增 nvue 页面，热更新白屏的Bug
  + App-Android平台 修复 uni-app中网络请求设置method为DELETE时请求参数丢失的Bug [详情](https://ask.dcloud.net.cn/question/77624)
  + App-Android平台 修复 uni-app自定义组件模式下websocket连接报some error occur错误的Bug [详情](https://ask.dcloud.net.cn/question/78789)
  + App-Android平台 修复 nvue web-view组件无法使用定位功能的Bug [详情](https://ask.dcloud.net.cn/question/76909)
  + App-Android平台 修复 nvue textarea、input组件首次触发focus事件时无法获取键盘高度的Bug [详情](https://ask.dcloud.net.cn/question/76923)
  + App-Android平台 修复 nvue map组件中添加的子组件无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/78307)
  + App-Android平台 修复 nvue video标签设置control属性为false时，未播放状态下仍然显示控制栏的Bug
  + App-Android平台 修复 nvue input标签设置adjust-position属性不生效，及KeyboardHeightChange事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/78796)
  + App-Android平台 修复 HBuilderX2.2.0引出的uni原生插件调用（uni.requireNativePlugin）使用时报错的Bug [详情](https://ask.dcloud.net.cn/question/76962)
  + App-iOS平台 修复 uni-app中subNVue页面可能无法接收到父页面通过subNVue.postMessage发送的消息的Bug [详情](https://ask.dcloud.net.cn/question/77312)
  + App-iOS平台 修复 nvue iPhoneX设备软键盘弹出时页面偏移位置不准确的Bug [详情](https://ask.dcloud.net.cn/question/76783)
  + App-iOS平台 修复 nvue map组件添加的子组件可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/76719)
  + App-iOS平台 修复 nvue swipe组件高度动态变化后切页显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/77500)
  + App-iOS平台 修复 nvue video标签设置封面图片（poster）后动态修改src属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77353)
  + App-iOS平台 修复 nvue video标签设置自动播放（autoplay）为true不生效的Bug
  + App-iOS平台 修复 nvue video标签中退出全屏后覆盖元素显示不正常的Bug
  + App-iOS平台 修复 nvue input组件设置adjust-position属性值为false无效的Bug [详情](https://ask.dcloud.net.cn/question/78472)
  + App-iOS平台 修复 nvue webSocket模块设置多个协议（protocol）导致连接服务器失败的Bug
  + App-iOS平台 修复 nvue bindingx在uni-app编译模式下拖拽组件时偏移系数不正确的Bug
  + App-iOS平台 修复 uni原生插件实现代理方法（application:openURL:options:）后与第三方应用交互（如调用微信登录）引起应用崩溃的Bug
  + App-iOS平台 修复 uni原生插件实现代理方法（application:handleOpenURL:）不触发，导致无法获取第三方应用返回数据的Bug
  + H5平台 新增 支持导航栏点击穿透配置（titlePenetrate） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + H5平台 新增 支持 icon 组件。注意此功能会与老版的uni ui的icon组件重名 [详情](https://ask.dcloud.net.cn/article/36404)
  + H5平台 优化 uni.getNetworkType 支持 Safari 浏览器
  + H5平台 修复 rich-text 内部节点包含多个 class 时渲染不正确的 Bug [#756](https://github.com/dcloudio/uni-app/issues/756)
  + H5平台 修复 input 组件 confirm-type 值为 search 时文字垂直不居中的 Bug
  + H5平台 修复 input 组件的 change 事件会冒泡到父组件的Bug [详情](https://ask.dcloud.net.cn/question/77962)
  + H5平台 修复 animation 属性中部分动画不生效的 Bug
  + H5平台 修复 svg 或非base64格式的 Data URI 无法使用的Bug [#668](https://github.com/dcloudio/uni-app/issues/668)
  + 小程序平台 新增 uni.getMenuButtonBoundingClientRect 接口，可获取导航栏右上角胶囊按钮的布局位置信息 [详情](https://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect)
  + 小程序平台 优化 发行时压缩 css 代码
  + 微信小程序平台 修复 当使用小程序插件后，调用数组方法修改数组未触发界面渲染的 Bug [#694](https://github.com/dcloudio/uni-app/issues/694)
  + 支付宝小程序平台 新增 支持分包加载功能
  + 支付宝小程序 新增 button 组件 open-type 属性支持 getPhoneNumber
  + 百度/头条小程序平台 修复 开发工具 sourcemap 无效的Bug [#724](https://github.com/dcloudio/uni-app/issues/724)
  + hello uni-app 新增 nvue地图 组件及API示例
  + hello uni-app 新增 全屏视频上下滑动的示例模板
  + hello uni-app 新增 globalData和vuex的示例模板
  + hello uni-app 优化 cover-view 组件示例(App端使用nvue实现)，支持在视频全屏界面覆盖遮罩物
  + hello uni-app 优化 video 组件示例，新增播放、暂停、设置倍速等能力演示
  + uni-ui 新增 SearchBar 搜索输入框
  + uni-ui 新增 GoodsNav 商品详情页底部购物车、购买导航条
  + uni-ui 新增 Fav 收藏按钮
  + uni-ui 优化 SwipeAction 滑动操作组件，App平台、H5 平台、微信小程序平台利用 wxs 实现跟手式流畅拖动
  + uni-ui 优化 Collapse 折叠面板在低配设备中动画卡顿的问题
  + uni-ui 优化 LoadMore 加载图标可按平台配置或由用户指定，Android平台默认circle，iOS平台默认雪花
  + uni-ui 优化 SwipeDot 优化指示器样式
  + uni-ui 修复 Icons 组件在 H5 平台不显示的BUG。老用户请更新Icons组件 [详情](https://ask.dcloud.net.cn/article/36404)
  + 新闻模板 优化 拖动标签卡时更快的渲染页面、无网络时引导用户设置
* 【5+App插件】
  + 【重要】Android平台 优化 窗体动画popin/popout的效率，Android6+加入老窗体透明alpha效果（同时注意此时动画时长设置不再生效）
  + 【重要】iOS平台 默认Webview从UIWebview改为WKWebview，从iOS13开始苹果将UIWebview列为过期API。[详情](https://ask.dcloud.net.cn/article/36348)
  + 修复 nvue页面在非自定义组件模式下module（模块）只能触发一次回调事件（如webSockets的onMessage事件）的Bug
  + Android平台 修复 部分平板设备横屏显示时可能出现灰色区域的Bug [详情](https://ask.dcloud.net.cn/question/77055)
  + Android平台 修复 图片压缩转换（plus.zip.compressImage）后exif头信息丢失的Bug [详情](https://github.com/dcloudio/uni-app/issues/437)
  + Android平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时控制台输出Unexpected identifier错误的Bug [详情](https://ask.dcloud.net.cn/question/77363)
  + Android平台 修复 设置应用全屏显示（plus.navigator.setFullscreen）时在部分刘海屏设备显示区域可能不正确的Bug
  + Android平台 修复 Webview窗口动画在Android6以下设备可能出现残影的Bug
  + Android平台 修复 使用plus.io.resolveLocalFileSystemURL方法传入路径非'/'结尾是获取目录对象entry不正确，导致entry.getDirectory创建子目录路径不对的Bug
  + iOS平台 新增 云打包支持配置Capabilities，如通用链接（Universal Link）[详情](https://ask.dcloud.net.cn/article/36393)
  + iOS平台 新增 创建本地消息（plus.push.createMessage）支持设置标题（title）和副标题（subtitle） [详情](https://ask.dcloud.net.cn/question/78475)
  + iOS平台 更新 UniPush&个推推送SDK（2.4.1.0）适配iOS13
  + iOS平台 更新 友盟统计SDK（6.0.5）适配iOS13，注意：新版本要求应用使用广告标识IDFA [详情](https://ask.dcloud.net.cn/article/74)
  + iOS平台 修复 使用录音对象（AudioRecorder）时如果用户不允许访问麦克风（未授权）不触发失败回调的Bug
  + iOS平台 修复 音频播放对象（AudioPlayer）的setStyles方法设置开始播放位置（startTime）不准确，isPaused方法获取播放状态不准确的Bug [详情](https://ask.dcloud.net.cn/question/76201)
  + iOS平台 修复 视频播放（VideoPlayer）控件无法播放带身份认证的rtsp地址的Bug [详情](https://ask.dcloud.net.cn/question/76526)
  + iOS平台 修复 视频播放（VideoPlayer）控件在iOS13上退出全屏后显示位置不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）停止搜索设备后再开始可能无法返回之前搜索到的设备，及搜索设置allowDuplicatesKey参数无效的Bug。
  + iOS平台 修复 获取网络gif图片信息（plus.io.getImageInfo）引起应用崩溃的Bug
  + iOS平台 修复 Webview窗口设置滑屏（drag）后，侧滑返回操作可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77462)
  + iOS平台 修复 应用仅配置横屏时调用系统相册选择图片（plus.gallery.pick）时引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77394)
  + iOS平台 修复 图片压缩转换（plus.zip.compressImage）处理图片分辨率过高可能造成内存溢出引起应用崩溃的Bug [详情](https://github.com/dcloudio/uni-app/issues/713)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）显示高分辨率图片可能超出内存溢出引起应用崩溃的Bug
  + iOS平台 修复 直播推流（LivePusher）控件配置开启摄像头（enable-camera）属性导致无法推视频流的Bug
  + iOS平台 修复 直播推流（LivePusher）控件设置视频模式（mode）属性和宽高比（aspect）属性可能不生效的Bug
  + iOS平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时触发成功回调的Bug
  + iOS平台 修复 Webview窗口背景设置为深色时，Tab栏上面会出现白条的Bug [详情](https://ask.dcloud.net.cn/question/77442)
  + iOS平台 修复 Webview窗口使用WKWebview内核时overrideUrlLoading方法无效的Bug [详情](https://ask.dcloud.net.cn/question/78173)
  + iOS平台 修复 蓝牙（Bluetooth）开始搜索后不停止直接关闭页面可能会引起应用崩溃的Bug
  + Hello H5+ 适配iOS平台二维码扫描控件在WKWebview中显示高度可能不正确的Bug（position属性值由fixed调整为absolute）

## 2.2.2.20190816
* 优化 项目外的单独文件的代码提示
* 修复 项目外的单独文件预览不自动刷新的Bug
* 修复 html中 vue自定义组件属性高亮不对的Bug
* 修复 `alt+/`触发代码助手和方法参数提示时，两个窗口位置出现重叠的Bug
* 修复 中文输入法下菜单的&快捷键不生效的Bug
* 优化 酷黑主题 代码选中背景色
* 新增 `shift+滚轮`，横向滚动一页。之前的 `alt+滚轮` 是横向滚动3列
* 【uni-app插件】
  + App平台 修复 uni.chooseLocation 界面搜索地点导致地图高度异常的Bug [详情](https://ask.dcloud.net.cn/question/76645)
* 【5+App插件】
  + Android平台 修复 部分情况下软键盘隐藏后页面底部留白的Bug [详情](https://ask.dcloud.net.cn/question/76683)
  + Android平台 修复 plus.gallery.pick选择视频后返回失败的Bug

## 2.2.1.20190813
* 修复 部分情况下 node插件安装状态错误的Bug
* 修复 部分情况下 HBuilderX启动后只出现图标，窗口无法显示的Bug
* 新增 manifest可视化界面 添加Android选择CPU的设置 
* 【uni-app插件】
  + App平台 修复 uni.request 接口中 responseType 参数设置为 arraybuffer 时,请求无效的 Bug [详情](https://ask.dcloud.net.cn/question/66153)
  + H5平台 修复 开启摇树优化（treeShaking）后，多构建出一份无效文件的Bug [#638](https://github.com/dcloudio/uni-app/issues/638)
* 【5+App插件】
  + Android平台 修复 在小米手机上选择本地视频总是返回失败回调的Bug [详情](https://ask.dcloud.net.cn/question/76469)
  + Android平台 修复 nvue页面中input组件弹出软键盘后报js错误（Failed to receiveTasks, instance is not available）的Bug
  + iOS平台 更新 高德地图SDK：基础SDK（v1.5.7）、3D地图SDK（v6.9.0）、搜索功能（v6.9.0），修复多次打开关闭地图页面引起应用崩溃的Bug [  + 详情](https://ask.dcloud.net.cn/question/66225)  + 
  + iOS平台 修复 视频播放（VideoPlayer）控件的timeupd  + ate事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/76470)  + 
  + iOS平台 修复 视频播放（VideoPlayer）控件全屏时音量  + 调节手势功能无效的Bug  + 
  + iOS平台 修复 Webview窗口配置系统软键盘模式（softinputMode）为adjustResize，收起软键盘后窗口高度无法恢复的Bug [详情](  + https://ask.dcloud.net.cn/question/76374)
  + iOS平台 修复 uni-app项目打包模块配置中勾选“Maps(地图)”但不配置高德或百度地图SDK参数引起提交云端打包失败的Bug

## 2.2.0.20190812
* 优化 html中vue的代码提示、转到定义
* 新增 eslint 支持项目下配置文件（项目下需安装eslint库，并且HBuilderX的插件管理中需要安装eslint插件）
* 新增 eslint 状态栏显示校验错误时，支持一键修复
* 新增 行号右键菜单
* 新增 文件名搜索 `Ctrl+p` 支持空格后继续输入文件路径，如 `index myapp/pages`，支持模糊匹配，方便快速过滤查找目标文件；并支持右侧配置忽略目录
* 优化 文件搜索结果优化排序，优先展示当前项目的文件
* 新增 字符搜索，支持多光标"全选"所有搜索结果 `Alt+Enter`，搭配正则后可大幅提升修改文档的效率
* 修复 字符搜索，正则表达式匹配不准的Bug
* 优化 字符搜索(多文件)，可搜索非UTF-8编码文件中的中文（优于其他国外工具）
* 修复 字符搜索(多文件)，输入搜索内容后，在键盘上按下page down或下箭头，显示no history的Bug
* 修复 字符搜索(多文件)，不停的按回车显示多行搜索结果的Bug
* 优化 字符搜索(多文件)，搜索结果列表页面，当前文件处于已编辑状态时进行提示
* 优化 项目管理器 输入字母，快速定位目录/文件
* 优化 酷黑和雅蓝主题细节
* 优化 不同搜索类型的图标进一步区分清晰
* 新增 less/scss支持显示文档结构图
* 优化 scss/less 代码提示，并增加了一些常用代码块
* 修复 scss 输入`@`，代码助手回车后, 显示两个`@`符号的Bug
* 修复 scss 当文件路径包含中文时，scss编译后，控制台中文显示乱码的Bug
* 优化 dom及jquery代码提示和转到定义，完善度已超过上一代HBuilder，请老用户尽快升级
* 修复 css的class转到定义某些情况下位置不正确的Bug
* 修复 代码提示 通过Vue.component注册的全局组件内的属性、事件以及vuedoc不生效的Bug
* 修复 代码提示 js中定义的class类以及构造函数，在new的时候不提示的Bug
* 修复 代码提示 js中箭头函数内的对象解构参数在函数体内不提示的Bug
* 修复 某些情况下js require或import某个模块后无法提示和转到定义的Bug
* 修复 php 输入$，代码助手回车后, 显示两个$符号的Bug
* 修复 格式化 当HBuilderX程序安装目录存在空格，格式化php，执行失败的Bug
* 修复 某些情况下语法校验错误波浪线不显示的Bug
* 修复 粘贴 多光标分别粘贴多段内容时，若内容含回车则无法分段粘贴的Bug
* 优化 粘贴 自动调整缩进。包括从外部复制代码、首行带缩进等情况。按Ctrl+z可撤销缩进调整
* 修复 多窗口 在新打开的窗口中，保存时不会触发语法校验的Bug
* 修复 多窗口 关闭主窗口，在单窗口打开目录失败的Bug
* 修复 多窗口 关闭某个窗口后点击视图菜单后崩溃的Bug
* 修复 在编辑器内打开文件，当文件在外部被修改时，可能造成HBuilderX无限弹框的Bug
* 修复 在编辑器内打开文件，同时在外部使用git、svn拉取，某些情况下，编辑器内已打开文件内容没有更新的Bug [详情](https://ask.dcloud.net.cn/question/75071)
* 优化 终端 默认打开目录的逻辑，如果当前文件在项目下，默认打开项目的根目录
* 新增 支持切换【Ctrl+鼠标左键】或【Alt+鼠标左键】进行多光标插入（菜单【选择】），对应的，转到定义可使用【Ctrl+鼠标左键】
* 调整 快捷键 `Ctrl+Shift+z` 转移给“重做”功能，“撤销上一个选区”的快捷键改为 `Alt+Shift+z`
* 优化 快捷键 其他工具快捷键方案，补齐注释、条件编译注释的快捷键
* 修复 js 块注释无法折叠的Bug
* 优化 已关闭项目列表中，过滤本地被删除的项目；选中项目，右键菜单增加移除操作 
* 优化 markdown预览支持将任务列表渲染为checkbox
* 修复 部分情况下，真机运行插件安装状态错误的Bug [详情](https://ask.dcloud.net.cn/question/75745)
* 修复 云打包 某些情况下，获取不到基座版本号，导致打包错误的Bug
* 修复 Mac SVN项目，当文件名带有@符号时，提交失败的Bug
* 修复 Mac 项目文件发生变化时，以点开头的文件不显示的Bug
* 修复 Mac 免打扰模式，工具栏被系统顶部菜单遮挡的Bug
* 修复 Mac manifest.json 关闭卡顿的Bug
* 修复 Mac manifest.json Android打包权限配置窗口滚动卡顿的Bug
* 修复 manifest uni-app未设置编译模式时默认值显示错误的Bug
* 删除 app类项目 manifest.json -> SDK配置 微信登录中没有使用到的appsecret参数
* 新增 uni-app 中添加了 `uAlert` 和 `uConfirm` 代码块
* 修复 uni-app debug 因电脑存在多个IP，导致调试失败的Bug
* 修复 uni-app debug 未启动完成时，点击停止运行崩溃的Bug
* 新增 在视图菜单和Mac Dock栏右键菜单 添加uni-debug窗口切换功能
* 新增 【重要】uni-app 支持编辑器直接打断点同步到App调试控制台。在`uni-app`手机端debug启动后，在文档行号处点右键操作，可同步断点到debug窗体的source断点区域
* 新增 【重要】uni-app 支持运行和发布到QQ小程序
* 新增 【重要】uni-app 自定义运行和发布平台（如钉钉小程序、h5-weixin） [详情](https://uniapp.dcloud.io/collocation/package)
* 【uni-app插件】
  + 【重要】H5平台 新增 支持配置摇树优化，打包时裁剪不需要的组件及API，大幅减少H5框架的发行体积，提高首次加载渲染速度 [详情](https://uniapp.dcloud.io/collocation/manifest?id=optimization)
  + 【重要】App平台 自定义组件模式 优化 uni.request 的实现，加快联网速度，尤其是上拉翻页的速度
  + 【重要】App平台 支持纯 nvue 项目，manifest配置 "app-plus" -> "renderer":"native"，可不加载基于 webview 的运行框架，减少包体积、提升启动速度。（新建项目选新闻模板可体验）
  + 【重要】App平台 nvue 的 uni-app 编译模式 新增 组件：cover-view（支持嵌套、滚动）、cover-image、progress、button、checkbox、radio、switch、form、slider、barcode、live-pusher、map（map 组件实现与微信对齐，目前仅支持高德地图）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `swiper`，支持竖向滑动，内嵌 video，实现抖音式视频上下滑动效果（微信基础库 2.4.0以上亦可实现类似功能）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `video`，支持内嵌 cover-view，并支持视频全屏后通过 cover-view 自定义全屏界面内容（用法同微信小程序）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `rich-text`，支持加粗、文字换行
  + 【重要】App平台 nvue 的 uni-app 编译模式 iOS上支持点击顶部状态栏滚动页面到顶部，组件 `scroll-view` 支持enableBackToTop属性为true以实现相同效果
  + 【重要】App平台 nvue 的 uni-app 编译模式 软键盘弹出事件（focus）中支持获取软键盘的高度 [详情](https://uniapp.dcloud.io/component/input)
  + 【重要】App平台 Android 系统 input、textarea、editor 键盘弹出方式默认从 adjustResize 调整为 adjustPan，即输入法弹出后窗体不是缩小而是上推，让软键盘弹出和收起更顺滑，并且与iOS、及各种小程序平台的实现逻辑统一。如不需要此功能，需在 pages.json 中 style->app-plus 节点下设 "softinputMode": "adjustResize"。另 editor 组件目前仍然是 adjustResize
  + 【重要】新增 支持 vue.config.js 配置文件，可自定义 webpack 配置选项，包括增加自定义静态资源目录、小程序自定义组件目录，方便老项目转换 [详情](https://uniapp.dcloud.io/collocation/vue-config)
  + 【重要】新增 CLI版支持 package.json 配置文件扩展，自行扩展条件编译平台（如钉钉小程序、H5-weixin等） [详情](https://uniapp.dcloud.io/collocation/package)
  + 新增 提供离线文档[https://github.com/dcloudio/uni-app/tree/master/docs](https://github.com/dcloudio/uni-app/tree/master/docs)
  + App平台 Android平台 新增 uni-app（自定义组件模式及 nvue 页面）适配支持 arm64-v8a（64位）CPU类型，解决 Google Play 发布 app 必须支持64位的问题 [详情](https://ask.dcloud.net.cn/article/36195)
  + App平台 weex版本升级为最新的0.26.0
  + App平台 uni.chooseLocation 新增 keyword 参数，解决启用百度地图后，选择位置界面附近地址列表为空的 Bug
  + App平台 修复 当 pages.json 中配置页面过多时，windows平台编译报 ENAMETOOLONG 错误的 Bug
  + App平台 修复 static 下部分类型资源文件未打包的 Bug [#619](https://github.com/dcloudio/uni-app/issues/619)
  + App平台 修复 nvue 在 uni-app 编译模式下，nvue页面无法接收参数的 Bug
  + App平台 iOS系统 修复 uni.openLocation 打开的位置展示页面，地图显示不全的 Bug [详情](https://ask.dcloud.net.cn/question/75754)
  + 微信小程序平台 新增 支持在分包内引入插件代码包 [#620](https://github.com/dcloudio/uni-app/issues/620)
  + hello uni-app 首页选项卡页面，重构为 nvue，提升渲染速度
  + hello uni-app 使用定位、相册等功能时，新增权限判断，优化用户体验
  + uni-ui 新增 Calendar 日历组件新增打点、范围选择，优化性能
  + uni-ui 新增 Grid 宫格组件新增红点、数字角标、图片角标显示、点击事件
  + uni-ui 新增 Card 卡片组件新增图文卡片模式
  + uni-ui 新增 Popup 弹出层组件新增动画效果
  + uni-ui 优化 Grid 宫格组件代码重构，修改传值方式，定制度更高
  + uni-ui 修复 Calendar 日历组件高度渲染不正确的 Bug 
  + uni-ui 修复 Collapse 折叠面板组件在动画模式下，动态添加数据高度不正确的 Bug
  + uni-ui 修复 Popup 弹出层组件底部弹出示例样式错乱的 Bug
  + uni-ui 修复 Popup 弹出层组件顶部弹出在 H5 端位置不正确的 Bug
  + uni-ui 修复 LoadMore 加载更多组件不显示”加载中“动画的 bug
  + 新闻/资讯App模板 所有页面均使用nvue实现
* 【5+App插件】
  + 【重要】Android平台 新增 5+ APP和uni-app适配支持arm64-v8a（64位）CPU类型，解决GooglePlay提审要求64位的问题 [详情](https://ask.dcloud.net.cn/article/36195)
  + 【重要】Android平台 更新 支付宝SDK版本为15.6.5，修复SDK版本过低可能被Google Play下架的Bug [详情](https://ask.dcloud.net.cn/question/76073)
  + 新增 支持manifest.json文件中设置屏幕方向（screenOrientation）真机运行时可立即生效（无需提交云端打包） [文档](https://ask.dcloud.net.cn/article/94#screenOrientation)
  + Android平台 新增 适配最新的Android Q（API等级29）系统 [详情](https://ask.dcloud.net.cn/article/36199)
  + Android平台 新增 可在打包时取消x86 cpu支持，以减少apk体积
  + Android平台 修复 部分安卓4.4手机上获取设备信息（plus.device.getInfo）无法返回imei的Bug
  + Android平台 修复 微信登录第一次授权登录可能返回失败的Bug [详情](https://ask.dcloud.net.cn/question/74869)
  + Android平台 修复 华为手机调用plus.runtime.setBadgeNumber(0)无法清除应用角标的Bug [详情](https://ask.dcloud.net.cn/question/72276)
  + iOS平台 新增 视频播放（VideoPlayer）控件支持设置倍速播放（playbackRate）
  + iOS平台 修复 视频播放（VideoPlayer）控件在页面关闭后可能还会在后台重新播放的Bug [详情](https://ask.dcloud.net.cn/question/74022)
  + iOS平台 修复 横竖屏设置中landscape-primary、landscape-secondary方向与android平台相反的Bug
  + iOS平台 修复 使用plus.maps.create创建地图设置宽高为用百分比时计算不准确的Bug [详情](https://ask.dcloud.net.cn/question/75754)
  + iOS平台 修复 蓝牙（Bluetooth）订阅特征值变化（notifyBLECharacteristicValueChange）后触发onBLECharacteristicValueChange事件逻辑不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）特征值的写（write）属性可能获取不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）特征值读（readBLECharacteristicValue）或写（writeBLECharacteristicValue）操作可能不触发回调的Bug

## 2.1.3.20190724
* 修复 Mac svn/git插件 某些菜单不显示的Bug
* 优化 .editorconfig文件内容高亮显示
* 【uni-app插件】
  + 修复 项目路径包含空格时，debugger 的 sourcemap 不正确导致无法打断点的Bug
  + App平台 修复 input 组件 type 值为 number 时 password 属性不生效的 Bug [#556](https://github.com/dcloudio/uni-app/issues/556)
  + App平台 修复 取消扫码会触发扫码成功回调的 Bug
  + App平台 修复 调用 uni.setNavigationBarTitle、uni.setNavigationBarColor 接口会导致隐藏状态的导航栏显示的 Bug
  + App平台 修复 部分特殊设备上 input textarea 组件中 input 事件无法触发的 Bug [详情](https://ask.dcloud.net.cn/question/74222)
  + H5平台 修复 uni.hideLoading 部分场景下失效的 Bug
  + 百度小程序平台 修复 uni.request 方法 dataType 设置为非 json 类型，仍按 json 解析的 Bug [#558](https://github.com/dcloudio/uni-app/issues/558)
* 【5+App插件】
  + Android平台 修复 Webview子窗口调用plus.webview.startAnimation动画可能引起页面不显示的Bug [详情](https://ask.dcloud.net.cn/question/74759)
  + Android平台 修复 Webview窗口软键盘弹出高度可能不正确的Bug [详情](https://ask.dcloud.net.cn/question/74854)
  + Android平台 修复 Webview父子窗口都设置statusbar后导致显示不正确的Bug，统一为父子窗口同时设置statusbar后仅子窗口的statusbar生效
  + Android平台 修复 Webview窗口的标题栏（titleNView）设置搜索框（searchInput）后可能会同时显示标题文字（titleText）的Bug [详情](https://ask.dcloud.net.cn/question/75179)
  + Android平台 修复 wap2app应用首页为选项卡页面在全面屏手机第一次打开底部可能有空白的Bug [详情](https://ask.dcloud.net.cn/question/74896)
  + Android平台 修复 图片进行扫码识别（plus.barcode.scan）返回数据多出引号的Bug [详情](https://ask.dcloud.net.cn/question/74738)
  + Android平台 修复 获取设备信息（plus.device.getInfo）在部分只有一个IMEI号的设备（如华为荣耀6等）无返回值的Bug [详情](https://ask.dcloud.net.cn/question/74855)
  + Android平台 修复 uni-app应用中nvue页面使用uni-app编译模式打包后覆盖安装使用了weex模式（老模式）版本引起nvue页面白屏的Bug
  + iOS平台 修复 Webvie窗口中通过new plus.maps.Map方法创建地图控件后再调用append方法添加其它子窗口会引起地图控件变成全屏大小的Bug
  + iOS平台 修复 UniPush通过苹果APNS通道下发payload为字符串内容时，点击触发click事件中消息对象的payload属性值自动转换为包含无效数据json类型的Bug
  + iOS平台 修复 nvue页面中获取渠道标识（plus.runtime.channel）返回值不正确的Bug
  + iOS平台 修复 真机运行时偶发页面无法渲染（白屏）的Bug [详情](https://ask.dcloud.net.cn/question/74782)

## 2.1.1.20190716
* 修复 终端命令分隔符不对导致运行npm命令失效的Bug
* 修复 Node.js插件依赖的node_module安装失败后，插件仍然被当做已安装成功的Bug
* 【uni-app插件】
  + 修复 TypeScript 项目中包含 nvue 时编译报错的Bug
  + App端 优化 titleNView 配置为字符串"false"时，等同于布尔型false，均为隐藏导航栏
  + App端（Android平台） 修复部分场景下，导航栏标题显示为页面url的Bug
  + H5端 修复 input 组件在 flex 布局下默认宽度为0的Bug
  + H5端 修复 input 组件设置高度后文字默认未垂直居中的Bug
  + hello uni-app 修复顶部选项卡（nvue版本）下拉刷新无法回弹的Bug
* 【5+App插件】
  + iOS平台 修复 uni-app使用非自定义组件模式编译可能出现卡在splash界面或崩溃闪退的Bug [详情](https://ask.dcloud.net.cn/question/74644)
  + iOS平台 修复 5+应用使用WKWebview在某些情况下可能引起闪退的Bug
  + iOS平台 修复 webview的circle样式下拉刷新操作不流畅和显示细节不正确的Bug [详情](https://ask.dcloud.net.cn/question/74717)
  + Android平台 修复 nvue页面中image标签的placeholder属性设置本地地址可能引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/74646)
  + Android平台 修复 原生控件对象（plus.nativeObj.View）不添加到Webview窗口直接显示后无法正常关闭的Bug [详情](https://ask.dcloud.net.cn/question/74744)

## 2.1.0.20190713
* 新增 内置预览浏览器 支持手机模式、默认跨域（无需装插件）、支持右键审查元素、支持地理位置模拟
* 新增 多文件字符搜索功能，支持快速选择当前项目、所有项目，支持项目管理器选择多个文件或文件夹搜索，支持搜索过滤条件，支持文件类型的黑白名单（如只搜索js文件或不搜json文件），支持排除的目录
* 新增 stylus语言服务，支持代码提示、转到定义、选择相同变量，无需安装插件
* 新增 stylus格式化插件
* 新增 支持editorconfig配置，项目下带有.editorconfig文件时会依据该配置调整编辑器的缩进等风格策略 [教程](https://ask.dcloud.net.cn/article/36070)
* 新增 项目关闭。不常用的项目可以临时关闭，折叠到项目管理器底部，并不再索引这些项目
* 新增 通过鼠标的后退前进按钮，触发编辑器光标历史的移动及内置浏览器的网页切换
* 新增 关闭所有标签卡时展示引导页面
* 优化 分栏 支持拖拽标签卡操作分栏
* 优化 js中dom选择器以及jqurey的$()中的代码提示
* 优化 html、vue文档结构图性能
* 优化 windows进入免打扰模式后，提示用户如何退出模式，避免误触F11后无法还原
* 修复 升级时偶发某些插件升级失败的Bug
* 修复 复制编辑器时，再打开新的预览文件时会同步更新另一个编辑器的Bug
* 修复 复制编辑器时，行号的宽度不正确的Bug
* 修复 通过Alt+Shift+上/下产生多光标，此时按Esc，无法去掉多光标状态的Bug
* 修复 注释 多行注释中包括空行时无法反注释的Bug
* 修复 注释 html、markdown的注释里敲回车时错误补充*的Bug
* 修复 注释 `/**`生成jsdoc时某些情况下匹配的参数不对的Bug
* 修复 终端 Mac下因环境变量问题，终端启动后，某些命令无法使用的Bug
* 修复 终端 Windows下有时终端首次显示不全的Bug
* 修复 终端 打开内置终端，会自动再开一个空的控制台的Bug
* 修复 终端 非项目内的文件点右键打开命令行，会打开外部终端的Bug
* 修复 终端 Windows 隐藏内置终端后，右键菜单点击【使用命令行窗口打开所在目录】没有响应的Bug
* 修复 Mac 某些情况下，复制选区或当前行功能无法使用的Bug
* 修复 因某些非打印字符导致的文档保存不正确的Bug
* 修复 单窗口弹出自动下载语言对话框导致无法点击其它区域的Bug
* 修复 当多个窗体时，windows任务栏上，点击关闭某个窗体崩溃的Bug
* 修复 提示方法代码块时取消不会隐藏代码助手，关闭文件再点击导致崩溃的Bug
* 修复 某些情况下，Node.js插件(如eslint)安装失败的Bug
* 修复 超长文本搜索，工具栏显示异常的Bug
* 修复 html中引用的css地址带参数时，class无法转到定义的Bug
* 修复 url以`//`开头无法跳转的Bug
* 修复 html中es6模板字符串跨行着色的Bug
* 修复 vue指令属性带_时高亮不正确的Bug
* 修复 vue `<script type="text/ecmascript-6">`中注释错误以及不高亮的Bug
* 修复 当文件存在base64超长文本时，输入某些特殊字符造成卡顿的Bug
* 修复 Mac 运行自定义基座，找不到java时，运行失败的Bug
* 修复 Mac 插件市场，下载组件解压失败的Bug
* 修复 打包界面服务器返回异常，有时出现横向滚动条的Bug
* 修复 点击控制台运行时有时候提示请选择正确的项目类型的Bug
* 新增 uni-app 点击界面右上角预览时，自动编译项目到H5端并显示在内置浏览器中
* 调整 uni-app 运行到chrome时默认ip修改为localhost，避免定位等API在非Https下无法使用的问题
* 新增 uni-app px转rpx自动换算，在设置中配置转换比例，代码中敲px时代码助手会列出计算过的rpx值
* 修复 uni-app cli项目的控制台日志输出，无法点击转到源文件的Bug
* 新增 uni-app manifest.json, App SDK配置，可视化界面增加百度地图
* 修复 uni-app manifest.json, 插件配置，复制参数值导致崩溃的Bug
* 【uni-app插件】
  + 【重要】App平台 新增 debug调试功能（限自定义组件模式），支持vue/nvue页面断点调试、支持nvue页面element审查 [详情](https://uniapp.dcloud.io/snippet?id=%e5%85%b3%e4%ba%8e-app-%e7%9a%84%e8%b0%83%e8%af%95)
  + 【重要】App平台 nvue 新增 uni-app编译模式。以后同时存在weex编译模式和uni-app编译模式。uni-app编译模式将不再使用weex组件，而是改用uni基础组件，目前已支持部分组件，并支持nvue页面编译到H5和小程序端 [详情](https://ask.dcloud.net.cn/article/36074)
  + 【重要】App平台 nvue 新增 编译时校验css合法性，对于App平台的nvue不支持的样式在控制台给予告警（不影响编译结果） [详情](https://ask.dcloud.net.cn/article/36093)
  + 调整 推荐使用rpx替代upx，rpx支持全端动态绑定，无需再使用uni.upx2px [详情](https://ask.dcloud.net.cn/article/36130)
  + 修复 内置CSS变量应用于calc方法时，在特定场景下失效的Bug [详情](https://ask.dcloud.net.cn/question/67834)
  + 修复 自定义组件模式下，未直接修改 props 仍报 [Vue warn]: Avoid mutating a prop directly… 异常信息的Bug [详情](https://ask.dcloud.net.cn/question/72649)
  + 修复 自定义组件模式下，非 h5 平台，当计算属性发生错误，导致页面其他数据不再更新的 Bug [#530](https://github.com/dcloudio/uni-app/issues/530)
  + App/H5平台 修复 input 组件 letter-spacing 样式不生效的 Bug [#485](https://github.com/dcloudio/uni-app/issues/485)
  + App/H5平台 修复 textarea 组件在 iOS 设备上自增高度计算错误的 Bug [详情](https://ask.dcloud.net.cn/question/68372)
  + App/H5平台 修复 input 组件 min-height 样式不生效的 Bug
  + App平台 新增 支持 navigationStyle 配置为 custom 时隐藏导航栏
  + App平台 新增 nvue 在uni-app编译模式下，新增支持全局样式（App.vue中的样式，会作用于页面级.nvue文件）
  + App平台 新增 uni.getLocation 接口支持获取海拔高度
  + App平台 优化 uni.previewImage 的 longPressActions 回调支持返回图片索引值
  + App平台 优化 uni.connectSocket 接口支持 protocols 参数配置
  + App平台 优化 组件 style 动态绑定样式支持 upx 单位
  + App平台 修复 backgroundAudioManager 对象 onStop 事件监听不生效的 Bug
  + App平台 修复 uni.getSavedFileList、uni.getSavedFileInfo 能获取到已删除文件信息的 Bug [详情](https://ask.dcloud.net.cn/question/77936)
  + App平台 修复 map 组件 中的 iconPath 不支持本地路径的 Bug [详情](https://ask.dcloud.net.cn/question/72660)
  + App平台 修复 uni.getStorageInfo 无法获取缓存信息的 Bug [详情](https://ask.dcloud.net.cn/question/70600)
  + App平台 修复 textarea 组件 @blur 事件中未返回 cursor 参数的 Bug [#365](https://github.com/dcloudio/uni-app/issues/365)
  + App平台 修复 uni.chooseLocation 打开的位置选择页面，下方的地点列表某些情况无法自动加载的 Bug [详情](https://ask.dcloud.net.cn/question/73007)
  + App平台 修复 cover-view 组件无法销毁的 Bug
  + App平台 修复 cover-view 组件在安卓平台，特定情况下无法显示文字的 Bug
  + App平台 修复 cover-image 组件在自定义组件编译模式，无法使用网络图片路径的 Bug [详情](https://ask.dcloud.net.cn/question/69236)
  + App平台 修复 uni.scanCode 在 iOS 设备上侧滑返回不触发 fail 回调的 Bug [详情](https://ask.dcloud.net.cn/question/73372)
  + App平台 修复 在 uni.scanCode 回调函数内调用 uni.setNavigationBarTitle 接口不生效的 Bug [详情](https://ask.dcloud.net.cn/question/73593)
  + App平台 修复 input 组件设置 disabled 属性后，在 iOS 平台文字颜色变浅的 Bug [详情](https://ask.dcloud.net.cn/question/72971)
  + App平台 修复 uni.chooseVideo 返回值中 duration/width/height 错误的 Bug [详情](https://ask.dcloud.net.cn/question/71001)
  + App平台 修复 非自定义组件模式 InnerAudioContext 对象无法销毁的 Bug
  + App平台 修复 InnerAudioContext 对象获取 buffered 值不正确的 Bug [详情](https://ask.dcloud.net.cn/question/73902)
  + H5平台 新增 uni.createIntersectionObserver 接口支持
  + H5平台 新增 uni.createAnimation 接口支持，组件支持 animation 属性
  + H5平台 新增 video 组件支持配置 x5-playsinline 属性
  + H5平台 优化 uni.showModal 内容支持通过 \n 实现换行显示 [详情](https://ask.dcloud.net.cn/question/67355)
  + H5平台 优化 自动修改 document.title 为 navigationBarTitleText 的值 [#394](https://github.com/dcloudio/uni-app/issues/394)
  + H5平台 优化 URL 参数解析方式 [#445](https://github.com/dcloudio/uni-app/issues/445)
  + H5平台 优化 页面生命周期 onLaunch、onShow 中支持获取 path、query 参数 [#408](https://github.com/dcloudio/uni-app/issues/408)
  + H5平台 修复 在页面或组件内定义 input 组件 placeholder-class 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/62846)
  + H5平台 修复 InnerAudioContext 对象 buffered 属性读取报错的 Bug [详情](https://ask.dcloud.net.cn/question/73902)
  + H5平台 修复 onPageScroll、onReachBottom 等生命周期无法触发的 Bug
  + H5平台 修复 uni.canvasToTempFilePath 接口 desWidth、desHeight 参数不生效的 Bug
  + H5平台 修复 微信浏览器中 uni.openLocation 打开的查看位置页面，“去这里”按钮点击无效的 Bug [详情](https://ask.dcloud.net.cn/question/73089)
  + H5平台 修复 mixin 中定义的 onLoad、onShow 等页面生命周期钩子函数不生效的 Bug [详情](https://ask.dcloud.net.cn/question/69412)
  + H5平台 修复 textarea 组件设置 auto-height 属性后，在 Chrome 浏览器内仍然显示滚动条的 Bug [详情](https://ask.dcloud.net.cn/question/68372)
  + H5平台 修复 textarea 组件在特定场景下，不触发@input事件的 Bug [详情](https://ask.dcloud.net.cn/question/73221)
  + H5平台 修复 uni.showLoading 方法 mask 参数配置无效的 Bug
  + H5平台 修复 innerAudioContext 对象的 src 属性使用相对路径时，音频无法播放的 Bug [详情](https://ask.dcloud.net.cn/question/73632)
  + H5平台 修复 uni.previewImage 不传 current 参数时，运行报错的 Bug
  + H5平台 修复 movable-area 组件 scale 事件中无法获取 x、y 属性的Bug [#408](https://github.com/dcloudio/uni-app/issues/415)
  + H5平台 修复 navigator 组件 delta 属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/65354)
  + H5平台 修复 uni.navigateBack 接口 delta 值大于1时中间页面未销毁的Bug [详情](https://ask.dcloud.net.cn/question/62639)
  + H5平台 修复 在 Chrome 浏览器中快速滑动 swiper 组件，可能会导致动画卡死的 Bug [#107](https://github.com/dcloudio/uni-app/issues/107)
  + H5平台 修复 在 iOS 浏览器中点击 view 组件显示半透明高亮效果的 Bug [#440](https://github.com/dcloudio/uni-app/issues/440)
  + 微信小程序平台 修复 页面默认显示分享菜单的Bug [#411](https://github.com/dcloudio/uni-app/issues/411)
  + 支付宝小程序平台 新增 transitionend/animationstart/animationiteration/animationend 通用事件支持
  + 支付宝小程序平台 新增 scroll-view 组件支持scrolltoupper/scrolltolower事件
  + 支付宝小程序平台 修复 无法使用npm方式引入@dcloudio/uni-ui的Bug  [#431](https://github.com/dcloudio/uni-app/issues/431)
  + 支付宝小程序平台 修复 web-view 组件中 postMessage 不能正常触发 @message 事件的 Bug [#389](https://github.com/dcloudio/uni-app/issues/389)
  + 百度小程序平台 修复 页面直达时，onLoad生命周期不触发的Bug
  + 百度小程序平台 修复 App.vue中onShow不触发的Bug [详情](https://ask.dcloud.net.cn/question/71446)
  + 头条小程序平台 修复 getCurrentPages 接口返回的页面对象中route属性缺失的Bug [详情](https://ask.dcloud.net.cn/question/72603)
  + uni-ui 修复 LoadMore 加载更多组件不显示加载中动画的 Bug
  + hello uni-app 小程序平台 当用户拒绝定位权限后，再次点击获取定位时，引导用户去设置中开启
  + 新闻/资讯App模板 nvue页面使用新的uni-app编译模式，用uni基础组件重写，实现了nvue页面直接跨多端，App端新增了自定义的下拉刷新
  + 登录模板 修复 在支付宝平台页面高度设置 100% 未生效的Bug
  + 登录模板 修复 在头条小程序上自定义组件编译模式下输入框样式错乱的 Bug
* 【5+App插件】
  + 【重要】新增 5+App添加UniPush功能，替代之前的个推和小米推送。[详情](https://ask.dcloud.net.cn/article/35622)
  + 【重要】新增 获取设备信息方法（plus.device.getInfo），不再推荐使用plus.device.imei。把属性改为方法可以避免Android平台在应用启动时被某些手机提示需要电话权限的问题。[详情](https://ask.dcloud.net.cn/article/36075)
  + 【重要】Android平台 云端打包API等级（targetSdkVersion）默认值调整为26，满足各主流应用市场的上架要求
  + 新增 获取应用（ipa/apk）版本号（plus.runtime.versionCode）接口 [文档](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.versionCode)
  + 新增 获取应用信息（plus.runtime.getProperty）支持manifest.json文件中的版本号（version->code字段值） [文档](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.WidgetInfo)
  + 修复 网络请求接口（plus.net.XMLHttpRequest）获取HTTP响应头部信息字段中多一个空格的Bug
  + Android平台 优化 图片预览（plus.nativeUI.previewImage）界面未沉浸式状态栏效果
  + Android平台 修复 配置渠道云端打包后获取的渠道信息（plus.runtime.channel）总是为空的Bug [详情](https://ask.dcloud.net.cn/question/72721)
  + Android平台 修复 HBuilderX2.0.0版本引出的plus.io.getImageInfo一直触发失败回调的Bug [详情](https://ask.dcloud.net.cn/question/72240)
  + Android平台 修复 搜索蓝牙设备（plus.bluetooth.startBluetoothDevicesDiscovery）设置为允许重复上报相同设备（allowDuplicatesKey参数为true）时，获取设备列表为空的Bug
  + Android平台 修复 图片预览（plus.nativeUI.previewImage）设置两张图片且loop为true会闪退的Bug [详情](https://ask.dcloud.net.cn/question/72711)
  + Android平台 完善 原生图片对象（plus.nativeObj.Bitmap）保存图片（save）方法兼容非预期参数 [详情](https://ask.dcloud.net.cn/question/72937)
  + Android平台 修复 使用unipush模块提交华为应用市场报“HMS根证书文件”错误的Bug [详情](https://ask.dcloud.net.cn/question/73258)
  + Android平台 修复 Webview窗口在某些情况（如退出视频全屏播放、弹出软键盘按home键后再切回前台、wap2app应用设置statusbar）可能出现底部空缺的Bug [详情](https://ask.dcloud.net.cn/question/72909)
  + Android平台 修复 subnvue窗口在某些情况下调用setStyle无效的Bug
  + Android平台 修复 视频控件（VideoPlayer）可能偶发出现进度条不更新不消失的Bug
  + Android平台 修复 视频播放（VideoPlayer）控件提交云端打包后无法播放本地视频文件的Bug [详情](https://ask.dcloud.net.cn/question/74129)
  + Android平台 修复 应用第一次运行时调用定位功能可能不弹出定位权限申请框也不触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/73081)
  + Android平台 修复 原生控件（NView）绘制字体图标在部分魅族手机上可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/64233)
  + Android平台 修复 部分手机上设置titleNView后可能引起页面高度不对的Bug [详情](https://ask.dcloud.net.cn/article/74198)
  + Android平台 修复 通过plus.runtime.launchApplication启动的应用可能出现plus.runtime.arguments更新失败的Bug [详情](https://ask.dcloud.net.cn/question/74479)
  + Android平台 修复 nvue页面云端打包后设置字体（font-family）属性可能无效的Bug
  + Android平台 修复 nvue页面创建WebSockets连接服务器总是反馈超时错误的Bug
  + Android平台 修复 uni-app为多tab应用，切换显示nvue页面时可能出现顶部留白的Bug [详情](https://ask.dcloud.net.cn/question/73687)
  + iOS平台 修复 提交苹果应用市场（AppStore）审核提示违反Guideline2.5.2的Bug [详情](https://ask.dcloud.net.cn/question/70813)
  + iOS平台 修复 音频播放（AudioPlayer）后台播放网络音乐时控制页面（iOS锁屏控制页）进度显示不准确的Bug [详情](https://ask.dcloud.net.cn/question/71891)
  + iOS平台 修复 数据库（SQLite）在多个页面同时操作时可能无效的Bug [详情](https://ask.dcloud.net.cn/question/72299)
  + iOS平台 修复 Webview窗口设置不替换H5标准定位接口（replacewebapi：{geolocation:'none'}）不生效的Bug
  + iOS平台 修复 日期选择（plus.nativeUI.pickDate）设置显示日期小于起始日期时默认返回的日期不正确的Bug [详情](https://ask.dcloud.net.cn/question/71886)
  + iOS平台 修复 获取图片信息（plus.io.getImageInfo）可能不触发回调的Bug [详情](https://ask.dcloud.net.cn/question/71511)
  + iOS平台 修复 非自定义组件模式在某些情况子窗口高度计算不正确的Bug [详情](https://ask.dcloud.net.cn/question/72889)
  + iOS平台 修复 视频控件（VideoPlayer）播放时拖放调整进度后可能不触发播放结束事件的Bug
  + iOS平台 修复 子Webview窗口中软键盘收起后页面无法自动恢复的Bug [详情](https://ask.dcloud.net.cn/question/74321)
  + iOS平台 修复 蓝牙（Bluetooth）第一次获取本机蓝牙适配器状态（getBluetoothAdapterState）不触发回调的Bug [详情](https://ask.dcloud.net.cn/question/73242)
  + iOS平台 修复 蓝牙（Bluetooth）特征值的write操作类型值为false时无法写入数据的Bug [详情](https://ask.dcloud.net.cn/question/69458)
  + iOS平台 修复 蓝牙（Bluetooth）特征值的notify操作类型值为true时无法订阅的Bug [详情](https://ask.dcloud.net.cn/question/72063)
  + iOS平台 修复 nvue页面打开vue页面后弹出软键盘时可能会露出之前nvue页面内容的Bug
  + iOS平台 修复 nvue页面中img标签src属性不支持"_doc"等开头的图片地址的Bug [详情](https://ask.dcloud.net.cn/question/64986)
  + iOS平台 修复 地图控件中的标点对象（marker）在新开页面后再返回时点击报js错误的bug [详情](https://ask.dcloud.net.cn/question/74517)
  + iOS平台 修复 nvue页面中获取渠道标识（plus.runtime.channel）返回值不正确的Bug

## 2.0.1.20190614
* 修复 PHP语言服务需要配置PHP环境的问题，自带了一个PHP环境到插件中，并解决之前配置依赖不生效的Bug
* 修复 单项目窗体，创建项目跑到主窗口的Bug
* 修复 emmet某些情况下中文乱码的Bug
* 【5+App插件】
  + Android平台 修复 配置渠道云端打包后获取的渠道信息（plus.runtime.channel）总是为空的Bug [详情](https://ask.dcloud.net.cn/question/72721)
  + Android平台 修复 图片预览（plus.nativeUI.previewImage）设置两张图片且loop为true会闪退的Bug [详情](https://ask.dcloud.net.cn/question/72711)

## 2.0.0.20190610
* 【重要】新增 Android支持多渠道打包 [详情](https://ask.dcloud.net.cn/article/35974)。发布到Google Play Store，必须选对应渠道包，否则会无法上架！
* 新增 php语言服务，包括语法提示和转到定义（需要在插件安装中安装插件）
* 新增 PHP格式化插件(php cs fixer)
* 新增 置焦项目管理器快捷键【Win: Alt+Shift+Q，Mac：Ctrl+Shift+Q】
* 新增 多窗口之间切换的快捷键【alt + `】
* 新增 右键菜单 - 使用命令行窗口打开所在目录，可以选择在内置终端或外部终端中打开（设置-运行设置里选择）
* 优化 html标签，输入`>`，自动补全闭合标签
* 修复 多窗口下，真机运行控制台混乱的Bug
* 优化 打包成功时，控制台下载链接，区分iOS、Android打包类型
* 修复 某种情况下，因获取打包状态错误，导致下载安装包命名错误的Bug
* 修复 markdown 删除代码区时背景色仍保留一行的Bug
* 修复 单行超长时（如含有base64超长字符），移动光标、滚动会卡顿的Bug
* 修复 双击标签卡无法全屏的Bug
* 修复 窗口位置在屏幕左侧以外时，关闭后下次再打开丢失标签卡的Bug
* 优化 撤销 一次撤销太多内容的逻辑，支持按空格分段撤销，超过2秒间隔不一并撤销
* 优化 项目管理器 支持键盘操作，包括上下左右箭头、pg up/down、Home、End、*键
* 修复 Mac 项目管理器上按回车触发了重命名的Bug
* 优化 Win版内置浏览器升级为Chrome71
* 优化 运行node命令时可选择使用内置终端或外部终端
* 修复 windows内置终端，无法Ctrl+c Ctrl+v复制粘贴的Bug（逻辑同powershell）
* 优化 typescript的方法参数提示
* 优化 新建自定义文件，输入文件名敲`.`时，如果光标后面还是`.`，则第一次输入`.`时自动右移光标
* 优化 manifest图标配置
* 优化 manifest可视化视图，新增`App常用其他设置`，包括scheme、targetSdkVersion、背景音频的可视化设置，新增自定义组件编译模式的可视化设置
* 修复 在部分语言文件中，双击单词，会把前后的“-”一起选中的Bug
* 优化 云打包时若HBuilderX版本与打包服务器不匹配，提示各自的版本号信息
* 新增 uni-app 插件大赛一等奖获奖作品内置到新建项目模板中 [详情](https://ask.dcloud.net.cn/article/35939)
* 修复 uni-app 新建组件重名覆盖的Bug
* 优化 uni-app 新建页面，可选择是否同时添加路由信息到pages.json、可选择添加到pages.json的主包或分包、可选择是否同时创建nvue文件
* 【uni-app插件】
  + 【重要】App平台 新增 subNVue ，支持使用原生组件绘制自定义导航栏、全屏遮罩等 [详情](https://uniapp.dcloud.io/api/window/subNVues)
  + 【重要】支付宝/百度/头条小程序平台 新增 支持自定义组件模式，提升性能和增强vue语法支持，[详见](https://ask.dcloud.net.cn/article/35843)
  + 新增 uni.$on,uni.$once,uni.$off,uni.$emit 方法，提供更优雅的页面间通信解决方案 [详情](https://uniapp.dcloud.io/api/window/communication)
  + 新增 组件 editor 富文本编辑器组件，包括微信和App平台 [详情](https://uniapp.dcloud.io/component/editor)
  + 新增 pages.json支持配置导航栏下方的阴影线navigationbarshadow [详情](https://uniapp.dcloud.io/collocation/pages?id=navigationbarshadow)
  + 修复 map 组件 @regionchange 事件绑定不生效的bug [详情](https://ask.dcloud.net.cn/article/35534)
  + 修复 更多 v-model 用法支持 [详情](https://ask.dcloud.net.cn/question/71517)
  + App平台 新增 uni.chooseVideo API 支持 camera、maxDuration 参数 [详情](https://uniapp.dcloud.io/api/media/video?id=choosevideo)
  + App平台 新增 getLocation 支持geocode参数，开发者可控制是否解析省市街道地址信息 [详情](https://uniapp.dcloud.io/api/location/location?id=getlocation)
  + App平台 新增 getLocation 成功回调中增加 address 属性，支持获取省市街道地址信息 [详情](https://uniapp.dcloud.io/api/location/location?id=getlocation)
  + App平台 修复 getLocation 经纬度获取成功、但地址解析失败时，未触发成功回调的Bug
  + App平台 修复 项目中仅包含 nvue 页面时运行报错的Bug
  + App平台 修复 偶发编译出错后再次保存代码不再继续编译的Bug
  + App平台 修复 popup类型的subNVue在特定场景下弹出时，遮罩未覆盖底部选项卡的Bug [详情](https://ask.dcloud.net.cn/question/72091)
  + App平台 修复 部分 iOS 机型上 uni.canvasToTempFilePath 保存的图像内容空白的问题 [详情](https://ask.dcloud.net.cn/question/71200)
  + App平台 修复 picker 组件在部分安卓手机上关闭时报错的Bug
  + App平台 修复 picker 组件在 iOS8 设备上无法显示的Bug
  + App平台 修复 uni.previewimage 接口的 longPressActions 回调无效的Bug
  + H5平台 新增 innerAudioContext 实现取消事件监听方法 [#393](https://github.com/dcloudio/uni-app/issues/393)
  + H5平台 优化 picker、picker-view 组件滚动停止过慢的问题 [#278](https://github.com/dcloudio/uni-app/issues/278)、[#367](https://github.com/dcloudio/uni-app/issues/367)
  + H5平台 修复 Safari 浏览器调用 uni.getSystemInfoSync 接口报错的Bug
  + H5平台 修复 uni.getSystemInfoSync 在部分手机上执行异常的Bug [详情](https://ask.dcloud.net.cn/question/71622)
  + H5平台 修复 picker 组件设置 start 属性后导致部分日期无法选择的Bug [#404](https://github.com/dcloudio/uni-app/issues/404)
  + H5平台 修复 video 组件全屏后播放控件被视频遮挡的Bug [详情](https://ask.dcloud.net.cn/question/71831)
  + H5平台 修复 页面点击事件中获取的x坐标不正确的Bug [详情](https://ask.dcloud.net.cn/question/71921)
  + H5平台 修复 uni.showToast() 被部分页面元素遮挡的Bug [详情](https://ask.dcloud.net.cn/question/70914)
  + H5平台 修复 某些情况下外部修改 history 导致路由卡在当前页面、无法后退的Bug
  + H5平台 修复 部分浏览器上 canvas 监听 touch 事件无法获取触发坐标的Bug
  + H5平台 修复 image 组件的src属性为空时，错误触发资源请求的Bug
  + H5平台 修复 movable-view 组件的animation属性无效的Bug
  + 微信小程序平台 新增 支持workers目录配置 [详情](https://uniapp.dcloud.io/collocation/manifest?id=mp-weixin)
  + 支付宝小程序平台 新增 设置TabBar 相关API [详情](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem)
  + 支付宝小程序平台 修复 uni.showLoading() 在小程序开发者工具 v0.32.3 版本下报错的Bug [详情](https://ask.dcloud.net.cn/question/71332)
  + 百度小程序平台 修复 自定义组件模式下，页面的 onShow 生命周期不触发的Bug
  + hello uni-app 新增 原生子窗体（subNVue）示例
  + hello uni-app 新增 iBeacon 示例
  + hello uni-app 新增 editor 富文本编辑器示例
  + hello uni-app 在支付宝/百度/头条小程序平台，开启[自定义组件模式](https://ask.dcloud.net.cn/article/35843)
* 【5+App插件】
  + 新增 Webview窗口标题栏（titleNView）支持获取输入搜索内容功能（getTitleNViewSearchInputText） [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.getTitleNViewSearchInputText)
  + 新增 Webview窗口标题栏（titleNView）支持监听搜索输入框焦点变化事件（titleNViewSearchInputFocusChanged） [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewEvent)
  + Android平台 修复 Webview窗口未设置标题栏（titleNView）时可能出现显示错误的Bug
  + Android平台 修复 数据库多次执行事务（plus.sqlite.transaction）可能不成功的Bug
  + Android平台 修复 蓝牙（Bluetooth）搜索设备返回的advertisData数据丢失前连个字节的Bug [详情](https://ask.dcloud.net.cn/question/70486)
  + Android平台 修复 部分设备上开启全面屏手势的情况下获取屏幕高度（plus.screen.resolutionHeight）不正确的Bug [详情](https://ask.dcloud.net.cn/question/71725)
  + Android平台 修复 网络请求（plus.net.XMLHttpRequest）没有共享cookie的Bug [详情](https://ask.dcloud.net.cn/question/71287)
  + Android平台 修复 视频控件（VideoPlayer）切换视频可能出现无法播放的Bug
  + Android平台 修复 视频控件（VideoPlayer）播放部分rtmp协议视频可能出现没有声音的Bug [详情](https://ask.dcloud.net.cn/question/69609)
  + Android平台 修复 uni-app应用设置窗口背景透明不生效的Bug [详情](https://ask.dcloud.net.cn/question/70793)
  + Android平台 修复 调用摄像头（Camera）录像完成后点击播放可能触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/71210)
  + iOS平台 修复 提交苹果应用市场（AppStore）审核提示违反Guideline2.5.2的Bug [详情](https://ask.dcloud.net.cn/question/70813)
  + iOS平台 修复 音频播放（AudioPlayer）后台播放网络音乐时控制页面（iOS锁屏控制页）进度显示不准确的Bug [详情](https://ask.dcloud.net.cn/question/71891)
  + iOS平台 修复 日期选择对话框（plus.nativeUI.pickDate）返回日期可能不准确的Bug [详情](https://ask.dcloud.net.cn/question/71886)
  + iOS平台 修复 Webview窗口移除原生控件（plus.nativeObj.View）不生效的Bug
  + iOS平台 修复 Webview窗口获取样式（getStyle）返回的json对象键名称全部为小写的Bug
  
## 历史更新日志
[https://update.dcloud.net.cn/hbuilderx/changelog/2.0.0.20190610.html](https://update.dcloud.net.cn/hbuilderx/changelog/2.0.0.20190610.html)
