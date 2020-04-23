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
        name: 'hello',
        content: 'word'
      }
    }
  },
});

console.log(mvvm);