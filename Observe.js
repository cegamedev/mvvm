import Bridge from './Bridge.js';

/**
 * 封装Observe，用来拦截对象的get和set方法，发布订阅
 * get方法中放入订阅者 ，set方法中执行订阅者方法
 * 
 */
class Observe {

  constructor(data) {
    this._data = data;
    this.editProperty(this._data);
    return this._data;
  }

  editProperty(obj) {
    // todo 只为对象拦截 get 和 set 方法，递归出口
    if (!obj || !(obj instanceof Object)) {
      return;
    }

    const keys = Object.keys(obj);
    for(let i=0; i<keys.length; i+=1) {
      const _key = keys[i];
      let _val = obj[_key];
      Object.defineProperty(obj,_key,{
        configurable: true,
        get() {
          if(Bridge.target){
            Bridge.addWatcher(Bridge.target);
          }
          return _val;
        },
        set: (val) => {
          if (_val !== val) {
            _val = val;
            this.editProperty(val);
            Bridge.notify();
          }
        }
      });
      this.editProperty(_val);
    }
  }
}

/**
 * 闭包小例子，模拟订阅者队列
 * 当内部函数引用外部资源时，只要内部函数没被释放，它所引用的外部资源就不会被释放
 */
class Wat {
  constructor() {
    this.subNodes = [];
  }
  addSubNodes(node) {
    this.subNodes.push(node);
  }
}

function obv() {
  let wat = new Wat();

  function _get() {
      for(let i=0;i<3;i++) {
          wat.addSubNodes(i);
      }
      return wat;
  }
  
  return _get;
}

const obv_get = obv();
console.log('obv()运行完后，生成了一个wat对象；obv_get()运行完后，往wat对象的队列里插入3个数-》',obv_get());
console.log('再次运行obv_get()，wat对象没被释放，队列在原有基础上又插入3个数-》',obv_get());

export default Observe;