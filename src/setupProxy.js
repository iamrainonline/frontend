const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/api", // Your API endpoint prefix
      createProxyMiddleware({
         target: REACT_APP_BASE_URL,
         changeOrigin: true,
         target: "https://aware-twill-seal.cyclic.app",
      })
   );
};
