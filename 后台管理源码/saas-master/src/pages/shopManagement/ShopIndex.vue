<template>
    <div id="gm_shop_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/shop/shop-decorate'>网店装修</router-link>
            <router-link tag="span" to='#1'>运营工具</router-link>
            <router-link tag="span" to='#2'>资产管理</router-link>
            <router-link tag="span" to='#3'>组织架构</router-link>
            <router-link tag="span" to='#4'>操作记录</router-link>
            <router-link tag="span" to='#5'>软件订购</router-link>
          </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'GmShopIndex',
  data() {
    return {
    }
  },
  mounted(){

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>


