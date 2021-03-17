<template>
  <div class="home">
    <div class="card">
      <h1 class="shop-title">我的店铺</h1>
    </div>
    <el-row class="home-content">
      <el-col :xs=24 :md="16">
        <el-row>
          <el-col :xs="24" :sm="12">
            <div class="card">
              <div class="card-header">
                订单
              </div>
              <el-row class="card-body" :gutter="15">
                <el-col :xs="12" :sm="12">
                  <router-link to="#">
                    <div class="card-body-item">
                      <h3 class="card-item-title">待发货订单</h3>
                      <div class="card-item-content deliver">1</div>
                    </div>
                  </router-link>
                </el-col>
                <el-col :xs="12" :sm="12">
                  <router-link to="#">
                    <div class="card-body-item">
                      <h3 class="card-item-title">昨日订单</h3>
                      <div class="card-item-content yesterday_order">5</div>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="card">
              <div class="card-header">
                交易额
              </div>
              <el-row class="card-body totalMoney" :gutter="15">
                <el-col :xs="12" :sm="12">
                  <router-link to="#">
                    <div class="card-body-item">
                      <h3 class="card-item-title">本月交易额</h3>
                      <div class="card-item-content">￥14000</div>
                    </div>
                  </router-link>
                </el-col>
                <el-col :xs="12" :sm="12">
                  <router-link to="#">
                    <div class="card-body-item">
                      <h3 class="card-item-title">昨日交易额</h3>
                      <div class="card-item-content">￥500</div>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24">
            <div class="card shortcut">
              <div class="card-header">
                快捷方式
              </div>
              <div class="card-body">
                <el-row :gutter="15">
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-sell"></i>
                        </div>
                      </div>
                      <h3 class="card-body-title">发布商品</h3>
                    </router-link>
                  </el-col>
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-setting"></i>
                        </div>
                      </div>
                      <h3 class="card-item-title">管理商品</h3>
                    </router-link>
                  </el-col>
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-edit-outline"></i>
                        </div>
                      </div>
                      <h3 class="card-item-title">发布订单</h3>
                    </router-link>
                  </el-col>
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-tickets"></i>
                        </div>
                      </div>
                      <h3 class="card-item-title">订单列表</h3>
                    </router-link>
                  </el-col>
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-mobile"></i>
                        </div>
                      </div>
                      <h3 class="card-item-title">微信小程序</h3>
                    </router-link>
                  </el-col>
                  <el-col :xs="6" :sm="3">
                    <router-link to="#">
                      <div class="card-body-item">
                        <div class="card-item-content">
                          <i class="el-icon-message"></i>
                        </div>
                      </div>
                      <h3 class="card-item-title">信息</h3>
                    </router-link>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col xs="24" :sm="24">
            <div class="card data">
              <div class="card-header">
                数据概览
              </div>
              <div class="card-body">
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :md="8">
        <div class="card todo">
          <div class="card-header">
            待办事项
          </div>
          <div class="card-body">
            <ul>
              <li v-for="(item,index) of 6" :key="index">{{ index+1 }}. 吃饭睡觉打豆豆</li>
            </ul>
          </div>
        </div>
        <div class="card todo">
          <div class="card-header">
            待办事项
          </div>
          <div class="card-body">
            <ul>
              <li v-for="(item,index) of 6" :key="index">{{ index+1 }}. 吃饭睡觉打豆豆</li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      innerWidth:window.innerWidth,
    }
  },
}
</script>

<style lang="scss">
.home{
  width: 100%;
  height: 100%;
  color: #666;
  overflow-y: auto;
  .shop-title{
    font-size: 2rem;
    font-weight: bolder;
    padding: 1.5rem;
  }
  .home-content{
    .card{
      .card-body-item{
        text-align: left;
        background-color: #f8f8f8f8;
        padding: 1rem 1.5rem;
        .card-item-title{
          white-space: nowrap;
          margin-bottom: 1rem;
        }
        .card-item-content{
          padding: 1rem 0;
          font-size: 3rem;
        }
        .deliver{
          color: #f55e5e;
        }
        .yesterday_order{
          color: #009688;
        }
      }
    }
    .totalMoney .card-item-content{
      color: #f55e5e;
    }
    .data{
      .card-body{
        height: 10rem;
      }
    }
  }
  .shortcut{
    .card-item-content{
      text-align: center;
      padding: 1rem 0;
    }
  }
  .todo{
    ul>li{
      text-align: left;
      height: 2.85rem;
      line-height: 3.8rem;
      padding: 0 1rem;
      border-bottom:1px dashed rgba(0,0,0,.2);
    }
  }

}
</style>
