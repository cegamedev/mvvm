/**
 * 封装Observe，用来拦截对象的get和set方法
 * get方法中放入订阅者 ，set方法中执行订阅者方法
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
      const _val = obj[_key];
      Object.defineProperty(obj,_key,{
        configurable: true,
        get() {
          return _val;
        },
        set(val) {
          if (val !== _val) {
            obj[_key] = val;
            this.editProperty(val);
          }
        }
      });
      this.editProperty(_val);
    }
  }
}

export default Observe;