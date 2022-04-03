/*按钮组组件
  传入参数:
    itemList数组:id,text
    selectId:选中按钮的id号
    height:每个按钮的高度,默认100rpx
    width:每个按钮的宽度,默认210rpx
  监听事件:
    buttonChange事件:传出所选中按钮的id
  */
<template>
  <view>
    <view class="button-title">
      <view v-for="(item,index) in itemList" :key="item.id" :class="item.id==selectId?'active':''"
        @click="handleGroupItem(index)" :style="{height:height+'rpx',width:width+'rpx'}">
        {{item.text}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ButtonGroup",
    data() {
      return {

      };
    },
    props: {
      itemList: {
        type: Array,
        default: []
      },
      selectId:{
        type:Number,
        default:0,
      },
      height: {
        type: Number,
        default: 100,
      },
      width: {
        type: Number,
        default: 210,
      }
    },
    emits:['buttonChange'],
    methods: {
      handleGroupItem(index) {
        let x = this.itemList[index].id;
        if(x != this.selectId){//如果选中的id发生改变了
          //console.log(x);
          this.$emit('buttonChange',x);//向外发出buttonChange信号,参数是选中按钮的id
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-title {
    display: flex;
    justify-content: space-around;

    view {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
      border-radius: 50rpx;
      /* 阴影:水平偏移，竖直偏移，模糊半径，扩展半径*/
      box-shadow: 5px 5px 8px 2px #8b8b8b;
    }

    .active {
      color: whitesmoke;
      /* background-color:#3A7062; */
      background-color: #52616b;
    }
  }
</style>
