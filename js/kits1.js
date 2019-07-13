let kits = {}
//获取本地数据方法
kits.localData = function(key){
    let jsonStr = localStorage.getItem(key);
    let arr = JSON.parse(jsonStr) || [];
    return arr;
}