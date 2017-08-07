## vue2-mobile-seed

> `vue2 webpack3 mintUi`


## runtime environment

> `nodejs v6.11.0` `npm 3.10.10`


## technology stack

> `vue2` `vue-router` `mint-ui` `sass` `webpack3` `es6` `lodash`


## Build Setup

```
# install dependencies
yarn

# install packages
yarn == yarn install

# add packages
yarn add package-name -D

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## naming rules

```
1. 文件夹命名：aB；
2. 文件命名（js、css、vue、html）：aB.*；
3. 样式class命名：a-b；
4. image命名：a-b；
5. js变量命名：aB；
6. js常量命名：A_B；
7. js私有变量或方法：_aB；
8. js方法的返回值如果是布尔值，方法名则必须以is、can、has、should等为前缀；
9. js service 命名：Ab;
10. js component 命名：Ab;
```


## coding rules

```
1. 在页面中添加img的时候，请尽量使用css background-image，避免webpack无法暂时对html img src支持不友好问题.
2. 项目中使用EditorConfig来定义代码风格,需要安装相关编辑器的插件[查看对应编辑器插件](https://github.com/sindresorhus/editorconfig-sublime#readme)
3.提交代码前eslint自动修复部分`js`文件错误，`vue`文件的js部分错误，`scss`文件错误无法修复
```


## git分支命名规范

1. bug紧急修复：`hotfix/{description}`
2. 版本开发：`feature/{description}_{username}`


## 添加vue devtool

```
安装chrome扩展程序重新启动即可，详见：https://github.com/vuejs/vue-devtools
```
