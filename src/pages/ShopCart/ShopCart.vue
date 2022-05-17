<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">添加日期</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <!--单选框-->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
                   :checked="cart.isChecked===1"
                   @click="checkCart(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ cart.operateTime }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handlerNum('minus',-1,cart,index)">-</a>
            <input autocomplete="off" ref="itxt" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handlerNum('text',$event.target.value,cart,index)">
            <a href="javascript:void(0)" class="plus" @click="handlerNum('add',1,cart,index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a >移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all"  v-show="cartInfoList.length>0">
        <input class="chooseAll" type="checkbox"
               @click="chooseAll($event)"
               :checked="IsChooseAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice  }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
//按需引入lodash
//节流, 第一次点击生效, 最后一次再生效
// import throttle from 'lodash/throttle'
//防抖, 最后一次生效
import debounce from 'lodash/debounce'
export default {
    name: 'ShopCart',
    mounted() {
      this.getShopCartData();
    },
    computed:{
      ...mapState({
        cartList:(state)=>{
          return state.store_shopcart.cartList[0] || [];
        }
      }),
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      totalPrice(){//遍历购物车计算总价
        let sum = 0;
        this.cartInfoList.forEach((cart)=>{
          if (cart.isChecked===1){ //计算勾选上的
            sum +=  cart.skuPrice * cart.skuNum;
          }
        })
        return sum;
      },
      IsChooseAll(){//是否全选
        //every：若数组每一个对象都符合条件，则返回true ，只要有一个不符合条件就返回false
        // every 就当作是 &&  some看作是 ||
        if (this.cartInfoList.length<1){
          return
        }
        return this.cartInfoList.every(item=>{
          return item.isChecked ===1
        })
      }
    },
  methods:{
    getShopCartData(){
      this.$store.dispatch('getCartList')
    },
    checkCart:debounce(async function (cart,event){//单选+防抖
      try {
        let check =  event.target.checked ? 1:0; //通过事件获取单选框是否选中, 选中返回1
        //发请求修改点击状态
        await this.$store.dispatch('updateCartChecked',{skuId:cart.skuId,isChecked:check})
        this.getShopCartData();//发请求更新数据
      }catch (error){
        console.log(error.message)
      }
    },500),
    chooseAll:debounce(async function (event){//全选+防抖
/*      try {
         this.cartInfoList.forEach(async (cart)=>{//遍历所有产品
          let check = event.target.checked?1:0;//通过事件获取单选框是否选中, 选中返回1
           //发请求修改所有产品点击状态
          await this.$store.dispatch('updateCartChecked',{skuId:cart.skuId,isChecked:check})
        })
        setTimeout(()=>{//等待所有产品的状态修改完成
          this.getShopCartData();//发请求更新数据
        },200)
      }catch (error){
        alert(error.message)
      }*/
      try {
        //updateCheckedAllCart
        let result = await this.$store.dispatch('updateCheckedAllCart',event.target.checked)
        console.log(result)
        if (result==='no') return alert('当前购物车无数据')
        this.getShopCartData();
      }catch (error){
        alert(error.message)
      }
    },500),
    //加减购物车数量
    handlerNum:debounce(async function  (type,num,cart,index){//防抖
      switch (type){
        case "minus":
          num = cart.skuNum >=1 ? -1 : 0; //不能小于0
          break;
        case "text":
          num = parseInt(num.replace(/ /g,''));//去除输入空格
            //如果值未改变, 非法数字, 负数都不修改值
          if (num-cart.skuNum===0 || isNaN(num) || num<0 ){
            num = 0
            this.$refs.itxt[index].value = cart.skuNum;//值不对修改为原来的值
            return
          }
          num = num - cart.skuNum;
          break;
      }
      if(num ===0) return;//如果没有修改就返回

      try {
         await this.$store.dispatch('updateShopCart',{
          skuId:cart.skuId,
          skuNum:num
        });
        this.getShopCartData();//重新发起请求
      }catch (error){
        console.log(error.message)
      }
      console.log(type,num,cart.skuNum)
    },500),
    //删除购物车产品
    async deleteCartById(skuId){
      try {
        console.log(skuId)
        await this.$store.dispatch('deleteCartListById',skuId);
        //产出成功重新发请求
        this.getShopCartData();
      }catch (error){
        console.log(error.message)
      }
    },
    //删除所有勾选的产品
    async deleteAllChecked(){
      try {
        let result = await this.$store.dispatch('deleteAllCheckedCart');
        if (result==='no') return alert('当前购物车无数据')
        this.getShopCartData();
      }catch (error){
        alert(error.message)
      }
    }
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
