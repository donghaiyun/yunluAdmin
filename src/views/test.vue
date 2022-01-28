<template>
  <div class="todo">
    <div class="header">
      <input type="text" placeholder="请输入代办内容" v-model="text">
        <button @click="add">新增</button>
        <div class="select" :class="{'active':selectTodo}">
          <div @click="selectTodo=!selectTodo">选择</div>
          <ul class="finishList select">
          <li @click="select('已完成')">已完成</li>
          <li @click="select('未完成')">未完成</li>
          <li @click="select('进行中')">进行中</li>
        </ul>
        </div>
    </div>
    <div class="body">
      <ul>
        <li class="title">
          <div>待办事项</div>
          <div>状态</div>
          <div>操作</div>
        </li>
        <li v-for="(item,index) of newTodo" :key="index">
          <div>{{item.name}}</div>
          <div class="todo-item" :class="{'active':isHidden===index}">
            <div>{{item.isFinish}}</div>
            <ul class="finishList">
              <li @click="setIsFinish(index,'已完成')">已完成</li>
              <li @click="setIsFinish(index,'未完成')">未完成</li>
              <li @click="setIsFinish(index,'进行中')">进行中</li>
            </ul>
          </div>
          <div @click="setIsHidden(index)">编辑</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      text: '',
      isFinish: '',
      isHidden: true,
      selectTodo: false,
      todo: [
      ],
      newTodo: []
    }
  },
  methods: {
    select (isFinish) {
      this.isFinish = isFinish
      this.selectTodo = false
    },
    add () {
      this.todo.push({
        name: this.text,
        isFinish: '未完成'
      })
      this.text = ''
      this.newTodo = this.todo
    },
    setIsHidden (index) {
      this.isHidden = index
    },
    setIsFinish (index, isFinish) {
      this.todo[index].isFinish = isFinish
      this.isHidden = -1
    }
  },
  watch: {
    isFinish () {
      this.newTodo = []
      this.todo.forEach((item) => {
        if (item.isFinish === this.isFinish) {
          this.newTodo.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>
.todo{
  width: 600px;
}
.header{
  display: flex;
  align-items: center;
}
.header input{
  width: 300px;
  margin-right: 20px;
}
ul>li{
  display: flex;
  justify-content: space-between;
  height: 20px;

}
ul>li>div{
  width: 200px;
}
.todo-item,.select{
  position: relative;
}
.finishList{
  position: absolute;
  top: 100%;
  background-color: red;
  color: #fff;
  display: none;
  z-index: 9999;
}
.active>.finishList{
  display: block;
}
.finishList.select{
  width: 50px;
}
</style>
