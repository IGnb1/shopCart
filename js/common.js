//公共函数
//设置右上角购物车的商品总数
$(()=>{
    let arr = kits.localData('shopCartData');
    //初始化一个变量。用于叠加商品的总数量
    let total = 0;
    arr.forEach(e => {
        total += e.number;
    });
    //把获得的总数量设置到右上角的购物车数量上
    $('.count').text(total);
})