<template>
	<div class="xi">
		<header>
			<router-link to="/lian" tag='h3'> <i class="fa fa-angle-left"></i></router-link>
			<p>习题收藏</p>
			<img src="/static/images/search.png"/>
		</header>
		
		<van-dropdown-menu>
			<van-dropdown-item :value="value1" :options="option1" />
		</van-dropdown-menu>
	</div>
</template>

<script>
	export default {
  		name: 'Xi',
  		data(){
  			return{
  				option1: [
			      { text: '译文类型', value: 0 },
			      { text: '单选', value: 1 },
			      { text: '多选', value: 2 },
			      { text: '判断', value: 3 },
			      { text: '连线', value: 4 }
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

</style>