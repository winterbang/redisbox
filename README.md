<center>
  <img src="src/renderer/assets/logo.png"  width="80px" height="80px">
</center>
<center>
  [Download](https://github.com/winterbang/redisbox/releases) | [Homepage](http://www.redisbox.com/)
</center>
<center>
  [![GitHub release](https://img.shields.io/github/release-pre/winterbang/redisbox.svg)](https://github.com/winterbang/redisbox/releases/latest)

  [![GitHub](https://img.shields.io/github/license/winterbang/redisbox.svg)](https://github.com/winterbang/redisbox/blob/master/LICENSE)

  [![GitHub All Releases](https://img.shields.io/github/downloads/winterbang/redisbox/total.svg)](https://github.com/winterbang/redisbox/releases/latest)
</center>

# Redisbox
> An `Redis` gui client :desktop_computer:

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint

```

---

## 尝鲜版本预览
![1](/docs/assets/images/v0.0.1/1.jpg)
![1](/docs/assets/images/v0.0.1/2.jpg)
![1](/docs/assets/images/v0.0.1/3.jpg)
![1](/docs/assets/images/v0.0.1/4.jpg)
![1](/docs/assets/images/v0.0.1/5.jpg)
![1](/docs/assets/images/v0.0.1/6.jpg)

---

## 功能
- Connections
  - [x] SELECT (选择新数据库)
  - [ ] AUTH (验证服务器命令)
  - [ ] PING (Ping服务器)
  - [ ] ECHO (回显输入的字符串)
  - [ ] QUIT (设置一个key的过期的秒数)
  - [ ] SWAPDB (两个数据库间切换)
- Keys
  - [x] Keys (查找所有匹配给定的模式的键)
  - [ ] DEL (删除指定的一批keys)
  - [ ] DUMP (导出key的值)
  - [ ] EXISTS (查询一个key是否存在)
  - [ ] EXPIRE (设置一个key的过期的秒数)
  - [ ] EXPIREAT (设置一个UNIXS时间戳的过期的时间)
- String
  - [x] GET (获取指定key值)
  - [x] MGET (获取多个指定key的值)
  - [ ] SET
  - [ ] MSET
  - [ ] APPEND
  - [ ] STRLEN (获取指定key值的长度)
  - [ ] SETEX (设置过期的秒数)
  - [ ] EXPIREAT (设置一个UNIXS时间戳的过期的时间)
- Others
  - [x] NewConnection 添加连接
  - [x] EditConnection 编辑连接
  - [x] Infomation 关于Redisbox的信息
  - [x] Donate 捐赠
  - [x] ExportConnection 导出连接到Json文件
  - [x] ImportConnection 导入连接的Json文件
  - [ ] Setting 设置
  - [ ] Feedback 反馈
  - [ ] Share 分享应用

<!-- ## 使用到的框架和插件 -->

  <!-- - 框架
    - [vue](https://github.com/vuejs/vue) v2.5.2
  - 插件
    - [vue-router](https://github.com/vuejs/vue-router) v3.0.1
    - [gitment](https://github.com/imsun/gitment) v0.0.3
    - [axios](https://github.com/axios/axios) v0.17.0
    - [marked](https://github.com/chjj/marked) v0.3.6
    - [highlight.js](https://github.com/isagalaev/highlight.js) v9.12.0
    - [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe) v4.1.2
    - [anchorjs](https://github.com/bryanbraun/anchorjs) v4.1.0 -->
## Contributions
    We welcome all contributions.You can submit any ideas as [pull requests](https://github.com/winterbang/redisbox/pulls) or as GitHub [issues](https://github.com/winterbang/redisbox/issues). 
