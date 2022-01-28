const config = require('../../vue.config')
const URL = config.devServer.proxy['/api'].target
export default {
  URL
}
