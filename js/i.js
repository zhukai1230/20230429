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
        init() {
            $cubeBox.on('touchstart', down).on('touchmove', move).on('touchend', up);
        }
    }
})();
cubeModel.init();

/* 滑屏区域 */
let swiperModel = (function(){
    let mySwiper = null;
    let $baseInfo=$('.baseInfo');
    $baseInfo.makisu({
        selector: 'dd',
        overlap: 0.2,
        speed: 0.8
    })
    function pageMove() {
        //this:mySwiper 
        // $baseInfo=$('.baseInfo');
      
        let nowActiveIndex = this.activeIndex,
            nowSlide = this.slides[nowActiveIndex];
        
       
        
       
        // console.log(this.activeIndex)
        if(/page1/.test(this.slides[this.activeIndex].classList)){
            $baseInfo.makisu( 'open');
            // console.log('1')
        }else{
            $baseInfo.makisu( 'close');
        }
    }
    return  {
        init(index = 0){
            mySwiper = new Swiper('.swiper', {
                initialSlide: index,
                loop:true,//loop循环模式下，两边会出现一头一尾（与无缝轮播类似） 5,1,2,3,4,5,1
                effect: 'coverflow',
                direction: 'horizontal',
                on:{
                    // init:pageMove,
                    // transitionEnd:pageMove,
                }
            });
        }
    }
})();
swiperModel.init()

