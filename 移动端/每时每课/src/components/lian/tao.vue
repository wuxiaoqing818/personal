<template>
	<div class="tao">
		<header>
			<router-link to="/lian" tag='h3'> <i class="fa fa-angle-left"></i></router-link>
			<p>套卷练习</p>
			<img src="/static/images/search.png"/>
		</header>
		
		<van-dropdown-menu>
			
			
			<van-dropdown-item :value="value1" :options="option1" />
			<van-dropdown-item :value="value2" :options="option2" />
			
		</van-dropdown-menu>
		
	</div>
</template>

<script>
	export default {
  		name: 'Tao',
  		data(){
  			return{
				 option1: [
			      { text: '套卷分类', value: 0 },
			      { text: '中考真题', value: 1 },
			      { text: '全部', value: 2 },
			      { text: '化学', value: 3 },
			      { text: '英文', value: 4 }
			    ],
			    option2: [
			      { text: '套卷状态', value: 'a' },
			      { text: '全部', value: 'b' },
			      { text: '已做', value: 'c' },
			      { text: '未做', value: 'd' }
			    ],
			    value1: 0,
			    value2: 'a'
  			}
  		},
  		methods:{
  			
  			
  		},
  		created(){},
  		
	}
</script>

<style lang="scss" scoped>
header{
	padding: 0 0.24rem;
	height: 0.88rem;
	justify-content: space-between;
	align-items: center;
	display: flex;
	img{
		width: 0.38rem;
		height: 0.38rem;
	}
}
</style>