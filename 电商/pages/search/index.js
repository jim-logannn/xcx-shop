import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/search/index.js
Page({
  data: {
    goods: [],
    //取消 按钮 是否显示
    isFocus:false,
    //输入框的值
    inpValue:""
  },
  TimeId: -1,

  //输入框的值改变 就会触发的事件
  handleInput(e) {
    //1、获取输入框的值
    const {
      value
    } = e.detail;
    //2、检测合法性
    if (!value.trim()) {
      this.setData({
        isFocus:false,
        goods:[]
      })
      //值不合法
      return;
    }
    this.setData({
      isFocus:true
    }),
    //3、发送请求获取所驱之建议 数据
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 300);

  },
  //发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    this.setData({
      goods: res
    })
  },
  //点击 取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }

})