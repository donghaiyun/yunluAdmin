<template>
  <div class="release-product">
    <div class="card">
      <h1 class="title">发布商品</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <el-steps :active="active" align-center space="20%">
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="规格参数" icon="el-icon-upload"></el-step>
          <el-step title="图片" icon="el-icon-picture"></el-step>
          <el-step title="完成" icon="el-icon-circle-check"></el-step>
        </el-steps>
      </div>
      <div class="card-body">
        <el-form v-if="active===0" :model="goodsForm" :rules="rules"
                 ref="goodsForm" label-position="left"
                 label-width="100px" class="demo-goodsForm">
          <el-form-item label="商品名称" prop="name">
            <el-input style="width: 60%" v-model="goodsForm.name"
                      placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input style="width: 60%" v-model="goodsForm.title"
                      placeholder="请输入商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="categoryId">
            <el-select v-model="goodsForm.categoryId" placeholder="请选择商品分类">
              <el-option label="水果" value="10"></el-option>
              <el-option label="药材" value="20"></el-option>
              <el-option label="特色食品" value="30"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保障" prop="service">
            <el-checkbox-group v-model="goodsForm.service">
              <el-checkbox label="品质保障" name="service"></el-checkbox>
              <el-checkbox label="急速退款" name="service"></el-checkbox>
              <el-checkbox label="24H发货" name="service"></el-checkbox>
              <el-checkbox label="预约送货" name="service"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否现货" prop="isActual">
            <el-radio-group v-model="goodsForm.isActual">
              <el-radio label="现货"></el-radio>
              <el-radio label="暂无现货"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产地" prop="area">
            <el-input style="width: 40%" v-model="goodsForm.area"
                      placeholder="请输入商品生产地区"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="nextForm('goodsForm')">下一步</el-button>
            <el-button type="primary" @click="resetForm('goodsForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--        规格页-->
        <el-form v-else-if="active===1" :model="goodsForm" ref="specForm"
                 class="form-spec">
          <el-form-item
              v-for="(domain, index) in goodsForm.skus"
              prop="skus"
              :key="index"
          >
            <div class="spec">
              <div class="spec-item"><span>规格{{ index + 1 }}</span>
                <el-input label="规格" v-model="domain.spec"></el-input>
              </div>
              <div class="price">
                <div class="spec-item">
                  <span>价格(元)</span>
                  <el-input v-model="domain.price"></el-input>
                </div>
                <div class="spec-item">
                  <span>库存(件)</span>
                  <el-input v-model="domain.stock"></el-input>
                </div>
              </div>
              <el-button type="warning" icon="el-icon-delete"
                         circle
                         @click.prevent="removeDomain(domain)">
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="specBtn">
            <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
            <el-button type="primary" @click="skuNext()">下一步</el-button>
            <el-button type="primary" @click="addDomain">新增规格</el-button>
          </el-form-item>
        </el-form>
        <div class="upload" v-else-if="active===2">
          <div class="card">
            <div class="card-header"><h1>上传主页图片（建议使用较小图片，限一张）：</h1></div>
            <div class="card-body">
              <el-upload
                  ref="smPic"
                  :action="uploadURL"
                  :headers="headerObj"
                  list-type="picture-card"
                  :file-list="showImageCardList('smPic')"
                  :auto-upload="true"
                  :on-remove="handleRemove"
                  :on-exceed="outMaxImage"
                  :on-success="handleSuccessSm"
                  :limit="1">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h1>上传商品顶部轮播图片：</h1></div>
            <div class="card-body">
              <el-upload
                  :action="uploadURL"
                  :headers="headerObj"
                  list-type="picture-card"
                  :file-list="showImageCardList('lgPic')"
                  :auto-upload="true"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessLg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h1>上传详情页描述图片：</h1></div>
            <div class="card-body">
              <el-upload
                  :action="uploadURL"
                  :headers="headerObj"
                  list-type="picture-card"
                  :auto-upload="true"
                  :file-list="showImageCardList('detailsPic')"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessDetails"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
          <div class="button detailBtn">
            <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
            <el-button type="primary" @click="picsNext">下一步</el-button>
          </div>
        </div>
        <div v-else class="overview">
          <div class="card">
            <div class="card-header">
              <h1>概览</h1>
            </div>
            <div class="card-body">
              <ul class="overview-list">
                <li>
                  <p>商品名称</p>
                  <div>{{ goodsForm.name }}</div>
                </li>
                <li>
                  <p>商品标题</p>
                  <div>{{ goodsForm.title }}</div>
                </li>
                <li>
                  <p>商品分类</p>
                  <div>{{ goodsForm.categoryId|categoryId }}</div>
                </li>
                <li>
                  <p>保障</p>
                  <div>
                    <span v-for="(item,index) of goodsForm.service" :key="index">
                      {{ item }}
                    </span>
                  </div>
                </li>
                <li>
                  <p>是否现货</p>
                  <div>{{ goodsForm.isActual }}</div>
                </li>
                <li>
                  <p>产地</p>
                  <div>{{ goodsForm.area }}</div>
                </li>
                <li>
                  <p>规格价格</p>
                  <ul>
                    <li v-for="(item,index) of goodsForm.skus" :key="index">
                      {{ item.spec + '：' }}{{ item.price + '元' }}
                    </li>
                  </ul>
                </li>
                <li>
                  <p>主图片</p>
                  <div>
                    {{ showImageCardList('smPic')[0].oldName }}
                  </div>
                </li>
                <li>
                  <p>轮播图片</p>
                  <ul>
                    <li v-for="(item,index) of showImageCardList('lgPic')" :key="index">
                      {{ item.oldName }}
                    </li>
                  </ul>
                </li>
                <li>
                  <p>详情图片</p>
                  <ul>
                    <li v-for="(item,index) of showImageCardList('detailsPic')" :key="index">
                      {{ item.oldName }}
                    </li>
                  </ul>
                </li>
              </ul>
              <div class="button">
                <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
                <el-button type="primary" @click="submitAll">确认发布</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReleaseProduct",
  data() {
    return {
      active: 0, //步骤页
      fileListL: [],
      disabled: false,
      fileList: [],//图片列表
      goodsForm: { //商品基本信息对象
        name: '',  //商品名称
        title: '',  //商品标题
        categoryId: '', //商品分类
        service: [], //服务
        isActual: '',//是否现货
        area: '', //生产地区
        skus: [{ //商品规格列表
          spec: '',
          price: '',
          stock: ''
        }],
        pics: []
        // pics: { //图片对象
        //   smPic: [],
        //   lgPic: [],
        //   detailsPic: []
        // },
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入商品标题', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
        ],
        categoryId: [
          {required: true, message: '请选择商品分类', trigger: 'change'}
        ],
        service: [
          {type: 'array', required: true, message: '请至少选择一个服务', trigger: 'change'}
        ],
        isActual: [
          {required: true, message: '请选择是否有现货', trigger: 'change'}
        ],
        area: [
          {required: true, message: '请输入商品生产地区', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ]
      },
      uploadURL: this.$global.URL + '/upload/uploadFile',
      imageUrl: this.$global.URL + '/images/',
      //图片上传组件的header请求头
      headerObj: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
      },
    }
  },
  methods: {
    prevForm() {
      this.active--;
    },
    nextForm(formName) {
      /*跳转到下一个form表单*/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++;
        } else {
          return this.$message.error('有未完成项，请检查表单！');
        }
      });
    },
    resetForm(formName) {
      /*重置表单*/
      this.$refs[formName].resetFields();
    },
    removeDomain(item){
      let index = this.goodsForm.skus.indexOf(item)
      if (index !== -1) {
        this.goodsForm.skus.splice(index, 1)
      }
    },
    addDomain() {
      this.goodsForm.skus.push({
        spec: '',
        price: '',
        stock: '',
        key: Date.now()
      })
    },
    skuNext() {
      let skus = this.goodsForm.skus;
      let reg = /^\d+$/;
      if (skus.length === 0) {
        return this.$message.error('规格信息至少有一条！');
      }
      for (let item of skus) {
        if (item.spec === "" || item.price === "") {
          return this.$message.error('规格信息不能留空！');
        } else if (!reg.test(item.price)) {
          return this.$message.error('价格必须是纯数字！');
        }
      }
      this.active++;
    },
    outMaxImage() {
      return this.$message.error('主页图片只能上传一张');
    },

    picsNext() {
      /*上传图片界面下一步验证
      * 检验三种图片至少有一张*/
      let smPicLen = this.showImageCardList('smPic').length;
      let lgPicLen = this.showImageCardList('lgPic').length;
      let detailsPicLen = this.showImageCardList('detailsPic').length;
      if (smPicLen && lgPicLen && detailsPicLen) {
        this.active++;//验证通过，步骤+1
      } else {
        return this.$message.error('三种类别图片请至少上传一张');
      }
    },
    saveImageInfo(response, type) {
      if (response.code === 400) {
        return this.$message.error('上传的文件必须是图片格式！')
      }
      const {saveName, oldName} = response;
      this.goodsForm.pics.push({
        type: type,
        saveName,
        oldName,
        url: this.imageUrl + saveName
      })
    },
    handleSuccessSm(response) {
      /*监听主页图片上传成功的事件*/
      this.saveImageInfo(response, 'smPic');
    },
    handleSuccessLg(response) {
      /*监听顶部轮播图片上传成功的事件*/
      this.saveImageInfo(response, 'lgPic');
    },
    handleSuccessDetails(response) {
      /*监听详情页图片上传成功的事件*/
      this.saveImageInfo(response, 'detailsPic');
    },
    handleRemove(file) {
      /*处理移除主页图片的操作*/
      this.goodsForm.pics = this.goodsForm.pics.filter(item => {
        if (item.saveName !== file.saveName) {
          return item
        }
      })
    },
    showImageCardList(type) {
      /*筛选上传时展示的图片列表*/
      return this.goodsForm.pics.filter(item => {
        if (item.type === type) {
          return item;
        }
      })
    },
    async submitAll() {
      this.$loading.show()
      try {
        await this.$confirm('请确认是否继续操作，该操作会将商品提交到仓库', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.axios.post('/goods/addGoods', this.goodsForm).then(res => {
          if (res.data.code === 200) {
            this.$notify({
              title: 'ok',
              message: '商品已添加至仓库',
              type: 'success'
            });
            this.$router.push('/goods/list');
          }
        })
            .finally(() => {
              this.$loading.close()
            })
      } catch (e) {
        this.$loading.close()
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      }
    },
  },
  filters: {
    categoryId(value) {
      if (!value) return ''
      value = value === '10' ? '水果' : value === '20' ? '药材' : '特色食品';
      return value;
    }
  },
}
</script>

