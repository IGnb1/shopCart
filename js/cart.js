$(() => {
  //获取本地数据
  let jsonStr = localStorage.getItem('shopCartData');
  // console.log(jsonStr)
  //判断，如果本地数据不为null
  //把数据转换为js格式
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    //生成结构
    let html = '';
    // 遍历arr，生成结构
    arr.forEach(e => {
      // console.log(e)
      html += `<div class="item" data-id="${e.pID}">
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
    total();
  }

  //全选和多选
  //设置全选
  $('.pick-all').on('click', function () {
    let status = $(this).prop('checked');
    // console.log(status)
    $('.item-ck').prop('checked', status);
    $('.pick-all').prop('checked', status);
    total();
  })
  //多选
  $('.item-ck').on('click', () => {
    // console.log($('.item-ck:checked').length);
    // if($('.item-ck:checked').length === $('.item-ck').length){
    //     $('.pick-all').prop('checked',true);
    // }else{
    //     $('.pick-all').prop('checked',false);
    // }
    $('.pick-all').prop('checked', $('.item-ck:checked').length === $('.item-ck').length);
    total();
  })

  //计算总价和总数量
  function total() {
    //总价
    let totalPrices = 0;
    //总数量
    let totalQuantity = 0;
    //获取选中的商品进行计算
    $('.item-ck:checked').each((i, e) => {
      let id = parseInt($(e).parents('.item').attr('data-id'));
      // console.log(id);
      arr.forEach(e => {
        if (e.pID === id) {
          totalPrices += e.number * e.price;
          totalQuantity += e.number;
        }
        $('.total-money').text(totalPrices);
        $('.selected').text(totalQuantity);
      })
    })
  }
  function a() {

  }
  //添加商品数量
  $('.item').on('click', '.add', function () {
    //获取点击前的旧数量
    let oldNum = parseInt($(this).siblings('.number').val());
    //点一下就加加一次
    oldNum++;
    //把加完后的新值添加到页面上
    $(this).siblings('.number').val(oldNum);
    // $('.computed').text(oldNum * $('.price').text());
    $('.reduce').removeClass('disabled');
    //获取当前点击的元素的data-id值
    let id = parseInt($(this).parents('.item').attr('data-id'));
    //把和本都数据里的id相等的对象筛选出来
    let obj = arr.find(e => {
      return e.pID === id;
    })
    //给筛选出来的对象赋上新的数值
    obj.number = oldNum;
    // console.log(arr)
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    total();
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
  })
  //减少商品数量
  $('.item').on('click','.reduce', function () {
    //获取点击前的旧数量
    let oldNum = parseInt($(this).siblings('.number').val());
    //判断商品数量最低为1
    if (oldNum === 1) {
      // console.log(this)
      return;
    }
    //点一下就加加一次
    oldNum--;
    if (oldNum === 1) {
      $(this).addClass('disabled');
    }
    //把加完后的新值添加到页面上
    $(this).siblings('.number').val(oldNum);
    // $('.computed').text(oldNum * $('.price').text())
    //获取当前点击的元素的data-id值
    let id = parseInt($(this).parents('.item').attr('data-id'));
    //把和本都数据里的id相等的对象筛选出来
    let obj = arr.find(e => {
      return e.pID === id;
    })
    //给筛选出来的对象赋上新的数值
    obj.number = oldNum;
    // console.log(arr)
    jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    total();
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
  })
  //点击删除
  $('.item').on('click','.item-del',function(){
    let _this = this;
    //弹出确认框
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height:140,
      modal: true,
      buttons: {
        "确认": function() {
          $( this ).dialog( "close" );
          //点击确认后删除该商品
          $(_this).parents('.item').remove();
          //获取该商品的id
          let id = $(_this).parents('.item').attr('data-id');
          //遍历本地数据进行筛选出对应的索引
          let index = arr.findIndex(e=>{
            return e.pID == id;
          })
          // console.log(arr);
          //根据获得的索引从本地数据数组里删除
          arr.splice(index,1);
          //删除后本地数据进行覆盖
          let jsonStr = JSON.stringify(arr);
          localStorage.setItem('shopCartData',jsonStr);
        },
        '取消': function() {
          $( this ).dialog( "close" );
        }
      }
    });
  })
})