const nodeExternals = require('webpack-node-externals')
// const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blog-client-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/vuejs-logger.js',
    '~/api/init.js',
    { src: '~/utils/load-resource.js', ssr: false },
    { src: '~/plugins/mavon-editor.js', ssr: false },
    { src: '~/plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/vue-notification.js', ssr: false },
    { src: '~/plugins/aliyun-oss.js', ssr: false }
  ],
  router: {
    middleware: ['auth']
  },
  css: [
    /**
     * 因为Vuetify的 <code>的样式和 markdown的代码样式有冲突，所以直接复制vuetify的样式文件
     * 并修改其中的app.styl文件去掉_code.styl
     */
    '~/assets/vuetify/stylus/app.styl',
    'material-design-icons-iconfont/dist/material-design-icons.css',
    'mavon-editor/dist/css/index.css',
    '~/assets/css/main.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css'
  ],
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: this.dev ? 'http://localhost:8801' : 'https://chengfangyin.cn:8443',
    defaultUserId: 1
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070' },
  loading: {
    color: 'blue',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js', // 打包到库文件以获得更好的缓存
      '~/api/init.js',
      'mavon-editor',
      '~/plugins/aliyun-oss.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