<style lang="scss">
.release-product {
  .card-header {
    height: 6rem;
  }

  .el-steps {
    box-sizing: border-box;
    background-color: #fff;
    height: 4rem;
    max-width: 90rem;

    .el-step {
      width: 10rem;
    }

    .el-step__head {
      height: 2.6rem;
    }
  }

  .card:nth-child(2) {
    margin-top: 1rem;
  }

  .el-form {
    padding-bottom: 4rem;

    .spec {
      display: flex;
      min-width: 45rem;
      flex-direction: column;
      align-items: start;
      height: 15rem;

      span {
        display: inline-block;
        width: 5rem;
        margin-right: 1rem;
      }

      div {
        display: flex;
        align-items: center;

        .el-input {
          width: 10rem;
        }
      }

      .spec-item::before {
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
      }

      .price {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .spec-item.price > div {
        display: flex;
        justify-content: center;
      }

      .el-button {
        margin-left: 1rem;
      }
    }
  }

  .specBtn {
    margin-top: 5rem;
    margin-left: 3rem;
  }

  .detailBtn {
    margin-left: 2rem;
  }

  .upload, .overview {
    .card {
      .card-header {
        background-color: #f2f2f2;
        font-size: 1.6rem;
        height: 4rem;
      }

      .card-body {
      }
    }

    .button {
      margin-top: 2rem;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      background-color: #fbfdff;
      width: 148px;
      height: 148px;
      line-height: 148px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

  .overview {
    .overview-list {
      li {
        display: flex;
        margin: 0.5rem 0;
        line-height: 2rem;

        p {
          width: 8rem;
        }
      }
    }
  }
}
</style>
