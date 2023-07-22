const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/api", // Your API endpoint prefix
      createProxyMiddleware({
         // target: "https://dull-rose-camel-garb.cyclic.app/",
         target: "http://localhost:8800/api",
         changeOrigin: true,
      })
   );
};
