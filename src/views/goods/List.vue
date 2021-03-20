<template>
  <div class="product-list">
    <router-view></router-view>
    <div class="card">
      <h1 class="title">商品清单</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <ul class="list-title" @click="selectState">
          <li class="title-item"
              :class="{'active':select==='onSale'}"
              data-name="onSale">出售中</li>
          <li class="title-item"
              :class="{'active':select==='sellOut'}"
              data-name="sellOut">已售罄</li>
          <li class="title-item"
              :class="{'active':select==='inWarehouse'}"
              data-name="inWarehouse">仓库中</li>
        </ul>
      </div>
      <div class="card-body">
        <el-table
            :data="tableData"
            style="width: 1050px"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="40">
          </el-table-column>
          <el-table-column
              label="商品"
              width="180">
            <template slot-scope="scope">
                <img :src="scope.row.smPic" style="width: 6rem;height: 6rem" alt="">
                <p class="name">{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column
              label="价格"
              width="150">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <p v-for="(item,index) of scope.row.sku" :key="index">
                  <span>{{item.spec}}：</span>
                  <span style="color: #FF5733;margin-left: 2rem">￥{{item.price}}</span>
                </p>
                <p class="price" slot="reference" style="width: 6rem">￥ {{scope.row.sku[0].price}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
              prop="stock"
              label="库存"
              width="120">
          </el-table-column>
          <el-table-column
              prop="totalSale"
              label="总销量"
              width="120">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
              width="120"
              sortable>
          </el-table-column>
          <el-table-column
              prop="serialNo"
              label="商品编号"
              width="150">
          </el-table-column>
          <el-table-column
              fixed="right"
              align="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" content="查看商品详细" effect="light" placement="bottom-start">
                <el-button type="primary" plain circle
                           @click="handleClick(scope.row)"
                           icon="el-icon-search">
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" content="编辑商品" effect="light" placement="bottom-end">
                <el-button type="primary"
                           plain circle icon="el-icon-edit">
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="control-btn">
          <el-button type="warning" plain>下架</el-button>
          <el-button type="danger" plain>删除</el-button>
          <el-button type="primary" plain>修改分类</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data(){
    return{
      multipleSelection: [],
      select:'onSale',
      tableData: [{
        name: '蛋糕',
        createTime: '2021-3-18',
        serialNo: '001',
        totalSale: 999,
        stock: 333,
        smPic:require('../../assets/image/product/sm.jpg'),
        lgPic:require('../../assets/image/product/lg.jpg'),
        sku:[
          {spec:'1公斤',price:'30'},
          {spec:'3公斤',price:'100'}
        ]
      },
        {
          name: '蛋糕',
          createTime: '2021-3-18',
          serialNo: '001',
          totalSale: 999,
          stock: 333,
          smPic:require('../../assets/image/product/sm.jpg'),
          lgPic:require('../../assets/image/product/lg.jpg'),
          sku:[
            {spec:'1公斤',price:'30'},
            {spec:'3公斤',price:'100'}
          ]
        },
        {
          name: '蛋糕',
          price: '52.00',
          createTime: '2021-3-18',
          serialNo: '001',
          totalSale: 999,
          stock: 333,
          smPic:require('../../assets/image/product/sm.jpg'),
          lgPic:require('../../assets/image/product/lg.jpg'),
          sku:[
            {spec:'1公斤',price:'50'},
            {spec:'3公斤',price:'150'}
          ]
        },]
    }
  },
  methods:{
    selectState(event){
      /*选择展示商品的状态*/
      if(event.target.nodeName.toLowerCase()==='li'){
        this.select=event.target.dataset.name;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    }
  },
}
</script>

<style lang="scss">
.product-list{
  overflow-y: auto;
  .list-title{
    font-size: 1.6rem;
    width: 30rem;
    .title-item{
      color: #888;
      float: left;
      padding:0 1rem;
      cursor: pointer;
    }
    .title-item.active{
      color: #409EFF;
    }
  }
  .card-body{
    position: relative;
    text-align: left;
    .cell{
      display: flex;
      align-items: center;
      .detail{
        float: right;
        height: 5.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .price{
        color: #FF5733;
      }
      .name{
        margin-left: 2rem;
      }
    }
    .control-btn{
      margin: 2rem 0 0 4rem;
    }
  }
  .card:nth-child(2){
    margin-top: 1rem;
  }
}

</style>
