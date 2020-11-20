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
  - [ ] PEXPIRE (设置 key 的过期时间以毫秒计)
  - [ ] PEXPIREAT (设置 key 过期时间的时间戳(unix timestamp) 以毫秒计)
  - [ ] TYPE (返回key所储存的值的类型)
  - [ ] MOVE (将当前数据库的 key 移动到给定的数据库 db 当中)
  - [ ] PERSIST (移除 key 的过期时间，key 将持久保持)
  - [ ] PTTL (以毫秒为单位返回 key 的剩余的过期时间)
  - [ ] TTL (以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live))
  - [ ] RANDOMKEY (从当前数据库中随机返回一个 key)
  - [ ] RENAME (修改 key 的名称)
  - [ ] RENAMENX (仅当 newkey 不存在时，将 key 改名为 newkey)
  - [ ] SCAN (迭代数据库中的数据库键)

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
