<template>
  <div class="info">
    <div class="card">
      <div class="card-heard">
        <h1 class="title">我的信息</h1>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        设置我的资料
      </div>
      <div class="card-body">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
          <el-form-item label="我的角色" prop="name">
            <el-input v-model="userForm.name" class="input-item" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="username">
            <el-input v-model="userForm.username" class="input-item"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="userForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="userForm.phone" class="input-item" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email" class="input-item"></el-input>
            <span class="msg">设置后可用于登录</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">确认修改</el-button>
            <el-button @click="resetForm('userForm')">重新填写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data(){
    return{
      userForm: {
        name: '超级管理员',
        username: '',
        phone: '',
        email: '',
        gender: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        email: [
          { type: 'email', message: '邮箱不正确', trigger: 'change' }
        ],
      }
    }
  },
  methods:{
    submitForm(infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          let loadingInstance=this.$loading({
            lock: true,
            text: '修改中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          let {username,gender,email}=this.userForm;
          gender=gender==='男'?1:2;
          (async ()=>{
            const {data:res}=await this.axios.post('/user/updateUserinfo',{username,gender,email});
            if(res.code===200){
              this.$store.commit('setUsername',username);//修改vuex中username
              this.$notify({
                title: 'ok',
                message:'个人信息修改成功',
                type: 'success'
              });
            }else{
              this.$message.error('用户信息修改失败，请重试或联系管理员！')
            }
            this.$nextTick(() => { // 以服务的方式调用的 Loading
              loadingInstance.close();
            });
          })()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(infoForm) {
      this.$refs[infoForm].resetFields();
    },
    getUserinfo(){
      (async ()=>{
        const {data}=await this.axios.get('/user/getUserinfo');
        const user=data.user;
        user.gender=Number(user.gender)===1?'男':'女';
        user.phone=user.phone.slice(0,4)+' * * * '+user.phone.slice(7);
        for(let key of Object.keys(user)){
          this.userForm[key]=user[key];
        }
      })()
    }
  },
  mounted() {
    this.getUserinfo();
  }
}
</script>
<style lang="scss">
.info{
  .input-item{
    -webkit-appearance: none;
    width: 80%;
  }
  .msg{
    display: block;
    padding-left: 1rem;
    color: #666666;
  }
}
</style>
