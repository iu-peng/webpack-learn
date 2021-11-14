module.exports = function (source) {
  const asyncCallback = this.async();
  setTimeout(() => asyncCallback(null, source), 2000);
};
