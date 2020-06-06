<template>
  <div id="gm_order_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/order/service-order'>服务订单</router-link>
            <router-link tag="span" to='/order/product-order'>产品订单</router-link>
            <router-link tag="span" to='/order/card-order'>卡项订单</router-link>
          </div>
          <div class="add_appo">
            <button type="primary" @click="toChoosePerson">快速开单<img src="@/assets/add_icon.png"></button>
          </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import '@/assets/css/base.scss'
export default {
  name:'',
  data(){
    return{

    }
  },
  mounted(){

  },
  methods:{
    toChoosePerson(){
      this.$router.push('/choose-person')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


