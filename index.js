import Mvvm from './Mvvm.js';

/**
 * 使用Mvvm框架
 */
const mvvm = new Mvvm({
  el: document.querySelector('#app'),
  data() {
    return {
      msgName: 'hello',
      msgContent: 'word',
      msgObj: {
        name: 'hello2',
        content: 'word2'
      }
    }
  },
});

const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');

input1.addEventListener('input', e => {
  const newVal = e.target.value;
  mvvm.$data.msgName = newVal;
  mvvm.$data.msgObj.name = newVal;
});

input2.addEventListener('input', e => {
  const newVal = e.target.value;
  mvvm.$data.msgContent = newVal;
  mvvm.$data.msgObj.content = newVal;
});

let node = document.querySelector('.test')
console.log(node.childNodes)