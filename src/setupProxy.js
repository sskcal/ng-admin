const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://123.206.80.120:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // rewrite path
      },
    })
  );
};