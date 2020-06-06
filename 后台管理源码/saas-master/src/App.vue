<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){

  }
}
</script>

<style lang="scss">
 html,body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset,button, input, textarea, th, td{
    margin: 0;
    padding: 0;

  }
  ul, li, ol {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  html,body{
    /* width: 100%; */
    /* height: 100%; */
    /* overflow-y:hidden; */
    box-sizing: border-box;
    min-width: 1280px;
    overflow-x: auto;
    font-size: 16px;
    background-color: #F4F5F9;
  }
  image{
    border: none;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #333333 !important;
    background-color: #F4F5F9;
    /* font-size: 0.2rem; */
    width: 100%;
    /* height: 100%; */
    /* margin-top: 60px; */
  }
  .over{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .white{
    background-color: #fff;
  }
  // 主色调
  .main{
    color: #E22C37;
  }
  .main_back{
    background:#E22C37;
    color: #fff;
  }
  button.main_back{
    width: 100%;
    height: 0.44rem;
    line-height: 0;
    border: none;
    outline: none;
    cursor:pointer;
    border-radius: 0.04rem;
    font-weight: 500;
    font-size:0.18rem;
  }



#app .el-dialog{
  max-width: 800px !important;
}


/*pagination样式*/
#app .el-pagination{
  text-align: right;
  margin:40px 20px 40px 0;
  font-size: 14px;
}
#app .el-pager li{
  border:1px solid #EBEBEA;
  margin:0 5px !important;
  width:35px !important;
  height:35px !important;
  line-height: 35px !important;
  font-size: 14px;
  color: #9B9B9B;
  font-weight: 400;
}
#app .el-pager li:hover{
  color: #409EFF !important;
}
#app .el-pager li.active + li{
  border-left:1px solid #EBEBEA !important;
}
#app .el-pager li.active{
  color: #fff !important;
  background: #409EFF;
}
#app .el-pagination .btn-prev, .el-pagination .btn-next{
  border:1px solid #EBEBEA;
  width:87px;
  height:35px;
  line-height: 35px;
  font-size: 14px;
  color: #9B9B9B !important;
  padding:0;
}
#app .el-pagination .btn-next{
  padding-left: 0 !important;
}
#app .el-pagination .btn-prev:hover, .el-pagination .btn-next:hover{
  color: #409EFF !important;
}
#app .el-pagination span:not([class*=suffix]), .el-pagination button{
  vertical-align: middle;
  display: inline-block;
  width: 87px;
  height: 35px;
  line-height:33px;
  font-size: 14px;
}
#app .el-pagination__jump{
  font-size: 14px;
}

/*form表单样式*/
#app .el-form .el-select,.el-input,.el-textarea{
  max-width: 400px;
  width: 100%;
}
#app .el-form .service_item .el-select{
  /* width: 49%;
  max-width:196px; */
  width:49.8%;
  max-width:198px;
}
#app .el-form .service_item+.service_item{
  margin-top: 5px;
}
#app .el-form .service_item>i{
    font-size: 18px;
    color: #E22C37;
    margin-left: 10px;
}

/*radio-button*/
#app .radio_group_common .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border-color: rgba(199, 225, 255, 1);
    box-shadow: none;
    height:32px;
    background:rgba(235,244,255,1);
    border-radius:4px;
    color: #409EFF;
  }
#app .radio_group_common .el-radio-button__inner:hover{
    color: #409EFF
  }
#app .radio_group_common .el-radio-button__inner{
      padding: 8px 13px;
      border:1px solid rgba(235, 235, 234, 1);
      border-radius:4px;
  }
#app  .el-tabs--card > .el-tabs__header .el-tabs__nav{
        border-radius:0;
        border-color: #EBEBEA;
        border-left: none;
        border-top: none;
        color: #333333;
  }

  #app .el-tabs__item.is-active{
    color: #E22C37;
  }
  #app .el-tabs__item:hover{
    color: #E22C37;
  }

.el-tabs__item{
  color: #333333;
  font-weight:400;
}

.margin_main{
  margin-left: 20px;
  margin-right: 40px;
}

.label_area{
  display: block;
  margin-bottom: 10px;
}
.label_area label{
  margin-left: 10px;
}
.margin_label_no{
  margin-left: 0 !important;
}
.label_area_single{
  display: inline-block;
}
.label_area_single{
  display: inline-block;
  margin-bottom: 10px;
  font-size: 14px;
}


.container_normal{
    border:1px solid rgba(235, 235, 234, 1);
    border-radius:0px 0px 6px 6px;
    background-color:#fff;
    margin-top:20px;
}


/*筛选列表*/
.list_condition{
    display: flex;
    flex-direction: row;
}
.list_condition label{
    width: 90px;
    display: inline-block;
    text-align: right;
}
.list_condition  .condition_left{
    flex:1;
}
.list_condition .condition_right .con_phone{
    width:180px;
}

/*全选以及按钮*/
.oper_btns{
  margin-bottom:20px;
}
.oper_btns .all_check{
  margin-left:15px;
  margin-right:20px;
  font-size:14px;
}
.oper_btns .oper_btn{
  height:30px;
  padding: 8px 20px
}

// 顶部radio_group样式
.radio_group_common{
  .el-radio-button {
    margin-right: 10px;
  }
}

.cursor{
  cursor: pointer;
}

