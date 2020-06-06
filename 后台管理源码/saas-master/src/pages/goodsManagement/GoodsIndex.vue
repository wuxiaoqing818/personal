<template>
    <div id="gm_goods_index">
        <div class="appo_submenu">
          <div class="tabs">
            <router-link tag="span" to='/goods/service-list'>服务管理</router-link>
            <router-link tag="span" to='#1'>产品管理</router-link>
            <router-link tag="span" to='#2'>卡项管理</router-link>
            <router-link tag="span" to='#3'>套餐设置</router-link>
          </div>
          <div class="add_appo">
            <button type="primary" @click="toServiceAdd">新增服务<img src="@/assets/add_icon.png"></button>
          </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'GmGoodsIndex',
  data() {
    return {
    }
  },
  mounted(){

  },
  methods: {
    toServiceAdd(){
      this.$router.push('/service-add')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


