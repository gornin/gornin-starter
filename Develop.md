# gornin-starter 前端项目脚手架

<pre>
  ▄████  ▒█████   ██▀███   ███▄    █  ██▓ ███▄    █ 
 ██▒ ▀█▒▒██▒  ██▒▓██ ▒ ██▒ ██ ▀█   █ ▓██▒ ██ ▀█   █ 
▒██░▄▄▄░▒██░  ██▒▓██ ░▄█ ▒▓██  ▀█ ██▒▒██▒▓██  ▀█ ██▒
░▓█  ██▓▒██   ██░▒██▀▀█▄  ▓██▒  ▐▌██▒░██░▓██▒  ▐▌██▒
░▒▓███▀▒░ ████▓▒░░██▓ ▒██▒▒██░   ▓██░░██░▒██░   ▓██░
 ░▒   ▒ ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░░ ▒░   ▒ ▒ ░▓  ░ ▒░   ▒ ▒ 
  ░   ░   ░ ▒ ▒░   ░▒ ░ ▒░░ ░░   ░ ▒░ ▒ ░░ ░░   ░ ▒░
░ ░   ░ ░ ░ ░ ▒    ░░   ░    ░   ░ ░  ▒ ░   ░   ░ ░ 
      ░     ░ ░     ░              ░  ░           ░ 
</pre>

> 参考 
> - [仿vue-cli从零搭建一个前端脚手架](https://juejin.cn/post/7125631921375150110)
> - [从0搭建一个自己的前端脚手架](https://juejin.cn/post/6844904038987726856)
> - [从零搭建一个前端cli脚手架并发布到npm](https://juejin.cn/post/7010673349571379231)

## 1. 包名

`gornin-starter`

## 2. package.json

`npm init -y`

## 3. 入口文件

`/bin/main`，无文件后缀

`#! /usr/bin/env node` base脚本需要在第一行指定脚本的解释语言，此处为node

### banner

使用[figlet.js](https://github.com/patorjk/figlet.js)生成，一个用JavaScript编写的FIG驱动程序，旨在完全实现FIGfont规范。

[figlet](http://www.figlet.org/)

或者使用 [cfonts](https://www.npmjs.com/package/cfonts)

```js
#! /usr/bin/env node

// 使用figlet生成banner
const figlet = require("figlet");

let text = figlet.textSync("gornin", {
  font: "Bloody",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 200,
  whitespaceBreak: true,
});
text = `\r\n${chalk.green.bold(text)}\r\n`;
console.log(text);
```

## 4. npm link 全局命令

```json
"bin": {
    "gornin-starter": "bin/main"
},
```

终端中运行 `npm link`, 一切正常的话，就可以在控制台运行 `gornin-starter` 命令

## 5. 脚手架选项 Options

### [commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)

完整的 node.js 命令行解决方案

- usage(): 设置 usage 值
- command(): 定义一个命令名字
- description(): 设置 description 值
- option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
- parse(): 解析命令行参数 argv
- action(): 注册一个 callback 函数
- version() : 终端输出版本号


### [chalk](https://github.com/chalk/chalk)

chalk 是一个可以修改终端输出字符样式的 npm 包

### [Inquirer](https://github.com/SBoudrias/Inquirer.js)

inquirer 是一个和命令行交互的工具插件

- type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
- message：问题的描述；
- default：默认值；
- choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；
- validate：对用户的回答进行校验；
- filter：对用户的回答进行过滤处理，返回处理后的值；
- transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
- when：根据前面问题的回答，判断当前问题是否需要被回答；
- pageSize：修改某些type类型下的渲染行数；
- prefix：修改message默认前缀；
- suffix：修改message默认后缀。

## 6. 调取模版API

`https://api.github.com/users/[github username]/repos`

`https://github.com/gornin` 中的 `gornin`

约定 topics 包含 template 的就是可以拉取的模版，在代码中有体现。

```js
const collectTemplateNameList = list.filter(item => item.topics.includes('template')).map(item => item.name);
```

也就是说，你可以使用这个工具拉取你自己的脚手架或你知道的其它脚手架，只需在命令中添加 `-u xxx`

e.g. `gornin-starter c test -u gornin`

## 7. axios 发起请求

封装axios

## 8. 获取模版列表

### [ora](https://github.com/sindresorhus/ora)

ora是增加命令行loading效果的库

```js
const loading = ora('正在获取模版信息...');
loading.start();
const {data: list} = await api.getRepoList({per_page: 100});
loading.succeed();
```

## 9. 下载对应模版

### [download-git-repo](https://www.npmjs.com/package/download-git-repo)

使用download-git-repo插件来把git上面的项目拉取到本地，由于这个插件不支持promise，所以又需要使用node自带的util工具来支持。

```js
// 下载仓库
async downloadTemplate(choiceTemplateName) {
    this.downloadGitRepo = util.promisify(downloadGitRepo);
    const templateUrl = `gornin/${choiceTemplateName}`;
    const loading = ora('正在拉取模版...');
    loading.start();
    await this.downloadGitRepo(templateUrl, path.join(cwd, this.projectName));
    loading.succeed();
    this.showTemplateHelp();
}
```

## 10. 操作指引

```js
// 模版使用提示
showTemplateHelp() {
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.projectName)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.projectName)}`);
    console.log("  npm install");
    console.log("  npm run dev\r\n");
}
```

## 11. 发布到npm

`npm sign up` or `npm login`

在终端`npm login`

```text
登录报错：npm ERR! code E500 

解决方法：

// 查看源
npm config get registry

// 换成npm源
npm config set registry https://registry.npmjs.org

// 淘宝源
npm config set registry https://registry.npmmirror.com
```