/*全屏页面公共布局*/
.full_header{
    width: 100%;
    height:80px;
    background:#fff;
    box-shadow:0px 3px 16px 0px rgba(200,200,200,0.1);
  }
  .full_header .full_header_container{
    max-width: 1440px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    .header_left{
      height: 100%;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      color: #333333;
      padding-left:20px;
      .header_back{
        flex: 1;
        display: flex;
        align-items: center;
        img{width: 18px;height: 14px;margin-right: 6px;}
      }
      .header_title{
        display: flex;
        align-items: center;
        flex: 1;
      }
    }
    .header_right{
      flex: 1;
    }
  }
  .full_container{
    box-shadow:0px 3px 16px 0px rgba(96,96,96,0.06);
    border-radius:6px;
    max-width: 1440px;
    margin: 0 auto;
    // background: #fff;
    margin-top: 20px;
    height: auto;
    margin-bottom:50px;
  }

//顶部切换tab样式
.appo_submenu{
  background-color: #fff;
  width: 100%;
  height: 80px;
  font-size: 16px;
  display:flex;
  flex-direction: row;
  margin-bottom: 20px;
  .tabs{
    flex:1;
    span{
      display: inline-block;
      color: #9B9B9B;
      height: 80px;
      line-height: 80px;
      font-size: 16px;
      margin-left:20px;
      cursor: pointer;
    }
    .router-link-active{
      box-sizing: border-box;
      color: #E22C37;
      border-bottom:2px solid #E22C37;
    }
  }
  .add_appo{
    button{
      width:140px;
      height:40px;
      border:none;
      background:#E22C37;
      color:#fff;
      font-size:16px;
      outline:none;
      border-radius:2px;
      margin:20px 34px 0 0;
      cursor: pointer;
      img{
        width:24px;
        height:24px;
        margin-left:12px;
        vertical-align:middle;
      }
    }
  }
}


// 全屏页面顶部切换tab样式
 .header_right .tabs{
    margin-left:13%;
  }
  .header_right .tabs .el-tabs__nav.is-top{
    height: 80px;
    line-height: 80px;
    font-size:16px;
  }
  .header_right .tabs .el-tabs__content{
    display: none;
  }
  .header_right .tabs .el-tabs__header{
    margin:0;
  }
  .header_right .tabs .el-tabs__nav-wrap::after{
    height:0;
  }
  .header_right .tabs .el-tabs__item{
    font-size:16px;
  }
  .header_right .tabs .el-tabs__active-bar{
    background-color:#E22C37;
  }

  // 收款弹窗样式
  #app .payment_dialog .el-dialog{
    min-width: 895px !important;
    .el-dialog__body{
      padding:0;
    }
    .el-dialog__header{
      padding:0;
    }
  }

  // tabs-router二级页面
  .router_tabs{
      overflow: hidden;
      border-bottom:1px solid #EBEBEA;
      margin-bottom: -1px;
      .tabs_area{
        white-space: nowrap;
        position: relative;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        float: left;
        z-index: 2;
        border-right: 1px solid #e4e7ed;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333333;
      }
    p{
      cursor: pointer;
      padding: 0 20px;
      height: 40px;
      // -webkit-box-sizing: border-box;
      // box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      color: #333333;
      position: relative;
      border-bottom: 1px solid transparent;
      border-left: 1px solid #e4e7ed;
      -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    p:first-child {
        border-left: none;
    }
    p.router-link-active{
      color: #E22C37;
      border-bottom:2px solid #fff;
    }
  }
  .el-tabs__item.router-link-active{
    color: #E22C37;
    border-bottom-color: #fff !important;
  }

  .form-item {
    position: relative;
}
.form-item span{
  display:inline-block;
  position: absolute;
  top:23px;
  right:5px;
  cursor:pointer;
  img{
    width:14px;
    height: 14px;
  }
}
.form-item input {
    display: block;
    width: 100%;
    height: 66px;
    font-size: 16px;
    line-height: 66px;
    color: #333;
    background-color: transparent;
    background-image: none;
    border: none;
    border-bottom: 1px solid #EBEBEB;
    text-indent:15px;
}
.form-item input:focus,
.form-item input:active {
    outline: none;
    box-shadow: none;
}
.form-item input:focus ~ label:before {
    font-size: 12px;
    bottom: 50px;
    color: #9B9B9B;
}
.form-item input:focus ~ label:after {
    background-repeat: no-repeat;
    background-size: 1000% 1000%;
    background-image: radial-gradient(circle, #E22C37 10%, rgba(0, 0, 0, 0) 11%) !important;
}
.form-item input:not(:placeholder-shown) ~ label:before {
    font-size: 12px;
    bottom: 50px;
}
.form-item label:before {
    content: attr(data-label);
    display: block;
    position: absolute;
    color:#9B9B9B;
    left: 15px;
    bottom: 25px;
    transition: all .15s ease-in-out;
}
.form-item label:after {
    content: '';
    position: absolute;
    display: inline-flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transition: all 0.4s ease-in-out;
    background-position: 50%;
    background-size: 200% 200%;
}


// upload 单个文件上传样式
  .avatar-uploader .el-upload {
    border: 1px dashed #EBEBEA;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar{
    width: 148px;
    height: 148px;
    display: block;
  }

  .avatar-back-uploader .el-upload {
    border: 1px dashed #EBEBEA;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-back-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-back-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 296px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar-back{
    width: 296px;
    height: 148px;
    display: block;
  }
</style>
