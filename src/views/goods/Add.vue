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
          <el-step title="完成" icon="el-icon-picture"></el-step>
        </el-steps>

      </div>
      <div class="card-body">
        <el-form v-if="active===0" :model="productForm" :rules="rules"
                 ref="productForm" label-position="left"
                 label-width="100px" class="demo-productForm">
          <el-form-item label="商品名称" prop="name">
            <el-input style="width: 40%" v-model="productForm.name"
                      placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input style="width: 80%" v-model="productForm.title"
                      placeholder="请输入商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <el-select v-model="productForm.category" placeholder="请选择商品分类">
              <el-option label="水果" value="fruits"></el-option>
              <el-option label="药材" value="medicine"></el-option>
              <el-option label="特色食品" value="specialty"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保障" prop="service">
            <el-checkbox-group v-model="productForm.service">
              <el-checkbox label="品质保障" name="service"></el-checkbox>
              <el-checkbox label="急速退款" name="service"></el-checkbox>
              <el-checkbox label="24H发货" name="service"></el-checkbox>
              <el-checkbox label="预约送货" name="service"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否现货" prop="isActual">
            <el-radio-group v-model="productForm.isActual">
              <el-radio label="现货"></el-radio>
              <el-radio label="暂无现货"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产地" prop="area">
            <el-input style="width: 60%" v-model="productForm.area"
                      placeholder="请输入商品生产地区"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="nextForm('productForm')">下一步</el-button>
            <el-button type="primary" @click="resetForm('productForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!--        规格页-->
        <el-form v-else-if="active===1" :model="specForm" ref="specForm"
                 class="form-spec">
          <el-form-item
              v-for="(domain, index) in specForm.domains"
              prop="domains"
          >
            <div class="spec">
              <div class="spec-item"><span>规格{{ index + 1 }}</span>
                <el-input label="规格" v-model="domain.spec"></el-input>
              </div>
              <div class="spec-item"><span>价格</span>
                <el-input v-model="domain.price"></el-input>
              </div>
              <el-button type="warning" icon="el-icon-delete"
                         circle
                         @click.prevent="removeDomain(domain)">
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="specBtn">
            <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
            <el-button type="primary" @click="nextForm('specForm')">下一步</el-button>
            <el-button type="primary" @click="addDomain">新增规格</el-button>
          </el-form-item>
        </el-form>
        <div class="upload" v-else-if="active===2">
          <div class="card">
            <div class="card-header"><h1>上传主图片（限一张）：</h1></div>
            <div class="card-body">
              <el-upload
                  class="avatar-uploader"
                  action="#"
                  :on-change="selectImage"
                  :show-file-list="false"
                  :auto-upload="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h1>上传商品顶部轮播图片：</h1></div>
            <div class="card-body">
              <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h1>上传详情页描述图片：</h1></div>
            <div class="card-body">
              <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
          <div class="button detailBtn">
            <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
            <el-button type="primary" @click="submit">下一步</el-button>
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
                  <div>{{ productForm.name }}</div>
                </li>
                <li>
                  <p>商品标题</p>
                  <div>{{ productForm.title }}</div>
                </li>
                <li>
                  <p>商品分类</p>
                  <div>{{ productForm.category }}</div>
                </li>
                <li>
                  <p>保障</p>
                  <div>
                    <span v-for="(item,index) of productForm.service" :key="index">
                      {{ item }}
                    </span>
                  </div>
                </li>
                <li>
                  <p>是否现货</p>
                  <div>{{ productForm.resource }}</div>
                </li>
                <li>
                  <p>产地</p>
                  <div>{{ productForm.area }}</div>
                </li>
                <li>
                  <p>规格价格</p>
                  <div></div>
                </li>
                <li>
                  <p>主图片</p>
                  <div></div>
                </li>
                <li>
                  <p>轮播图片</p>
                  <div></div>
                </li>
                <li>
                  <p>轮播图片</p>
                  <div></div>
                </li>
              </ul>
              <div class="button">
                <el-button type="primary" @click="prevForm('specForm')">上一步</el-button>
                <el-button type="primary" @click="submit">确认发布</el-button>
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
      active: 1, //步骤页
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '', //主图片
      fileList: [],//图片列表
      productForm: { //商品基本信息对象
        name: '',  //商品名称
        title: '',  //商品标题
        category: '', //商品分类
        service: [], //服务
        resource: '', //是否现货
        isActual: '',
        area: '' //生产地区
      },
      specForm: {
        domains: [{
          spec: '1斤',
          price: '3元'
        }, {
          spec: '3斤',
          price: '10元'
        }],
        email: '',
        dateStart: '',
        dateEnd: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        title: [
          {required: true, message: '请输入商品标题', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        category: [
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
      }
    }
  },
  methods: {
    abc(file, fileList) {
      console.log(fileList)
    },
    prevForm() {
      this.active--;
    },
    submit() {
      this.active++;
    },

    nextForm(formName) {
      /*跳转到下一个form表单*/
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++;
        } else {
          return false;
        }
      });
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeDomain(item) {
      let index = this.specForm.domains.indexOf(item)
      if (index !== -1) {
        this.specForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.specForm.domains.push({
        spec: '',
        price: '',
        key: Date.now()
      })
    },
    // verifyImage(file){
    //   const isImage = file.raw.type.split('/')[0] === 'image';
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isImage) {
    //     this.$message.error('上传的文件不是图片!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传的图片大小不能超过 2MB!');
    //   }
    //   return isImage && isLt2M;
    // },
    selectImage(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
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
    max-width: 80rem;

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
      justify-content: start;
      align-items: center;
      height: 4rem;

      div {
        display: flex;
        align-items: center;
        margin: 0 1rem;

        .el-input {
          width: 10rem;
        }
      }

      .spec-item::before {
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
      }

      .el-button {
        margin-left: 1rem;
      }
    }
  }
  .specBtn{
    margin-top: 3rem;
    margin-left: 3rem;
  }
  .detailBtn{
    margin-left: 2rem;
  }

  .upload, .overview {
    .card {
      .card-header {
        background-color: #f2f2f2;
        font-size: 1.6rem;
        h1{

        }
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
