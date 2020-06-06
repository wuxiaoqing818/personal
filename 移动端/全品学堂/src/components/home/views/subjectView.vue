<template>
  <div class="subjectView">
    <div class="nav">
      <dl>
        <dt>版本</dt>
        <dd>
          <span
            v-for="(item,index) in list.版本"
            :key="item.id"
            :class="id1==item.id?'active':''"
            @click="pickB(item)"
          >{{item.name}}</span>
        </dd>
      </dl>
      <dl>
        <dt>类型</dt>
        <dd>
          <span
            v-for="(item,index) in list.类型"
            :key="item.id"
            :class="id2==item.id?'active':''"
            @click="pickL(item.id)"
          >{{item.name}}</span>
        </dd>
      </dl>
    </div>
    <div class="main">
      <ul>
        <li>共找到{{mainList.length}}个课程</li>
        <li>开通会员课程免费领</li>
      </ul>
      <dl v-for="(item,index) in mainList" :key="item.name">
        <dt>
          <img :src="item.img" alt />
        </dt>
        <dd>
          <p>{{item.name}}</p>
          <p>
            <span>{{item.time}}课时</span>
            <span>￥{{item.price}}</span>
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: ["propsName"],
  data() {
    return {
      list: {},
      id1: "",
      id2: "",
      mainList: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    pickB(val) {
      this.id1 = val.id;
      this.mainList = [];
      if (val.name == "全部") {
        this.$axios
          .get("../../../static/data/home/highGradeMaths.json")
          .then(res => {
            this.mainList = res.data.全部;
          });
      }
      if (val.name == "人教新课标A") {
        this.$axios
          .get("../../../static/data/home/highGradeMaths.json")
          .then(res => {
            this.mainList = res.data.人教新课标A;
          });
      }
    },
    pickL(val) {
      this.id2 = val;
    }
  },

  watch: {
    propsName: function(val) {
      //   this.propsName = val;
      console.log(val);
      this.list = {};
      this.mainList = [];
      if (val == "数学") {
        this.$axios
          .get("../../../static/data/home/highGradeMaths.json")
          .then(res => {
            this.list = res.data;
            console.log(res.data);
            this.id1 = 100;
            this.id2 = 106;
            this.$axios
              .get("../../../static/data/home/highGradeMaths.json")
              .then(res => {
                this.mainList = res.data.全部;
              });
          });
      }
    }
  }
};
</script>

<style lang="scss">
.subjectView {
  .nav {
    border-top: 0.01rem solid #eee;
    border-bottom: 0.01rem solid #eee;
    dl {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem;
      font-size: 0.26rem;

      dt {
        width: 10%;
        font-weight: normal;
        padding: 0.04rem 0;
      }
      dd {
        width: 90%;
        white-space: nowrap;
        overflow: scroll;

        span {
          display: inline-block;
          padding: 0.04rem 0.1rem;
          border-radius: 0.2rem;

          margin-right: 0.2rem;
          font-weight: normal;
        }
        .active {
          color: #87cefa;
          background: rgba($color: #87cefa, $alpha: 0.4);
        }
      }
      //去滚动条
      dd::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .main {
    background: #f5f5f5;
    ul {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0 0.2rem 0.2rem;

      li:last-of-type {
        background: pink;
      }
    }

    dl {
      width: 100%;
      padding: 0.2rem;
      margin-bottom: 0.1rem;
      display: flex;
      justify-content: space-between;
      background: white;

      dt {
        img {
          height: 1.9rem;
        }
      }
      dd {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.2rem;

        p {
          display: flex;
          justify-content: space-between;

          span:last-of-type {
            color: red;
          }
        }
      }
    }
  }
}
</style>