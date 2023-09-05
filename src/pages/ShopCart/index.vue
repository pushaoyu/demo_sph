<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input @click="updateChecked(cart, $event)" type="checkbox" name="chk_list" :checked="cart.isChecked">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @change="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartById(cart)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll" @change="updateAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ allIsCheckedNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },

    /**
     * 修改某一个产品的个数
     * type  为了区分这三个元素,
     * disNum形参: +变化量(1)  -变化量(-1)  input最终的个数(并不是变化量)
     * cart:哪一个产品
     * */
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case "add":
          disNum = 1
          break
        case "mins":
          // 判断产品的个数大于1,才可以传递给服务器-1
          // 如果出现产品的分数小于1,传递给服务器个数0
          disNum = cart.skuNum > 1 ? -1 : 1
          break
        case "change":
          // 用户输入进来的最终量,如果非法的(带有汉字|出现负数),带给服务器数字0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 属于正常情况(小数),带给服务器变化的量 用户输入进来的- 产品的起始个数
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      // 派发action
      try {
        await this.$store.dispatch('AddOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {
        console.log(error);
      }
    }, 5),

    // 删除单个商品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('DeleteCart', cart.skuId)
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },

    // 修改某个商品的勾选状态的事件回调
    async updateChecked(cart, event) {
      let checked = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('updateChecked', { skuId: cart.skuId, isChecked: checked })
        this.getData()
      } catch (error) {
        console.log(error.message);
      }

    },

    // 删除选中的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (error) {
        console.log(error.message);
      }

    },

    // 修改全选框的勾选状态
    async updateAllChecked(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateAllChecked', isChecked)
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  computed: {
    ...mapGetters(['cartList']),

    // 商品信息列表
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },

    // 全部商品的总价格
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.cartPrice * item.skuNum
      });
      return sum
    },

    // 是否勾选全选框
    isCheckedAll() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    },

    // 计算已勾选商品的总个数
    allIsCheckedNum() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        if (item.isChecked) {
          sum += item.skuNum
        }
      })
      return sum
    }
  },
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
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

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

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

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
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

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