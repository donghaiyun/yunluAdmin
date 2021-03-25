<template>
  <div class="product-list">
    <router-view></router-view>
    <div class="card">
      <h1 class="title">商品列表</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <ul class="list-title" @click="selectState">
          <li class="title-item"
              :class="{'active':status==='2'}"
              data-id="2">出售中</li>
          <li class="title-item"
              :class="{'active':status==='0'}"
              data-id="0">已售罄</li>
          <li class="title-item"
              :class="{'active':status==='1'}"
              data-id="1">仓库中</li>
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
                  <span class="el-popover-spec">{{item.spec}}：</span>
                  <span class="el-popover-price">
                    ￥{{Number(item.price).toFixed(2)}}
                  </span>
                </p>
                <p class="price" slot="reference" style="width: 6rem">
                  ￥{{Number(scope.row.sku[0].price).toFixed(2)}}
                </p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
              prop="stock"
              label="库存"
              width="120">
          </el-table-column>
          <el-table-column
              prop="totalsale"
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
          <el-button type="warning" plain
                     v-show="status!=='1'"
                     @click="updateStatus(1)">
            下架商品
          </el-button>
          <el-button type="primary" plain v-show="status==='1'"
                     @click="updateStatus(2)">
            上架商品
          </el-button>
          <el-button type="danger" plain v-show="status==='1'">
            删除
          </el-button>
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
      status:'2',
      tableData:[],
      picUrl:'http://localhost:5050/images/',
    }
  },
  methods:{
    selectState(event){
      /*选择展示商品的状态*/
      if(event.target.nodeName.toLowerCase()==='li'){
        this.status=event.target.dataset.id;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    getGoodsList(sid){
      /*获取商品列表数据*/
      (async ()=>{
        const {data:res}=await this.axios.get('/goods/getGoodsList',{
          params:{sid}
        })
        if(res.code===200){
          let results=res.result;
          //处理服务器返回的数据
          results.forEach((item)=>{
            item.smPic=this.picUrl+item.smPic;
            let specs=item.spec.split(',');
            let prices=item.price.split(',');
            let sku=[];
            specs.forEach((item,index)=>{
              sku.push({
                spec:item,
                price:Number(prices[index])
              })
            })
            item.sku=sku;
            item.serialNo=item.id;
            item.createTime=this.moment(item.createTime).format('YYYY-MM-DD');
            delete item.spec;
            delete item.price;
          })
          this.tableData=results;
        }else{
        }
      })()
    },
    updateStatus(toStatus){
      if(this.multipleSelection.length>1){
        return this.$message.error('目前每次只能操作一件商品！');
      }
      let product_id=this.multipleSelection[0].id;

      let loadingInstance=this.$loading({ //loading
        lock: true,
        text: '添加商品中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      });
      (async ()=>{
        const {data:res}=await this.axios.put('/goods/updateStatus',{product_id,toStatus});
        if(res.code===200){
          //查询出修改的商品位置并移出当前商品列表
          let index=this.tableData.findIndex((item)=>{
            return item.product_id=product_id;
          })
          this.tableData.splice(index,1);
          const msg=toStatus===1?'商品已下架至仓库！':'商品已设置为出售状态！';
          this.$notify({
            title: 'ok',
            message:msg,
            type: 'success'
          });
        }
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      })()
    }

  },
  mounted() {
    this.getGoodsList(2);
  },
  watch:{
    status(val){
      this.tableData=[];
      this.getGoodsList(val);
    }
  },
  filters: {
  }
}
</script>

<style lang="scss">
.product-list{
  overflow-y: auto;
  .list-title{
    font-size: 1.6rem;
    width: 30rem;
    .title-item{
      color: #999;
      float: left;
      padding:0 1rem;
      cursor: pointer;
    }
    .title-item.active{
      color: #009688;
      border-bottom: 2px solid #009688;
    }
  }
  .card-body{
    position: relative;
    text-align: left;
    .spec{
      width: 4rem;
      text-align: right;
      color: #009688;
    }
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
.el-popover-spec{
  display: inline-block;
  width: 6.5rem;
  text-align: right;
}
.el-popover-price{
  color: #FF5733;
}

</style>
