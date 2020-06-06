<template>
	<div class="ce">
		<header>
			<router-link to="/lian" tag='h3'> <i class="fa fa-angle-left"></i></router-link>
			<p>测评纪律</p>
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
  		name: 'Ce',
  		data(){
  			return{
  				 option1: [
			      { text: '类型不限', value: 0 },
			      { text: '全部', value: 1 },
			      { text: '套卷练习', value: 2 },
			      { text: '仿真模考', value: 3 },
			      { text: '专点专练', value: 4 }
			    ],
			    option2: [
			      { text: '时间', value: 'a' },
			      { text: '全部', value: 'b' },
			      { text: '今天', value: 'c' },
			      { text: '7天', value: 'd' }
			    ],
			    value1: 0,
			    value2: 'a'
  			}
  		},
  		methods:{
  			
  			
  		},
  		
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