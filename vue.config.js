module.exports={
  devServer:{
    //使用代理解决跨域问题
    proxy:{
      '/api':{
        target:'http://localhost:5050',
        // target:'http://81.68.171.156:6060',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}
