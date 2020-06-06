<template>
  <div class="bottom">@2018 jimei.com版权所有</div>
</template>
<script>
export default {
}
</script>

<style lang="scss">

        #gm_login_page .el-form,#gm_register .el-form, #gm_retrieve_pass .el-form{
            margin-top: 0.3rem;
            .el-input__inner{
              height: 0.66rem;
              border-top:none;
              border-left: none;
              border-right: none;
              border-radius: 0;
              font-size:0.16rem;
              box-sizing: border-box;
            }
            .el-button{
              width: 100%;
              height: 0.44rem;
              line-height: 0;
              margin-top: 0.3rem;
              font-size:0.18rem;
            }
            .el-form-item{
              margin-bottom:0;
            }
        }
        #gm_login_page .el-form{
          .el-button{
            margin-top: 0.72rem;
          }
        }

        .bottom{
          width:100%;
          font-size:14px;
          color:#9B9B9B;
          text-align:center;
          margin-top:1.46rem;
        }

        .login_area{
          width: 100%;
          height: 6.60rem;
          display: flex;
          .login_div{
            width:3.52rem;
            height:4.24rem;
            background:#fff;
            margin-top:0.62rem;
            padding: 0.4rem 0.4rem 0 0.4rem;
            .login_title{
              font-size: 0.2rem;
            }
            .check_route{
              display:flex;
              flex-direction:row;
              margin-top:0.3rem;
              font-size:0.14rem;
              color:#9B9B9B;
              p{
                flex:1;
              }
              span{
                cursor: pointer;
                color:#E22C37;
              }
            }
          }
        }
</style>


