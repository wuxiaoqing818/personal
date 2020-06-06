<template>
  <div id="gm_service_add">
    <!-- 顶部header-->
        <div class="full_header">
          <div class="full_header_container">
              <div class="header_left">
                  <p class="header_back cursor" @click="back"><img src="@/assets/full_back.png"><span>返回</span></p>
                  <p class="header_title">新增服务</p>
              </div>
              <div class="header_right">
              </div>
          </div>
        </div>
        <!-- container -->
        <div class="full_container">
             <div class="form_container">
                <el-form :model="serviceForm" class="quick_order_form" :rules="rules" ref="serviceForm">
                  <el-form-item label="服务标题:" :label-width="formLabelWidth" prop="name">
                    <el-input placeholder="请输入服务项目的标题（不超过30字）" v-model="serviceForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品编号:" :label-width="formLabelWidth">
                    <el-input v-model="serviceForm.code" readonly="readonly"></el-input>
                  </el-form-item>
                  <el-form-item label="服务短标题:" :label-width="formLabelWidth" prop="shortName">
                    <el-input placeholder="请输入服务短标题（6-8个中文字符）" v-model="serviceForm.shortName"></el-input>
                  </el-form-item>
                  <el-form-item label="服务关键词:" :label-width="formLabelWidth">
                    <el-input placeholder="请输入3-10个关键词，便于检索" v-model="serviceForm.keyword"></el-input>
                  </el-form-item>
                  <el-form-item label="服务分类:" :label-width="formLabelWidth" prop="category">
                    <div class="service_item">
                      <el-select v-model="serviceForm.firstCategory">
                          <el-option label="类别1" value="s1"></el-option>
                          <el-option label="类别2" value="s2"></el-option>
                      </el-select>
                      <el-select v-model="serviceForm.secondCategory">
                          <el-option label="类别1" value="s1"></el-option>
                          <el-option label="类别2" value="s2"></el-option>
                      </el-select>
                      <span class="dialog_span" @click="categoryManange"><i class="el-icon-edit-outline"></i>分类管理</span>
                    </div>
                  </el-form-item>
                  <!-- 上架门店 -->
                  <el-form-item label="上架门店:" :label-width="formLabelWidth" prop="onShop">
                      <el-radio-group v-model="serviceForm.onShop">
                        <el-radio label="all">全部门店</el-radio>
                        <el-radio label="part">部分门店</el-radio>
                        <el-button v-show="serviceForm.onShop =='part'" style="margin-left:40px;" @click="chooseShop">选择门店</el-button>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="" :label-width="formLabelWidth" v-show="serviceForm.onShop =='part'">
                      <div class="checkShopList">
                        <p v-for="item in serviceForm.shopList"><span>{{item.name}}</span><i class="el-icon-delete"></i></p>
                      </div>
                  </el-form-item>
                  <!-- end -->
                  <!-- 轮播图 -->
                  <el-radio-group v-model="serviceForm.lunPic" class="ser_add_radio">
                    <el-form-item label="轮播图:" :label-width="formLabelWidth" prop="lunPic">
                        <div class="lun_template">
                          <el-radio label="a">选择模版</el-radio>
                          <el-select v-model="serviceForm.lunTemplate" style="margin-left:20px;width:198px;">
                            <el-option label="模版1" value="s1"></el-option>
                            <el-option label="模版2" value="s2"></el-option>
                          </el-select>
                          <span class="dialog_span" @click="setLunPic"><i class="el-icon-edit-outline"></i>设置模版</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <div class="selfPic">
                          <el-radio label="b">自定义</el-radio>
                          <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :file-list="serviceForm.fileList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :limit='5'>
                            <i class="el-icon-plus"></i>
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
                          <p class="pic_tip">支持jpg，png，gif格式，建议像素640*640px，大小不超过1M；最多5张，点击图片可重新上传</p>
                        </div>
                    </el-form-item>
                  </el-radio-group>
                  <!-- end -->
                  <!-- 服务价格 -->
                  <el-form-item label="服务价格:" :label-width="formLabelWidth" prop="price">
                      <div class="priceFrom">
                        <form :model="serviceForm.priceForm">
                          <el-form-item label="规格:" :label-width="formLabelWidthOther">
                              <el-input v-model="serviceForm.priceForm.serviceName"></el-input>
                          </el-form-item>
                          <el-form-item label="服务时长:" :label-width="formLabelWidthOther">
                              <el-select v-model="serviceForm.priceForm.times">
                                <el-option label="30分钟" value="30"></el-option>
                                <el-option label="60分钟" value="60"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="门店价:" :label-width="formLabelWidthOther">
                              <el-input placeholder="请输入门店价" v-model="serviceForm.priceForm.price">
                                <template slot="append">元</template>
                              </el-input>
                          </el-form-item>
                          <el-form-item label="预约金:" :label-width="formLabelWidthOther">
                              <el-input placeholder="" v-model="serviceForm.priceForm.subscription">
                                <template slot="append">元</template>
                              </el-input>
                          </el-form-item>
                          <el-form-item label="会员价:" :label-width="formLabelWidthOther" style="width:100%;">
                             <el-radio-group v-model="serviceForm.priceForm.vipPrice">
                               <el-radio label="a">固定</el-radio>
                               <el-input placeholder="" v-model="serviceForm.priceForm.fixPrice" style="width:265px;margin:0 10px;vertical-align:middle;">
                                <template slot="append">元</template>
                               </el-input>
                               <el-radio label="b">根据会员级别变动</el-radio>
                               <span class="dialog_span" style="font-size:14px;" @click="setVipTemp">
                                  <i class="el-icon-edit-outline"></i>
                                  设置模版
                               </span>
                             </el-radio-group>
                          </el-form-item>
                        </form>
                      </div>
                  </el-form-item>
                  <el-form-item label="" :label-width="formLabelWidth">
                      <el-button>增加规格<i class="el-icon-circle-plus-outline" style="padding-left:10px;"></i></el-button>
                  </el-form-item>
                  <!-- end -->
                  <el-form-item label="排序:" :label-width="formLabelWidth">
                      <el-input placeholder="0-9999" v-model="serviceForm.sortNum"></el-input>
                  </el-form-item>
                  <el-form-item label="虚拟销量:" :label-width="formLabelWidth">
                      <el-input placeholder="仅限填写数字" v-model="serviceForm.virtualNum" type="number"></el-input>
                  </el-form-item>
                  <!-- 服务详情 -->
                  <el-radio-group v-model="serviceForm.serDetail" class="ser_add_radio">
                    <el-form-item  label="服务详情" :label-width="formLabelWidth" prop="detail">
                       <div class="lun_template">
                          <el-radio label="a">选择模版</el-radio>
                          <el-select v-model="serviceForm.detailTemplate" style="margin-left:20px;width:198px;">
                            <el-option label="模版1" value="s1"></el-option>
                            <el-option label="模版2" value="s2"></el-option>
                          </el-select>
                          <span class="dialog_span"><i class="el-icon-edit-outline"></i>设置模版</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-radio label="b">自定义</el-radio>
                    </el-form-item>
                  </el-radio-group>
                  <!-- end -->
                  <!-- 服务保障 -->
                  <el-form-item label="服务保障:" :label-width="formLabelWidth">
                    <div class="lun_template">
                      <el-checkbox-group v-model="serviceForm.type">
                        <el-checkbox label="极速退款" name="type"></el-checkbox>
                        <el-checkbox label="不满意重做" name="type"></el-checkbox>
                        <el-checkbox label="品牌洗发水" name="type"></el-checkbox>
                      </el-checkbox-group>
                      <span class="dialog_span"><i class="el-icon-edit-outline"></i>设置模版</span>
                    </div>
                  </el-form-item>
                  <!-- end -->
                  <!-- 购买须知 -->
                  <el-form-item label="购买须知:" :label-width="formLabelWidth">
                    <el-select v-model="serviceForm.notes">
                      <el-option label="模版1" value="s1"></el-option>
                      <el-option label="模版2" value="s2"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- end -->
                  <!-- 上架时间 -->
                  <el-form-item label="上架时间:" :label-width="formLabelWidth">
                    <el-radio-group v-model="serviceForm.onTime">
                      <el-radio label="a">立即上架</el-radio>
                      <el-radio label="b">指定时间</el-radio>
                    </el-radio-group>
                    <el-date-picker
                      v-model="serviceForm.onTimeValue"
                      type="datetime"
                      placeholder="选择日期时间"
                      style="margin-left:10px;">
                    </el-date-picker>
                  </el-form-item>
                  <!-- end -->
                  <!-- 网店展示 -->
                  <el-form-item label="网店展示:" :label-width="formLabelWidth">
                    <el-radio-group v-model="serviceForm.shopShow">
                      <el-radio label="a">展示</el-radio>
                      <el-radio label="b">隐藏</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- end -->
                  <!-- 预约支付 -->
                  <el-form-item label="预约支付:" :label-width="formLabelWidth">
                    <el-radio-group v-model="serviceForm.payBefore">
                      <el-radio label="a">无需支付</el-radio>
                      <el-radio label="b">需支付</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- end -->
                  <!-- 是否特价 -->
                  <el-form-item label="是否特价:" :label-width="formLabelWidth">
                    <el-checkbox v-model="serviceForm.isDiscount">是</el-checkbox>
                  </el-form-item>
                  <!-- end -->
                  <!-- 是否特价 -->
                  <el-form-item label="首页推荐:" :label-width="formLabelWidth">
                    <el-checkbox v-model="serviceForm.isRecommend">推荐</el-checkbox>
                  </el-form-item>
                  <!-- end -->
                  <!-- 分享文案 -->
                  <el-radio-group v-model="serviceForm.share" class="ser_add_radio">
                    <el-form-item  label="分享文案:" :label-width="formLabelWidth">
                       <div class="lun_template">
                          <el-radio label="a">选择模版</el-radio>
                          <el-select v-model="serviceForm.shareTamplate" style="margin-left:20px;width:198px;">
                            <el-option label="模版1" value="s1"></el-option>
                            <el-option label="模版2" value="s2"></el-option>
                          </el-select>
                          <span class="dialog_span"><i class="el-icon-edit-outline"></i>设置模版</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-radio label="b">自定义</el-radio>
                        <div class="shareSelfTemp">
                          <el-form-item label="标题:" :label-width="formLabelWidthOther" style="margin-bottom:20px;">
                            <el-input v-model="serviceForm.shareTitle"></el-input>
                          </el-form-item>
                          <el-form-item label="引言:" :label-width="formLabelWidthOther">
                            <el-input type='textarea' v-model="serviceForm.shareContent"></el-input>
                          </el-form-item>
                        </div>
                    </el-form-item>
                  </el-radio-group>
                  <!-- end -->
                  <el-form-item :label-width="formLabelWidth" label="">
                    <el-button type="primary" @click="submitForm('serviceForm')">发布</el-button>
                    <el-button>存为模版</el-button>
                    <el-button>放入仓库</el-button>
                    <el-button>取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
        </div>

      <!-- 分类管理  弹窗-->
      <el-dialog
          title="分类管理"
          center
          :visible.sync="dialogVisibleCategory">
          <el-form :model="categoryForm" ref="categoryForm">
              <el-form-item label="一级分类:" placeholder="请选择一级分类" :label-width="formLabelWidth">
                  <el-select v-model="categoryForm.firstCategory">
                      <el-option label="庆春店" value="1"></el-option>
                      <el-option label="宝龙店" value="2"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label=" " :label-width="formLabelWidth" v-show="showNewInput">
                  <el-input v-model="newCategory" placeholder="请输入一级分类名称"></el-input>
                  <el-button type="primary">新增</el-button>
              </el-form-item>
              <el-form-item label=" " :label-width="formLabelWidth">
                  <el-button @click="showNewAdd">新增<i class="el-icon-circle-plus-outline" style="padding-left:10px;"></i></el-button>
              </el-form-item>
              <el-form-item label="二级分类:"  :label-width="formLabelWidth">
                  <el-input v-model="categoryForm.secondCategory" placeholder="请输入二级分类名称"></el-input>
              </el-form-item>
          </el-form>`
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleCategory = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleCategory = false">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 选择门店  弹窗 -->
      <el-dialog
          title="选择门店"
          :visible.sync="dialogVisibleShop">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expand-all='true'
            :props="defaultProps">
          </el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleShop = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleShop = false">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 轮播图模版 弹窗 -->
      <el-dialog
          title="轮播图模版"
          center
          :visible.sync="dialogVisibleLunPic">
            <el-form :modal="lunPicForm">
                <el-form-item label="模版名称:" :label-width="formLabelWidth">
                    <el-select v-model="lunPicForm.category" style="width:48%;">
                        <el-option label="模版1" value="1"></el-option>
                        <el-option label="模版2" value="2"></el-option>
                    </el-select>
                    <el-input placeholder="请输入模版名称" v-model="lunPicForm.name" style="width:48%;"></el-input>
                </el-form-item>
                <el-form-item label='' :label-width="formLabelWidth">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :file-list="lunPicForm.fileList"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit='5'>
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p class="pic_tip">支持jpg，png，gif格式，建议像素640*640px，大小不超过1M；最多5张，点击图片可重新上传</p>
                    <div class="lun_btns">
                      <el-button type="primary" style="margin-right:40px;">确定</el-button>
                      <el-checkbox v-model="lunPicForm.setDefault">设为默认</el-checkbox>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                  <div class="template_list">
                    <el-select v-model="lunPicForm.categoryDefault">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="模版1" value="1"></el-option>
                        <el-option label="模版2" value="2"></el-option>
                    </el-select>
                      <div class="temp_item">
                          <p>
                            <span class="temp_name">模版5:剪发通用类模版1</span>
                            <span>系统推荐</span>
                          </p>
                          <div class="img_list">
                            <img v-for="key in 4" src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100">
                          </div>
                          <div class="temp_btns">
                            <el-button type="primary" style="margin-right:20px;">修改</el-button>
                            <el-checkbox>设为默认</el-checkbox>
                          </div>
                      </div>
                  </div>
                </el-form-item>
            </el-form>
      </el-dialog>
      <!-- 会员价模版 -->
      <el-dialog
          title="会员价模版"
          center
          :visible.sync="dialogVisibleVipPrice">
          <el-form :modal="vipForm">
            <el-form-item label="模版名称:" :label-width="formLabelWidth">
                <el-select v-model="vipForm.category" style="width:48%;">
                    <el-option label="模版1" value="1"></el-option>
                    <el-option label="模版2" value="2"></el-option>
                </el-select>
                <el-input placeholder="请输入模版名称" v-model="vipForm.name" style="width:48%;"></el-input>
            </el-form-item>
            <el-form-item label="会员级别折扣:" :label-width="formLabelWidth">
              <div class="vip_item">
                <el-select v-model="vipForm.vipLevel" style="width:48%;">
                    <el-option label="LV1" value="1"></el-option>
                    <el-option label="LV2" value="2"></el-option>
                </el-select>
                <el-input placeholder="请输入折扣数字" v-model="vipForm.discount" style="width:48%;">
                  <template slot="append">折</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="会员卡折扣:" :label-width="formLabelWidth">
              <div class="vip_item">
                <el-select v-model="vipForm.vipCardLevel" style="width:48%;">
                    <el-option label="LV1" value="1"></el-option>
                    <el-option label="LV2" value="2"></el-option>
                </el-select>
                <el-input placeholder="请输入折扣数字" v-model="vipForm.discountCard" style="width:48%;">
                  <template slot="append">折</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
              <p class="vip_explain">说明：当用户同时具备上述2种身份时，默认采纳更低折扣的身份为准。</p>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" style="margin-right:20px;">确认</el-button>
                <el-checkbox>设为默认</el-checkbox>
                 <el-checkbox>折后价格取整数</el-checkbox>
            </el-form-item>

            <el-form-item label="现有模版：" :label-width="formLabelWidth">
                <div class="template_list">
                  <el-select v-model="vipForm.categoryDefault">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="模版1" value="1"></el-option>
                        <el-option label="模版2" value="2"></el-option>
                  </el-select>
                  <div class="temp_item">
                        <p>
                          <span class="temp_name">模版5:剪发通用类模版1</span>
                        </p>
                        <div class="vip_list">
                          <span>白银会员：9.5折</span>
                          <span>白银会员：9.5折</span>
                          <span>白银会员：9.5折</span>
                          <span>白银会员：9.5折</span>
                          <span>白银会员：9.5折</span>
                          <span>白银会员：9.5折</span>
                        </div>
                        <div class="temp_btns">
                          <el-button type="primary" style="margin-right:20px;">修改</el-button>
                          <el-checkbox>设为默认</el-checkbox>
                        </div>
                    </div>
                  </div>
            </el-form-item>
          </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name:'GmServiceAdd',
  data(){
    return{
      // 分类管理
      dialogVisibleCategory:false,
      categoryForm:{
        firstCategory:'',
        secondCategory:''
      },
      newCategory:'',
      showNewInput:false,
      //选择门店
      dialogVisibleShop:false,
      data: [{
        id: 1,
        label: '杭州',
        children: [{
          id: 4,
          label: '宝龙店',
        }]
      }, {
        id: 2,
        label: '温州',
        children: [{
          id: 5,
          label: '测试店'
        }, {
          id: 6,
          label: '实体店'
        }]
      }, {
        id: 3,
        label: '绍兴',
        children: [{
          id: 7,
          label: '店1'
        }, {
          id: 8,
          label: '店2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 轮播图 设置模版
      dialogVisibleLunPic:false,
      lunPicForm:{
        category:'',
        name:'',
        fileList:[],
        setDefault:'',
        categoryDefault:'',
      },
      // 会员价模版
      dialogVisibleVipPrice:false,
      vipForm:{
        category:'',
        name:'',
        vipLevel:'',
        discount:'',
        vipCardLevel:'',
        discountCard:'',
        categoryDefault:''
      },
      //
      serviceForm:{
        name:'',
        code:'FW34223532523',
        shortName:'',
        keyword:'',
        firstCategory:'',
        secondCategory:'',
        onShop:'all',
        shopList:[
          {id:1,name:'杭州 宝龙店'},
          {id:2,name:'杭州 宝龙店'},
          {id:3,name:'杭州 宝龙店'}
        ],
        lunPic:'a',
        lunTemplate:'',
        fileList: [
          {
            name: 'food.jpeg',
            url: require('@/assets/ser_logo.png')
          }
        ],
        priceForm:{
          serviceName:'',
          times:'',
          price:'',
          subscription:'',
          vipPrice:'a',
          fixPrice:''
        },
        sortNum:'',
        virtualNum:'',
        serDetail:'a',
        detailTemplate:'',
        type:[],
        notes:'',
        onTime:'a',
        onTimeValue:'',
        shopShow:'a',
        payBefore:'a',
        isDiscount:"",
        isRecommend:'',
        share:'a',
        shareTamplate:'',
        shareTitle:'',
        shareContent:''
      },
      formLabelWidth:'120px',
      formLabelWidthOther:'80px',
      dialogImageUrl: '',
      dialogVisible: false,
      rules:{
        name:[
          {required:true, message:'请输入服务项目的标题',trigger:'blur'},
          { type: 'string', max: 30, message: '服务标题不能超过30字', trigger: 'blur' },
        ],
        shortName:[
          {required:true, message:'请输入服务短标题',trigger:'blur'},
          { type: 'string', max: 8, min:6, message: '服务短标题在6-8个中文字符之间', trigger: 'blur' },
        ],
        category:[
          {required:true, message:'请选择服务分类',trigger:'blur'},
        ],
        onShop:[
          {required: true, message: '请选择上架门店', trigger: 'change'}
        ],
        lunPic:[
          {required: true, message: '请选择轮播图', trigger: 'change'}
        ],
        price:[
          // {required: true, message: '请选择轮播图', trigger: 'change'}
        ],
        detail:[
          {required: true, message: '请选择服务详情模版', trigger: 'change'}
        ],
      },
    }
  },
  mounted(){

  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提交表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 分类管理
    categoryManange(){
      this.dialogVisibleCategory = true
    },
    // showNewAdd
    showNewAdd(){
      this.showNewInput = true
    },
    // 选择门店
    chooseShop(){
      this.dialogVisibleShop = true
    },
    // 轮播图模版设置
    setLunPic(){
      this.dialogVisibleLunPic = true
    },
    // 设置会员价模版
    setVipTemp(){
      this.dialogVisibleVipPrice = true
    }
  }
}
</script>

<style lang="scss">
#gm_service_add{
  .el-radio-group.ser_add_radio{
    width:100%;
  }
  .priceFrom {
    .el-form-item{
        margin-bottom: 20px;
        width: 48%;
        display: inline-block;
    }
  }
  .template_list{
    .el-select{
      max-width: 100%;
      .el-input{
        max-width:100%;
      }
      .el-input__inner{
        border:none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
  .full_container{
    padding:40px 0;
    background-color:#fff;
    .checkShopList{
      p{
        color: #9B9B9B;
        display:inline-block;margin-right: 28px;
        i{color:#E84C55;font-size:14px;padding-left:10px;cursor:pointer;}
      }
    }
    .lun_template{
      display:flex;
      align-items: center;
    }
    .dialog_span{
        cursor:pointer;
        margin-left:20px;
        i{font-size:16px;color:#4AA8FF;padding-right:5px;vertical-align: middle;}
    }
    .pic_tip{
      color:#9B9B9B;
      font-size:14px;
    }
  }
  .priceFrom{
    max-width:720px;
    padding: 30px 20px 20px 0;
    border:1px solid rgba(238, 238, 237, 1);
    border-radius:4px;
  }
  .shareSelfTemp{
    border:1px solid #eeeeeb;
    max-width:600px;
    padding:20px 0;
  }
  .template_list{
    max-height:345px;
    overflow: auto;
    border:1px solid rgba(238, 238, 237, 1);
    border-radius:4px;
    // padding:20px;
    max-width:500px;
    .temp_item{
      padding:0 20px 20px 20px;
      color:#3A3A3A;
      font-size:14px;
      p{
        display: flex;
        .temp_name{
          flex:1;
        }
      }
      .img_list{
        margin-top:20px;
        img{
          width:64px;
          height:62px;
          margin-right:5px;
        }
      }
      .vip_list{
        background-color:#FAFAFA;
        span{
          width:140px;
          text-align:center;
          display:inline-block;
        }
        margin-bottom:20px;
      }
    }
  }
  .vip_item+.vip_item{
    margin-top:20px;
  }
  .vip_explain{
    color:#9B9B9B;
    font-size:14px;
  }
</style>


