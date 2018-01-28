var path = require('path');
var RawSource = require("webpack-core/lib/RawSource");

function chunkVersionWebpackPlugin(opts) {
  this.options = Object.assign({
    filename: 'version.json',
    includeDate: true,
  }, opts);
}

chunkVersionWebpackPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var outputPublicPath = compiler.options.output.publicPath;

  compiler.plugin('emit', function(compilation, callback) {
    const chunks = compilation.chunks;
    var version = {};

    chunks.forEach(function(chunk) {
      if (!version[chunk.name]) version[chunk.name] = {};

      var files = chunk.files;
      
      files.forEach(function(fileName) {
        fileName = path.join(outputPublicPath, fileName);

        var fileExtname = path.extname(fileName).slice(1);

        if (!version[chunk.name][fileExtname]) version[chunk.name][fileExtname] = [];

        version[chunk.name][fileExtname].push(fileName);
      });

      if (options.includeDate) {
        version[chunk.name].date = new Date().toISOString();
      }
    });

    compilation.assets[options.filename] = new RawSource(JSON.stringify(version));

    callback();
  });
}

module.exports = chunkVersionWebpackPlugin;