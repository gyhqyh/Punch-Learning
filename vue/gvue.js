class Gvue {
    constructor (options) {
        this.$options = options;
        this.$data = options.data;
        // 观察
        this.observr(this.$data);
        // 测试代码， 对应的应该是complete解析函数，遇到一个模板语法就 生成一个新watcher实例
        // 当遇到 {{ab}}, 执行如下逻辑
        new watcher(this, 'ab');
        this.test // 访问触发收集依赖逻辑，激活get函数
    }
    // 递归遍历，使传递进来的对象响应化
    observr (obj) {
        if (obj || typeof obj !== 'object') {
            return;
        }
        Object.keys(obj).forEach(key => {
            this.defineReactive(obj, key, obj[key]);
            this.proxyData(key);
        })
    }
    // 响应式处理数据
    defineReactive (obj, key, value) {
        // 创建Dep实例，Dep与key是  一对一
        const dep = new Dep();

        if (typeof value === 'object') {
            this.observr(value);
        }
        Object.defineProperty(obj, key, {
            set (newVal) {
                if (newVal !== val) {
                    value = newVal;
                    dep.notify()
                } 
            },
            get () {
                // 将Dep.target指向的Watcher实例加入到Dep中
                Dep.target && dep.addDep(Dep.target)
                return value;
            }
        })
    }
    proxyData (key) {
        Object.defineProperty(this, key, {
            get () {
                return this.$data[key];
            },
            set (newVal) {
                if (newVal !== this.$data[key]) {
                    this.$data[key] = newVal;
                }
            }
        })
    }
}
// 管理若干watcher实例，与key是一对一的关系
class Dep {
    constructor () {
        this.deps = [];
    }
    addDep (watcher) {
        this.deps.push(watcher)
    }
    notify () {
        this.deps.forEach(dep => {
            dep.update();
        })
    }
}
// 保存ui中的依赖，实现update函数可以更新ui
class watcher {
    // 当前vue的实例，及挂钩的key
    constructor (vm, key) {
        this.vm = vm;
        this.key = key;
        // 将当前实例指向Dep.target
        Dep.target = this;
    }
    update () {
        console.log('dom 更新操作')
    }
}