const less = require("less");
module.exports = function (source) {
  less.render(source, (error, output) => {
    return this.callback(error, output.css);
  });
};
