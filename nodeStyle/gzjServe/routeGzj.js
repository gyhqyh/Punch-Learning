module.exports = {
    callbacks: {},
    get (url, cb) {
        let getPropertyName = 'get' + url;
        console.log(getPropertyName, 'getPropertyName')
        this.callbacks[getPropertyName] = this.callbacks[getPropertyName] || [];
        this.callbacks[getPropertyName].push(cb)
        console.dir(this.callbacks);
    },
    post (url, cb) {
        let getPropertyName = 'post' + url
        this.callbacks[getPropertyName] = this.callbacks[getPropertyName] || [];
        this.callbacks[getPropertyName].push(cb)
    },
    handler (flag, req, res) {
        console.log(typeof this.callbacks[flag], flag, 'scuess')
        if (this.callbacks[flag]) {
            res.setHeader('Content-Type','application/json;charset=utf-8');
            this.callbacks[flag].forEach(item => {
                (typeof item === 'function') && item(req, res);
            });
        } else {
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            res.end('404 not found')
        }
    }
}