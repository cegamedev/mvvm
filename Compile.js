import Watcher from './Watcher.js';

/**
 * 封装Compile，用来替换模板，刷新dom
 * 正则“（）”括起来，可以用RegExp.$1取到匹配的结果
 * 匹配到多个变量时，replace回调可以分段替换
 * 这里替换的是文本类型的节点，节点类型为3，其他类型的节点继续向下找，这个比innerHtml好
 * <div> {{a}} <span></span> </div>
 * 这里div下面有三个节点，分别是：{nodeType:3,textContent:" {{a}} ",...},{nodeType:1,textContent:"",...},{nodeType:3,textContent:" "}
 */
class Compile {
  constructor(rootNode, data) {
    this.$data = data;
    this.replace(rootNode);
  }

  replace(node) {

    node.childNodes.forEach((item) => {

      let txt = item.textContent;
      let reg = /\{\{(.*?)\}\}/g;

      if (item.nodeType === 3 && reg.test(txt)) {
        item.textContent = txt.replace(reg,(p1,p2)=>{
          let keyArr = p2.split('.');
          let targetVal = this._search(this.$data,keyArr);
          return targetVal;
        });
        new Watcher(this.$data,item,reg,txt,(item,newTxt)=>{
          item.textContent = newTxt;
        });
      }

      if(item.childNodes && item.childNodes.length) {
        this.replace(item);
      }

    });

  }

  _search(obj,arr) {
    const key = arr[0];
    if(arr.length <= 1) {
      return obj[key];
    }
    else {
      return this._search(obj[key],arr.slice(1));
    }
  }
}

export default Compile;