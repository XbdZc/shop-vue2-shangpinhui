<template>
  <el-container>
      <!-- 注册内容 -->
    <el-main>
      <div class="register">
        <h3>注册新用户
          <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
        </h3>
        <el-row type="flex" justify="center" class="row-bg">
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   :inline="false"
                   class="reg-ruleForm">
            <el-form-item label="手机号" prop="phone"  >
              <el-input placeholder="请输入你的手机号"  v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item  label="验证码" prop="code"  :inline="true" >
              <el-row type="flex" justify="left" class="row-bg">
                <el-col :span="60">
                  <el-input  placeholder="请输入验证码"  v-model="ruleForm.code"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button
                      style="margin-left: 30px"
                      type="info"
                      icon="el-icon-message"
                      @click="getCode">验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="登录密码" prop="password"  >
              <el-input placeholder="请输入登录密码"  v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2"  >
              <el-input placeholder="请输入确认密码"  v-model="ruleForm.password2"></el-input>
            </el-form-item>
            <el-form-item prop="isAgree"  >
              <el-checkbox v-model="ruleForm.isAgree" label="同意协议并注册《尚品汇用户协议》" name="type" ></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"
                         @click="submitRegForm('ruleForm')"
                         style="width: 150px;background-color: rgba(255,2,2,0.77)">完成注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>

      </div>

    </el-main>
    <el-footer>
      <!-- 底部 -->
      <div class="copyright">
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>商家入驻</li>
          <li>营销中心</li>
          <li>手机尚品汇</li>
          <li>销售联盟</li>
          <li>尚品汇社区</li>
        </ul>
        <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
        <div class="beian">京ICP备19006430号
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    let validatePhone = (rule, value, callback) => {
      let verify = /^1[34578]\d{9}$/;
      if (!value) {
        callback(new Error('请输入手机号'));
      } else if (!verify.test(value)) {
        callback(new Error('请输入正确格式手机号'));
      }
      callback()
    };
    let validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'));
      } else {
        if (this.ruleForm.code !== this.$store.state.store_user.code) {
          callback(new Error('验证码输入错误'));
        }
        callback()
      }
    };
    let validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password.length < 6) {
          callback(new Error('请输入6位数以上密码'));
        }
        callback()
      }
    };
    let validatePwd2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'));
      } else {
        if (this.ruleForm.password!==this.ruleForm.password2) {
          callback(new Error('两次密码不一致'));
        }
        callback()
      }
    };
    let validateAgree = (rule, value, callback) => {
      if (!value) {
        callback(new Error('-----------请勾选协议'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone:'',//电话号码
        code:'',//验证码
        password:'',//密码
        password2:'',//确认密码
        isAgree:true,//是否同意协议
      },

      rules: {
        phone: [
          { required: true,  validator: validatePhone,trigger:'blur'},
          // { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, validator: validateCode,trigger:'change'},
        ],
        password: [
          { required: true,  validator: validatePwd,trigger:'blur' }
        ],
        password2: [
          { required: true, validator: validatePwd2,trigger:'blur'  }
        ],
        isAgree: [
          { required: true, validator: validateAgree,trigger:'change' }
        ],
      }
    };
  },
  methods: {
    //注册提交
    submitRegForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('!!')
          try {
            const {phone,code,password} =this.ruleForm;
            await this.$store.dispatch('userRegister',{phone,code,password})
            this.$router.push('/login');//注册成功跳转到登录
            return
          }catch (error){
            alert(error.message)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码, 防抖
    getCode:debounce(async function (){
      try {
        //如果获取到手机号再继续往下走
        if (this.ruleForm.phone==='') return alert('请输入手机号')
        await this.$store.dispatch('getCode',this.ruleForm.phone)
        this.ruleForm.code = this.$store.state.store_user.code
      }catch (error){
        alert(error.message)
      }
    },1000),


  }

}
</script>
<style lang="less" scoped>
.register {
  width: 1200px;
  height: 455px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 20px;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }

    }
  }


  .content {
    padding-left: 0px;
    margin-bottom: 18px;
    position: relative;


    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 555px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>
