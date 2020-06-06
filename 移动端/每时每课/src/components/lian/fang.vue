<template>
	<div class="fang">
		<header>
			<router-link to="/lian" tag='h3'>  <i class="fa fa-angle-left"></i> </router-link>
			<p>仿真模考</p>
			<img src="/static/images/search.png"/>
		</header>
		
		<van-dropdown-menu>
			<van-dropdown-item :value="value1" :options="option1" />
			<van-dropdown-item :value="value2" :options="option2" />
			<van-dropdown-item :value="value3" :options="option3" />
		</van-dropdown-menu>
		
	</div>
</template>

<script>
	export default {
  		name: 'Fang',
  		data(){
  			return{
  				 option1: [
			      { text: '套卷分类', value: 0 },
			      { text: '全部', value: 1 },
			      { text: '模拟考试', value: 2 },
			      { text: '正式考试', value: 3 }
			      
			    ],
			    option2: [
			      { text: '套卷状态', value: 'a' },
			      { text: '全部', value: 'b' },
			      { text: '未开始', value: 'c' },
			      { text: '进行中', value: 'd' },
			      { text: '已结束', value: 'f' }
			    ],
			    option3: [
			      { text: '参考状态', value: 'a1' },
			      { text: '全部', value: 'b1' },
			      { text: '已做', value: 'c1' },
			      { text: '未做', value: 'd1' }
			    ],
			    value1: 0,
			    value2: 'a',
			    value3: 'a1'
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