/**
 * 封装Bridge，用来链接Observe和Watcher
 */
class Bridge {
    static addWatcher(watcher) {
        Bridge.watcherList.push(watcher);
    }
    static notify() {
        Bridge.watcherList.forEach((watcher)=>{
            watcher.update();
        });
    }
}

Bridge.target = null;
Bridge.watcherList = [];

export default Bridge;