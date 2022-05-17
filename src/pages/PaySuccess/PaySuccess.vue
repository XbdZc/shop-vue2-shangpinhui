<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/home">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    beforeRouteEnter(to,from,next){
      /*渲染改组件对应路由被confirm 前调用
      * 不能获取组件实例this因为组件实例还未创建
      * */
      if (from.path==='/pay' || from.path==='/'){
        next();
      }else {
        next(false);
      }
    },
    beforeUpdate(to,from,next) {
      /*在当前路由改变, 但是该组件被复用时调用
      * 举例: 带有动态参数的路径: /aaa/:id  在 /aaa/1 和 /aaa/2 跳转时
      * 由于会渲染同一的aaa组件, 因此组件实例会被复用, 这是本钩子被调用
      * 可以访问组件实例,  this
      * */
      console.log('@@@',to,from,next)
    },
    beforeRouteLeave(to,from,next){
      //在当前路由改变,但是该组件被复用时调用
      //举例来说,对于一个带有动态参数的路径/foo/:id,在/foo/1和/foo/2之间跳转的时候,
      //由于会演染同样的Foo组件,因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      //可以访问组件实例'this'
      if (confirm('是否确认离开?')){
        next()
      }
    }
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;
    width: 1148px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;

        img {
          max-width: 100%;
          vertical-align: middle;
          border: 0;
          margin-right: 14px;
        }
      }

      .paydetail {
        margin-left: 66px;
        font-size: 15px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: #e1251b;
              border: 1px solid #e1251b;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>
