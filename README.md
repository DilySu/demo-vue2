# demo-vue2
vue2 + router + eslint + prettier + typescript
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 测试接口
地址：[https://www.showdoc.com.cn/jinducasey/8321036098744323]
密码：jinduVIP
用户名：符合校验规则即可


### nginx 部署
```nginx
location /{
    root dist目标文件地址
    index index.html
    try_files $url $url/ @router; # 找到指定路径下文件，如果不存在则转给哪个文件执行
}
# vue 项目不是正是存在的，要加上这一段
location @router {
   rewrite ^.*$ /index.html last 
}
```