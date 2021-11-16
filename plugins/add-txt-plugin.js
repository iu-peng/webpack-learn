module.exports = class addTxtPlugin {
  apply(compiler) {
    //   此处是异步的tapAsync 同步的是tap，但是参数就没callback了
    compiler.hooks.emit.tapAsync("addTxtPlugin", (compilation, callback) => {
      const str = "webpack 插件生成的";
      compilation.assets["add.txt"] = {
        source: function () {
          return str;
        },
        size: function () {
          return str.length;
        },
      };
      callback(); // 异步执行的 需要callback，否则会卡死在这
    });
  }
};
