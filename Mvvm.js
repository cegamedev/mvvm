import Observe from './Observe.js';
/**
 * 封装Mvvm框架
 */
class Mvvm {
  /**
   * 
   * @param {HTMLElement} el 必须是dom元素
   * 
   * @param {Function} data 必须是函数
   *  
   */
  constructor({el,data}) {
    if (!(el instanceof HTMLElement) || !(data instanceof Function)) {
      throw new Error('参数不正确');
    }
    this.$el = el;
    this.$data = new Observe(data());
  }

}

export default Mvvm;