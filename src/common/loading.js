import { Loading } from 'element-ui'

export default class MLoading {
    loading

    static show (options = { text: '加载中' }) {
      this.loading && this.loading.close()
      this.loading = Loading.service(options)
    }

    static close () {
      // this.loading && setTimeout(() => {
      this.loading.close()
      //     this.loading = null
      // }, 200)
    }

    static install (Vue, Option) {
      Vue.prototype.$loading = MLoading
    }
}
