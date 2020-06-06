<template>
  <div class="n">
    <header>
      <router-link to="/lian">
        <van-icon name="arrow-left" size="20px" />
      </router-link>

      <p>题库选择</p>
      <p></p>
    </header>
    <nav>
      <input type="text" placeholder="请输入题库名称关键词" />
      <van-icon name="search" size="18px" class="icon" />
    </nav>
    <div class="main">
      <ol>
        <li
          v-for="(item,k) in classData"
          :class="activeIndex == k?'active':''"
          @click="dian(item,k)"
          :key="k"
        >{{item.name}}</li>
      </ol>

      <ul>
        <li v-for="(item,k) in content" v-show="activeIndex == k" :key="k">
          <p class="p1">{{item.name}}</p>
          <p class="p2" v-for="(v,i) in item.bank" :key="i">{{v.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "n",
  data() {
    return {
      classData: [],
      content: [],
      activeIndex: 0
    };
  },
  mounted() {
    this.$axios
      .get("https://test.365msmk.com/api/app/wap/classify?")
      .then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.classData = res.data.data;
        }
      });
  },
  methods: {
    dian(v, i) {
      this.activeIndex = i;
      this.$axios
        .get("https://test.365msmk.com/api/app/wap/quesBank/" + v.id)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.content = res.data.data;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  height: 7.7rem;
  justify-content: space-between;
  ol {
    width: 1.9rem;
    background: #f5f5f5;
    li {
      width: 1.9rem;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: center;
      font-size: 0.3rem;
    }
  }
  ul {
    width: 4.8rem;
    .p1 {
      margin: 0.5rem 0;
    }
    .p2 {
      width: 2.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      background: #eee;
      font-size: 0.14rem;
	  margin-bottom: 0.1rem;
    }
  }
}
.router-link-active {
  color: black;
}
header {
  padding: 0 0.24rem;
  height: 0.92rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 0.4rem;
  }
}
nav {
  width: 100%;
  height: 1.3rem;
  text-align: center;
  border-bottom: 0.01rem solid #ccc;
  input {
    padding-left: 0.26rem;
    width: 6.66rem;
    height: 1rem;
    border: none;
    border-radius: 0.5rem;
    background: #eeeeee;
    font-size: 0.16rem;
  }
  .icon {
    position: absolute;
    right: 0.8rem;
    top: 1.2rem;
  }
}

.active {
  background: white;
}
.content {
  width: 200px;
  height: 200px;
  overflow: hidden;
  background: #ccc;
}

.content > div {
  width: 200px;
  height: 200px;
}
</style>