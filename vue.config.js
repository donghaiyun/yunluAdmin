module.exports={
  devServer:{
    // 使用代理解决跨域问题
    proxy:{
      '/api':{
        // target:'http://localhost:3000',
        target:'http://localhost:5050',
        // target:'https://dhy.cool:50',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}
