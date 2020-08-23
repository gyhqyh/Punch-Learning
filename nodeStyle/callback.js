function fun (callback) {
    setTimeout(function() {
        var data = '回调函数的结果数据';
        // 如何获得异步函数的数据
        callback(data)
    })
}
// 回调函数的作用，获取异步操作的数据
// fun内部封装的了异步操纵
// setTimeOut 模拟了异步操作
fun(function (data) {
    console.log(data)
})