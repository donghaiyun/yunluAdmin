<template>
  <div class="release-product">
    <div class="card">
      <h1 class="title">发布商品</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <el-steps :active="active" simple space="20%">
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="规格信息" icon="el-icon-upload"></el-step>
          <el-step title="图片" icon="el-icon-picture"></el-step>
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
          <el-form-item>
            <el-button type="primary"
                       @click="nextForm('productForm')">下一步
            </el-button>
            <el-button
                @click="resetForm('productForm')">重置
            </el-button>
          </el-form-item>
        </el-form>

        <el-form v-if="active===1" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px"
                 class="demo-dynamic">
          <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              prop="domains"
          >
            <div class="spec">
              <span>规格{{ index + 1 }}：<el-input label="规格" v-model="domain.spec"></el-input></span>
              <span>价格：<el-input v-model="domain.price"></el-input></span>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="prevForm('dynamicValidateForm')">上一页</el-button>
            <el-button type="primary" @click="nextForm('dynamicValidateForm')">下一页</el-button>
            <el-button @click="addDomain">新增规格</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReleaseProduct",
  data() {
    return {
      active: 1,
      productForm: {
        name: '',
        title: '',
        category: '',
        service: [],
        resource: '',
        isActual: ''
      },
      dynamicValidateForm: {
        domains: [{
          spec: '1斤',
          price: '3元'
        }, {
          spec: '3斤',
          price: '10元'
        }],
        email: '',
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
      }
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        spec: '',
        price: '',
        // key: Date.now()
      }),
          console.log(this.dynamicValidateForm.domains);
    }
  }
}
</script>

<style lang="scss">
.release-product {
  .el-steps {
    box-sizing: border-box;
    background-color: #fff;
    height: 4rem;
    max-width: 70rem;

    .is-icon {
      margin-top: 1.5rem;
    }
  }

  .card:nth-child(2) {
    margin-top: 1rem;
  }

  .el-form {
    padding-bottom: 4rem;

    .spec {
      display: flex;
      width: 60rem;
      justify-content: start;
      align-items: center;
      height: 4rem;

      span {
        display: flex;
        align-items: center;
        margin: 0 1rem;

        .el-input {
          width: 10rem;
        }
      }

      .el-button {
        margin-left: 3rem;
      }

    }
  }
}
</style>
