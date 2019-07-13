$(() => {
    //获取本地数据
    let jsonStr = localStorage.getItem('shopCartData');
    // console.log(jsonStr)
    //判断，如果本地数据不为null
    //把数据转换为js格式
    if (jsonStr !== null) {
        let arr = JSON.parse(jsonStr);
        //生成结构
        let html = '';
        // 遍历arr，生成结构
        arr.forEach(e => {
            console.log(e)
            html += `<div class="item" data-id="6">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.number * e.price}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`
        });
        $('.item-list').html(html);
        $('.empty-tip').hide();
        $('.cart-header').removeClass('hidden');
        $('.total-of').removeClass('hidden');
    }

    //全选和多选
    //设置全选
    $('.pick-all').on('click',function(){
        let status = $(this).prop('checked');
        // console.log(status)
        $('.item-ck').prop('checked',status);
        $('.pick-all').prop('checked',status);
    })
    //多选
    $('.item-ck').on('click',()=>{
        // console.log($('.item-ck:checked').length);
        // if($('.item-ck:checked').length === $('.item-ck').length){
        //     $('.pick-all').prop('checked',true);
        // }else{
        //     $('.pick-all').prop('checked',false);
        // }
        $('.pick-all').prop('checked',$('.item-ck:checked').length === $('.item-ck').length);
    })

})