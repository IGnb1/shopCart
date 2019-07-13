$(() => {
    //修改手机详情
    // console.log(location.search)
    let id = location.search.substring(4);
    // console.log(id);
    let obj = phoneData.find(e => {
        return e.pID == id;
    })
    console.log(obj);
    //动态修改手机详情
    $('.sku-name').text(obj.name);
    $('.dd > em').text(obj.price);
    $('.preview-img > img').attr('src', obj.imgSrc);
    $('.big>img').attr('src', obj.imgSrc);

    //获取添加减少按钮
    let add = $('.add');
    let reduce = $('.reduce');
    //添加按钮
    add.on('click', () => {
        //获取当前选择的数量
        // let chooseumber = $('.choose-number').val();
        let old = $('.choose-number').val();
        old++;
        //最低数量是1，如果大于一，把减少按钮打开
        if (old > 1) {
            reduce.removeClass('disabled')
        }
        $('.choose-number').attr('value', old);
    })
    //减少按钮
    reduce.on('click', () => {
        //获取当前选择的数量
        // let chooseumber = $('.choose-number').val();
        let old = $('.choose-number').val();
        if (old == 1) {
            return;
        }
        old--;
        //最低数量是1，如果等于1，把减少按钮关闭
        if (old == 1) {
            reduce.addClass('disabled');
        }
        $('.choose-number').attr('value', old);
    })

    //加入购物车功能
    $('.addshopcar').on('click', function () {
        //先获取本地数据，如果没有数据，返回一个空数组
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;
        //判断，如果jsonStr为null，返回一个空数组
        if (jsonStr == null) {
            arr = []
        } else {
            arr = JSON.parse(jsonStr);
        }

        //获取商品的数量
        let number = parseInt($('.choose-number').val());
        //如果有两个相同的商品，只是增加数量，而不是重新生成一个商品对象
        //jq对象.find()如果没有匹配的对象，返回undefined
        let isExit = arr.find(e => {
            return e.pID == id;
        })
        console.log(isExit)
        //判断，如果有相同id的对象，让他们相加
        if (isExit !== undefined) {
            isExit.number += number;
        } else {
            //创建一个保存商品信息的对象
            let good = {
                imgSrc: obj.imgSrc,
                name: obj.name,
                price: obj.price,
                pID: obj.pID,
                number: number
            }
            //将对象插入数组
            arr.push(good);
        }
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        // location.href = 'cart.html';
    })
})



//放大镜
$(() => {
    //鼠标移入显示
    $('.preview-img').on('mouseover', function () {
        $('.mask').css('display', 'block');
        $('.big').css('display', 'block');
    })
    //鼠标移出隐藏
    $('.preview-img').on('mouseout', function () {
        $('.mask').css('display', 'none');
        $('.big').css('display', 'none');
    })
    //鼠标移动遮盖层跟随
    $('.preview-img').on('mousemove', e => {
        //事件源宽高
        let wid = $('.preview-img').width();
        let hei = $('.preview-img').height();
        //鼠标位置坐标
        let x = e.pageX;
        let y = e.pageY;
        // console.log(x,y);
        //距离body的left，top
        let ofx = $('.product-intro')[0].offsetLeft;
        let oft = $('.product-intro')[0].offsetTop;
        //遮盖层一半宽高
        let maskWidth = $('.mask')[0].clientWidth / 2;
        let maskHeight = $('.mask')[0].clientHeight / 2;
        console.log(maskWidth, maskHeight)
        //遮盖层可移动的距离
        let tx = x - ofx - maskWidth;
        let ty = y - oft - maskHeight;
        //增加边距
        tx = tx < 0 ? 0 : tx;
        ty = ty < 0 ? 0 : ty;
        tx = tx > wid - maskWidth * 2 ? wid - maskWidth * 2 : tx;
        ty = ty > hei - maskHeight * 2 ? hei - maskHeight * 2 : ty;
        //遮盖层的偏移量
        $('.mask')[0].style.left = tx + 'px';
        $('.mask')[0].style.top = ty + 'px';

        //大图的宽高
    })
})