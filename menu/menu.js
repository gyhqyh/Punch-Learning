let data = {
    '页面1': '/index.html',
    '页面2': '/index2.html',
    '页面3': '/index3.html'
}
window.onload = function () {
    let menuDom = document.createElement('div');
    let path = location.pathname
    menuDom.className = 'menu';
    let result = '<span style="padding=5px; font-size=14px; font-weight=blod;">菜单</span>  <ul>';
    for (let i in data) {
        let className = result
        result += '<li><a href=' + data[i] + (path === i ? ' class="active" ' : '') +'>' + i + '</a></li>'
    }
    result += '</ul>'
    console.log(result);
    menuDom.innerHTML = result;
    this.document.body.appendChild(menuDom)
}