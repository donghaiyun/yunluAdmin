<template>
  <div class="order-list">
    <div class="card">
      <h1 class="title">订单列表</h1>
    </div>
    <div class="card">
      <div class="card-header">
        <ul class="list-title" @click="selectState">
          <li class="title-item"
              :class="{'active':selectedOrderStatus===''}"
              data-id="">全部订单
          </li>
          <li class="title-item"
              :class="{'active':selectedOrderStatus==='0'}"
              data-id="0">代发货订单
          </li>
          <li class="title-item"
              :class="{'active':selectedOrderStatus==='1'}"
              data-id="1">已发货订单
          </li>
          <li class="title-item"
              :class="{'active':selectedOrderStatus==='2'}"
              data-id="2">已完成订单
          </li>
        </ul>
      </div>
      <div class="card-body">
        <el-table
            stripe
            :data="tableData"
            style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="order-table">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品标题">
                  <span>{{ props.row.sub_title }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="收货地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              prop="order_time"
              label="下单时间"
              width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.order_time }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="商品名称"
              prop="name">
          </el-table-column>
          <el-table-column
              label="客户名称"
              prop="customer_name">
          </el-table-column>
          <el-table-column
              label="订单状态"
              prop="customer_name">
            <template slot-scope="scope">
              <el-tag :type="scope.row.order_status==='0'?'danger':(scope.row.order_status==='1'?'warning':'success') ">{{ scope.row.order_time }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      orderStatus:{
        0:'代发货',
        1:'已发货',
        2:'已完成'
      },
      selectedOrderStatus:'',
      tableData: [{
        id: '12987122',
        order_time:'2021-06-02 14:23',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        order_status: '0',
        customer_name: '张三'
      }, {
        id: '12987123',
        order_time:'2021-06-02 14:23',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        sub_title: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        order_status: '1',
        customer_name: '李四'
      }, {
        id: '12987125',
        order_time:'2021-06-02 14:23',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        sub_title: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        order_status: '2',
        customer_name: '王五'
      }, {
        id: '12987126',
        order_time:'2021-06-02 14:23',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        sub_title: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        order_status: '1',
        customer_name: '赵六'
      }]
    }
  },
  methods:{
    selectState(event) {
      if(event.target.nodeName.toLowerCase()==='li'){
        this.selectedOrderStatus=event.target.dataset.id;
      }
    },
  },
}
</script>

<style lang="scss">
.order-list {
  .list-title {
    font-size: 1.6rem;
    width: 50rem;

    .title-item {
      color: #999;
      float: left;
      padding: 0 1rem;
      cursor: pointer;
    }

    .title-item.active {
      color: #009688;
      border-bottom: 2px solid #009688;
    }
  }
  .order-table {
    font-size: 0;
  }
  .order-table label {
    width: 90px;
    color: #99a9bf;
  }
  .order-table .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}

</style>