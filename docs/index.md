欢迎使用redis图形化客户端

# 尝鲜版界面预览
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/1.jpg)
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/2.jpg)
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/3.jpg)
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/4.jpg)
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/5.jpg)
![Image](https://github.com/winterbang/redisbox/blob/master/www/images/v0.0.1/6.jpg)
## 已经实现的功能
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
  - [x] Infomation 关于Redisbox的信息
  - [x] Donate 捐赠
  - [x] ExportConnection 导出连接到Json文件
  - [ ] ImportConnection 导入连接的Json文件
  - [ ] Setting 设置
  - [ ] Feedback 反馈
  - [ ] Share 分享应用
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
For more details see GitHub Flavored Markdown.

Jekyll Themes
Your Pages site will use the layout and styles from the Jekyll theme you have selected in your repository settings. The name of this theme is saved in the Jekyll _config.yml configuration file.

Support or Contact
Having trouble with Pages? Check out our documentation or contact support and we’ll help you sort it out.
