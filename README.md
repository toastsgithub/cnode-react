# 概述
本项目作为学习 react 以及周边生态技术的目的产生，同时也希望能给大家带来一些不一样的社区浏览体验

线上地址：http://cnode.dzmtoast.top

代码写的比较乱，项目也还有很多内容没完成，正在努力迭代 && 重构，欢迎任何形式的讨论，issue，PR

# 涉及主要技术

1. react
2. redux
3. react-router
4. ant design
5. superagent
6. webpack

# API Coverage

- [x] 主题首页
- [x] 主题详情
- [ ] 新建主题
- [ ] 编辑主题
- [x] 收藏主题
- [ ] 取消收藏主题
- [ ] 用户所收藏的主题
- [x] 新建评论
- [ ] 为评论点赞
- [x] 用户详情/个人主页
- [x] 登录
- [ ] 获取未读消息数
- [ ] 获取已读和未读消息
- [ ] 标记全部已读
- [ ] 标记单个消息为已读

# 本地构建



~~~~ bash
# 1. 克隆本项目
git clone git@github.com:toastsgithub/cnode-react.git

# 2. 安装依赖
cd cnode-react && npm install

# 3. 开发运行
npm run dev

~~~~

# 线上构建

~~~~ bash
# 1. 构建
npm run build

# 2. 构建产物位于 /dist 目录下, 打包上传至服务器进行 serve 即可

# 3. 也可直接本地运行，/dist/app.js 是一个简单的请求和资源分发服务器

node app.js

# 或者

pm2 start app.js

~~~~