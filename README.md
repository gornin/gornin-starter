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

> 参考 [仿vue-cli从零搭建一个前端脚手架](https://juejin.cn/post/7125631921375150110)

## 1. 包名

## 2. package.json

`npm init -y`

## 3. 入口文件

`/bin/main`

`#! /usr/bin/env` 是base脚本需要在第一行指定脚本的解释语言

```js
#! /usr/bin/env node

const figlet = require("figlet");

console.log(`
    \r\n
    ${chalk.green.bold(
        figlet.textSync("gornin", {
        font: "isometric4",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 200,
        whitespaceBreak: true,
        })
    )}
`);
```

[figlet](https://github.com/patorjk/figlet.js)

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

### [chalk](https://github.com/chalk/chalk)

chalk 是一个可以修改终端输出字符样式的 npm 包

### [Inquirer](https://github.com/SBoudrias/Inquirer.js)

inquirer 是一个和命令行交互的工具插件

## 6. 调取模版API

`https://api.github.com/users/[github username]/repos`

`https://github.com/buingao` 中的 `buingao`

约定 topics 包含 template 的就是可以拉取的模版，在代码中有体现。

```js
const collectTemplateNameList = list.filter(item => item.topics.includes('template')).map(item => item.name);
```

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
    const templateUrl = `buingao/${choiceTemplateName}`;
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
    console.log(`\r\n  cd ${chalk.cyan(this.projectName)}\r\n`);
    console.log("  npm install");
    console.log("  npm run dev\r\n");
}
```