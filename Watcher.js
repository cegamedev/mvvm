import Bridge from './Bridge.js';

/**
 * 封装Watcher，用来订阅对象的修改事件，触发执行编译dom
 */
class Watcher {
  constructor(data,node,reg,txt,callFn) {
    this.$data = data;
    this.$node = node;
    this.$reg = reg;
    this.$txt = txt;
    this.$callFn = callFn;
    this.$newTxt = '';

    // todo 为模板中{{}}片段添加watcher
    this.$txt.replace(this.$reg,(p1,p2)=>{
      let keyArr = p2.split('.');
      return this._search(this.$data,keyArr) || '';
    });
    Bridge.target = null;
  }

  update() {
    this.$newTxt = this.$txt.replace(this.$reg,(p1,p2)=>{
      let keyArr = p2.split('.');
      return this._search(this.$data,keyArr) || '';
    });
    this.$callFn(this.$node,this.$newTxt);
  }

  _search(obj,arr) {
    const key = arr[0];
    if(arr.length <= 1) {
      // todo 只给用到的子属性添加watcher
      Bridge.target = this;
      return obj[key];
    }
    else {
      return this._search(obj[key],arr.slice(1));
    }
  }
}



export default Watcher;