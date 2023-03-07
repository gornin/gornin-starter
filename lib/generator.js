// const rm = require("rimraf").sync; //以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const Metalsmith = require("metalsmith"); // 插值
const Handlebars = require("handlebars"); // 模版
const fs = require("fs-extra");

module.exports = function (context) {
  let metadata = context.metadata; // 用户自定义信息
  let src = context.downloadTemp; // 暂时存放文件目录
  let dest = "./" + context.projectRoot; //项目的根目录

  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`));
  }

  return new Promise((resolve, reject) => {
    const metalsmith = Metalsmith(process.cwd())
      .metadata(metadata) // 将用户输入信息放入
      .clean(false)
      .source(src)
      .destination(dest);

    metalsmith
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach((fileName) => {
          if (fileName.split(".").pop() != "png") {
            const t = files[fileName].contents.toString();
            files[fileName].contents = new Buffer.from(
              Handlebars.compile(t)(meta),
              "UTF-8"
            );
          }
        });
        done();
      })
      .build((err) => {
        fs.remove(src);
        err ? reject(err) : resolve(context);
      });
  });
};
