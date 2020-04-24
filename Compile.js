
/**
 * 封装Compile，用来替换模板，刷新dom
 * 正则“（）”括起来，可以用RegExp.$1取到匹配的结果
 * 这里替换的是文本类型的节点，节点类型为3，其他类型的节点继续向下找，这个比innerHtml好
 * <div> {{a}} <span></span> </div>
 * 这里div下面有三个节点，分别是：{nodeType:3,textContent:" {{a}} ",...},{nodeType:1,textContent:"",...},{nodeType:3,textContent:" "}
 */
class Compile {
  constructor(rootNode, data) {
    this.$data = data;
    let fragment = document.createDocumentFragment();
    fragment.appendChild(rootNode.firstChild());
    this.replace(fragment);
    rootNode.appendChild(fragment);
  }

  replace(node) {

    Array.from(node.childNodes).forEach((item) => {

      let txt = item.textContent;
      let reg = /\{\{(.*)\}\}/g;

      if (item.nodeType === 3 && reg.test(txt)) {
        let keyArr = RegExp.$1.split('.');
        let targetVal = this._search(this.$data,keyArr);
        item.textContent = txt.replace(reg, targetVal).trim();
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
      return _search(obj[key],arr.slice(1));
    }
  }
}

export default Compile;