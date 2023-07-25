const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/api", // Your API endpoint prefix
      createProxyMiddleware({
         target: "https://calm-puce-lobster-toga.cyclic.app/",
         changeOrigin: true,
      })
   );
};
