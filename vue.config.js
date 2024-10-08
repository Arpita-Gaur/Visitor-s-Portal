const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options['compilerOptions'] = {
          ...options.compilerOptions || {},
          isCustomElement: tag => tag === 'BButton',
          //isCustomElement: tag => tag === 'PageDash',
        };
        return options;
      })
  }
})
