<template>
	<div class="cuo">
		<header>
			<router-link to="/lian" tag='h3'> <i class="fa fa-angle-left"></i></router-link>
			<p>错题记录</p>
			<img src="/static/images/search.png"/>
		</header>
		
		<van-dropdown-menu>
			<van-dropdown-item :value="value1" :options="option1" />
			<p class="p1">巩固全部错题</p>
			<p class="p1">移出错题</p>
		</van-dropdown-menu>
	</div>
</template>

<script>
	export default {
  		name: 'Cuo',
  		data(){
  			return{
  				 option1: [
			      { text: '类型不限', value: 0 },
			      { text: '全部', value: 1 },
			      { text: '套卷练习', value: 2 },
			      { text: '考点专连', value: 3 },
			       { text: '仿真模拟', value: 4}
			    ],
			     value1: 0,
  			}
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
.p1{
	margin: 0.4rem;
}

</style>