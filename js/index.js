/* 魔方模型 */
let cubeModel = (function () {
    let $cubeBox = $('.cubeBox'),
        $cube = $cubeBox.children('.cube');

    //阻止滑动的默认行为
    $cubeBox.on('touchstart touchmove touchend', function (ev) {
        ev.preventDefault()
    })

    //手指按下：记录手指按下的起始的坐标和盒子起始的旋转角度
    function down(ev) {
        //this:.cubeBox
        // console.log(ev)
        let point = ev.changedTouches[0];
        this.startX = point.clientX;
        this.startY = point.clientY;
        if (!this.rotateX) {
            this.rotateX = -30;
            this.rotateY = 45;
        }

        this.isMove = false;
    }
    //手指移动
    function move(ev) {
        let point = ev.changedTouches[0];
        this.changeX = point.clientX;
        this.changeY = point.clientY;
        //判断移动是否在30px以内
        if (Math.abs(this.changeX - this.startX) >= 10 || Math.abs(this.changeY - this.startY) >= 10) {
            this.isMove = true
        }


    }
    //手指抬起
    function up(ev) {
        let point = ev.changedTouches[0];
        //如果没有移动操作就不算移动;
        if (!this.isMove) return;
        // console.log("移动操作")
        // console.log(this.changeX-this.startX,this.changeY-this.startY)
        let deg = this.rotateX % 360
        this.rotateX = this.rotateX - (this.changeY - this.startY) / 2;
        this.rotateY = this.rotateY + (this.changeX - this.startX) / 2;



        $(this).children().eq(0).css(`transform`, `scale(0.6) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`)
        console.log($(this).children().eq(0).css('transform'))
    }

    return {
        init(isInit) {
            $cubeBox.css({
                display: "block"
            })
            if(isInit) return;
            $cubeBox.on('touchstart', down).on('touchmove', move).on('touchend', up);

            /* 魔方每一面的点击事件 */
            $cube.children('li').tap(function () {
                $cubeBox.css({
                    display: "none"
                })
                // console.log($(this).attr('data-index'))
                swiperModel.init($(this).attr('data-index'));
            });
        }
    }
})();



/* 滑屏模型 */
let swiperModel = (function () {

    let mySwiper = null;
    let $baseInfo = $('.baseInfo'),
        $swiperBox = $('.swiperBox'),
        $swiper_wrapper = $('.swiper-wrapper');



    function pageMove() {
        //this:mySwiper 
        let nowActiveIndex = this.activeIndex, //当前的活动页索引
            slides = this.slides,              //类数组
            nowSlide = slides[nowActiveIndex];     //当前的活动页
        $('.back').css({
            display: "block"
        })

        //判断是否为当前页，将当前页的id设为page?，将其他页的id设为null;
        Array.prototype.forEach.call(slides, function (item, index) {
            if (index === nowActiveIndex) {
                item.id = nowSlide.classList[1]
                return
            }
            item.id = null;
        })

    }

    return {
        init(index = 0) {
            $swiperBox.css({
                display: "block"
            })
            mySwiper = new Swiper('.swiper', {
                initialSlide: index,
                loop: true,//loop循环模式下,当前是最后一页，则将第一页提到最后一页
                effect: 'coverflow',
                direction: 'horizontal',
                on: {
                    init: pageMove,
                    transitionStart: function () {
                        $('.back').css({
                            display: "none"
                        })
                    },
                    transitionEnd: pageMove,
                }
            });

            //控制mySwiper切换到指定页数
            // mySwiper.slideTo(index, 1)

            $('.back').tap(function () {
                $swiperBox.css({
                    display: "none"
                })
                cubeModel.init(true);
            })
        }
    }
})();
cubeModel.init();
// swiperModel.init();