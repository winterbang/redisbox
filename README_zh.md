# Redisbox

> An Redis 图形化客户端

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

> ## 功能

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
  - [x] GET (返回key的值)
  - [x] MGET (获得多个key的值)
  - [ ] SET (设置多个key的值)
  - [ ] MSET (设置多个key的值)
  - [ ] APPEND
  - [ ] STRLEN (获取指定key值的长度)
  - [ ] SETEX (同时设置过期的秒数和过期时间)
  - [ ] SETNX (只有当该键不存在时设置该键的值)
  - [ ] MSETNX (设置多个只有当该键不存在时设置该键的值)
  - [ ] EXPIREAT (设置一个UNIXS时间戳的过期的时间)
- Others
  - [x] NewConnection 添加连接
  - [x] Infomation 关于Redisbox的信息
  - [x] Donate 捐赠
  - [ ] ImportConnection 导入连接的Json文件
  - [ ] ExportConnection 导出连接到Json文件
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
