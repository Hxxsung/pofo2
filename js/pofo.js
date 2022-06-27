(($)=>{

  class Pofo {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();
      this.footer();

      this.quick();
      this.goTop();
    }
    header(){
      let t = false; //태블릿,모바일
      let t2 = false; //PC

      //모바일 메뉴 버튼 이벤트
      $('.mobile-btn').on({
        click: function(){
          $(this).toggleClass('on');
          $('#nav').stop().slideToggle(300); //slideToggle - 슬라이드 올라오기/내려오기
        }
      });

      //기본값
      $('.sub').stop().slideUp(0);

      //반응형
      $(window).resize(function(){ //창크기가 변경될 때만 실행
        resizeNav();
      });
          
      //반응형 네비게이션
      function resizeNav(){
        if( $(window).width()<=1024 ){
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().hide();
          t2=false; //데스크탑  토글 초기화
          if(t===false){
            t=true;
            //마우스 오버 이벤트 삭제
            $('.sub-sub').fadeOut(0);
            $('.main-btn').off('mouseenter')
            $('.main-btn').bind({
              click: function(event){
                $(this).next().stop().slideToggle(300);
              }
            });
          }

        }
        else {
          $('.mobile-btn').removeClass('on');
          $('#nav').stop().show();
          t=false; //모바일  토글 초기화
          if(t2===false){
            t2=true;
            //마우스 오버 이벤트 삭제
            $('.main-btn').off('click');
            $('.main-btn').on('mouseenter');
            $('.sub').stop().slideUp(0);
  
            $('.main-btn').on({
              mouseenter: function(){
                $('.sub').fadeOut(0);
                $(this).next().fadeIn(300);
              }
            });
            
            $('#nav').on({
              mouseleave: function(){
                $('.sub').fadeOut(300);
              }
            });
      
            //서브서브메뉴
            $('.sub-btn').on({
              mouseenter: function(){
                $('.sub-sub').fadeOut(0);
                $(this).next().fadeIn(300);
              }
            });
            $('.col24').on({
              mouseleave: function(){
                $('.sub-sub').fadeOut(300);
              }
            });
          }
        }
      }

      resizeNav();//로딩시 실행

          //메인메뉴 마우스 클릭 Mobile(모바일) - 해상도 1024px 이하
          //메인메뉴 마우스 오버 PC(데스크 탑) - 해상도 1024px 초과

      // $(window).resize(); //크기 높이 너비 변화가되면 실행
      // 스크롤 이벤트 : 반드시 스크롤이 발생해야만 실행된다.
      // 패럴럭스
      // $(window).scroll(function(){        
      // });

      //스크롤 이벤트
      let newTop = $(window).scrollTop();
      let oldTop = newTop;
      
      $(window).scroll(()=>{
        newTop = $(window).scrollTop();
        
          //console.log( 'newTop', newTop );
          //console.log( 'oldTop', oldTop );

          if( oldTop-newTop < 0 ){
            $('#header').removeClass('show')
            $('#header').addClass('hide')
          }
          if( oldTop-newTop > 0 ) {
            $('#header').removeClass('hide')
            $('#header').addClass('show')
          }          
          if( newTop===0 ){
            $('#header').removeClass('show')
            $('#header').removeClass('hide')
          }                   

        oldTop = newTop;

      });

    }
    section1(){
      let cnt=0;
      let n = $('#section1 .slide').lenght-3;
      let setId=0;      
      let setId2=0;
      //4. 터치스와이프
      let touchStart = 0;
      let touchEnd = 0;
      let result = null;      
      //5. 드래그앤드롭
      let dragStart = '';
      let dragEnd = '';
      let mouseDown = false;

      //슬라이드 너비 반응형 구하기
      //너비와 높이가 단 1픽셀이라도 변경되면 동작한다
      //크기변경이 없으면 절대 동작하지 않는다
      let winW = $(window).width(); //창너비 초기값
                 $(window).resize(function(){ //반응형 창너비(데스크탑, 태블릿, 노트북, 모바일)
                   winW = $(window).width();
                   //console.log('창너비', winW);
                   mainSlide();
                   return winW;          
                 });

                //1. 메인슬라이드 함수
                function mainSlide(){
                  //console.log( winW );
                  //console.log( -winW*cnt );
                  $('.slide-wrap').stop().animate({left:-winW*cnt}, 600, 'easeInOutExpo', function(){
                      cnt>2?cnt=0:cnt;
                      cnt<0?cnt=2:cnt;
                    $('.slide-wrap').stop().animate({left:-winW*cnt}, 0);
                  });
                }
                //2-1. 다음카운트 함수
                function nextCount(){
                  cnt++;
                  mainSlide();
                }
                //2-2. 이전카운트 함수
                function prevCount(){
                  cnt--;
                  mainSlide();
                }
                //3. 자동타이머 함수
                function autoTimer(){
                setId = setInterval(nextCount,3000);
                }
                autoTimer();

                //타이머 중지함수
                function timerfn(){
                  let tcnt = 0;
                  clearInterval(setId);
                  clearInterval(setId2); //타이머 중복을 막기 위해 꼭 써주기
                  setId2 = setInterval(function(){
                    tcnt++;
                    //console.log(tcnt);
                    if(tcnt>=10){
                      clearInterval(setId2); //10초 후 카운트 이제 멈춤 그리고 자동타이머실행
                      nextCount(); //즉각실행
                      autoTimer(); //자동타이머 호출 실행 3초 후 실행
                    }
                  }, 1000);
                };

                //4. 터치스와이프
                $('.slide-container').on({
                  mousedown: function(event){ //touchstart
                    timerfn();
                    //중지 후 5초가 지나도 아무 터치가 없으면 다시 자동타이머 호출실행
                    //setId = setInterval(autoTimer, 5000); -> 내가한거

                    touchStart = event.clientX;
                    //console.log('터치 시작 e.clientX', e.clientX)
                    dragStart = event.clientX-$('.slide-wrap').offset().left-winW;
                    //console.log( e.clientX-$('.slide-wrap').offset().left-winW );
                    mouseDown = true;
                  },
                  mouseup: function(event){ //touchend
                    touchEnd = event.clientX;
                    //console.log('터치 끝 e.clientX', e.clientX)
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    
                    if( result==='NEXT' ){   
                      if(!$('.slide-wrap').is(':animated')){
                        nextCount();
                      }
                    }
                    if( result==='PREV' ){
                      if(!$('.slide-wrap').is(':animated')){
                        prevCount();
                      }
                    }

                    mouseDown = false;
                  },
                  mouseleave: function(event){
                    if(!mouseDown)return;
                    touchEnd = event.clientX;
                    
                    if( touchStart - touchEnd > 0 ){
                      if(!$('.slide-wrap').is(':animated')){
                        nextCount();
                      }
                    }
                    if( touchStart - touchEnd < 0 ){
                      if(!$('.slide-wrap').is(':animated')){
                        prevCount();
                      }
                    }
                    mouseDown = false;
                  },
                  mousemove: function(event){
                    if(!mouseDown)return;
                    dragEnd = event.clientX;
                    $('.slide-wrap').css({left : dragEnd - dragStart });
                  }
                            
                });

                //모바일 전용 핑거(손가락) 터치 이벤트
                $('.slide-container').on({
                  touchstart: function(event){ //mousedown
                    timerfn();                    
                    touchStart = event.originalEvent.changedTouches[0].clientX;   // .originalEvent.touches[0]   순수자바스크립트              
                    dragStart = event.originalEvent.changedTouches[0].clientX-$('.slide-wrap').offset().left-winW;                    
                    mouseDown = true;
                  },
                  touchend: function(event){ //mouseup
                    touchEnd = event.originalEvent.changedTouches[0].clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';                    
                    if( result==='NEXT' ){   
                      if(!$('.slide-wrap').is(':animated')){
                        nextCount();
                      }
                    }
                    if( result==='PREV' ){
                      if(!$('.slide-wrap').is(':animated')){
                        prevCount();
                      }
                    }
                    mouseDown = false;
                  },
                  touchmove: function(event){ //mousemove
                    if(!mouseDown)return;
                    dragEnd = event.originalEvent.changedTouches[0].clientX;
                    $('.slide-wrap').css({left : dragEnd - dragStart });
                  }
                });
    }
    section2(){
      //스크롤 이벤트
      //섹션2번이 노출되면 패럴럭스 구현
        //추가클래스 sec2Ani 
      const sec2Top = $('#section2').offset().top-$(window).height();

        //console.log( `$(window).height()`, $(window).height() );
        //console.log( `$('#section2').offset().top`, $('#section2').offset().top );
        //console.log( `sec2Top`, sec2Top );
        $(window).scroll(function(){
          if( $(window).scrollTop()===0 ){
            $('#section2').removeClass('sec2Ani');
            return;
          }

          if( $(window).scrollTop() > sec2Top ){
            $('#section2').addClass('sec2Ani');
            return; //스크롤 탑값 계속 진행하는걸 종료
          }          
        });
    }
    section3(){      
      //1. 섹션의 탑값
      //2. 스크롤 이벤트 추가클래스 sec3Ani

      const sec3Top = $('#section3').offset().top-$(window).height();

        $(window).scroll(function(){
          if( $(window).scrollTop()===0 ){
            $('#section3').removeClass('sec3Ani');
            return;
          }

          if( $(window).scrollTop() > sec3Top ){
            $('#section3').addClass('sec3Ani');
            return;
          }
        });

    }    
    section4(){
      let idx = 0; 
      //<반응형>
      let winW = $(window).width();
      let cols = 4;
      let imgW = winW/cols;
      let imgH = imgW*0.8125;

      let shows = $('#section4 .gallery-list.show').length;
      let rows = Math.ceil(shows/cols);

      //섹션4의 탑값 - 탑높이
      let sec4Top = $('#section4').offset().top-$(window).height();
      let scr = false; //토글 변수, true/false 한번씩

      //스크롤이벤트 = 패럴럭스
      //스크롤이 발생해야 구현한다
      $(window).scroll(function(){
        //스크롤 탑값이 맨 위(0)에 도달하면 클래스 초기화(삭제)
        if(  $(window).scrollTop() === 0 ){ 
          scr=false; //초기화
          $('#section4').removeClass('sec4Ani');
        }        
        //섹션4 스크롤탑값 이상이면 계속 진행
        if(  $(window).scrollTop() >= sec4Top ){ 
          if(scr===false){
            scr=true; //애니메이션 1회만 진행
            $('#section4').addClass('sec4Ani');// 섹션4 클래스 추가
            //console.log('섹션4 스크롤탑값 이상의 위치',  $(window).scrollTop());
          }
          return;
        }
      });

      $(window).resize(function(){
        mainGallery();
      });

      function mainGallery(){
        winW = $(window).width();
        
        if(winW>=1280){
          cols = 4;
        }
        else if(winW>=980){
          cols = 3;
        }
        else if(winW>=600){
          cols = 2;
        }
        else {
          cols = 1;
        }
        
        imgW = winW/cols;
        imgH = imgW*0.8125;


        $('#section4 .gallery-list').stop().animate({width:imgW, height:imgH});
        $('#section4 .gallery-list .img-wrap').css({width:imgW});

        $('#section4 .gallery-list').removeClass('zoom');
        $('#section4 .gallery-list').removeClass('show');

        switch(idx){ 
          case 0:
                if(cols===4){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*3,top:imgH*0}).addClass('show');
    
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*3,top:imgH*1}).addClass('show');        
                }
                else if(cols===3){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');                
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*2,top:imgH*1}).addClass('show');

                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}).addClass('show');        
                }
                else if(cols===2){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');
    
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*2}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*3}).addClass('show');        
                }
                else {
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*3}).addClass('show');  
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*4}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*5}).addClass('show');
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*6}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*7}).addClass('show');        
                }
                break;            
          case 1:          
                $('#section4 .gallery-list').eq(0).hide();
                $('#section4 .gallery-list').eq(4).hide();
                $('#section4 .gallery-list').eq(6).hide();
                
                if(cols===4){
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}).addClass('show');

                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                }
                else if(cols===3){
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');

                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');     
                }
                else if(cols===2){
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');

                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');  
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');

                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');        
                }
                else {
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}).addClass('show');
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}).addClass('show');    
                }       
                break; 
          case 2:
                $('#section4 .gallery-list').eq(3).hide();
                $('#section4 .gallery-list').eq(7).hide();

                if(cols===4){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*3,top:imgH*0}).addClass('show');

                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');                    
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');
                }
                else if(cols===3){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');                    
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}).addClass('show');
                }
                else if(cols===2){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');                    
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*2}).addClass('show');    
                }
                else {
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*3}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*4}).addClass('show');                    
                  $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*5}).addClass('show');
                }       
                break; 
          case 3:
                $('#section4 .gallery-list').eq(1).hide();
                $('#section4 .gallery-list').eq(3).hide();
                $('#section4 .gallery-list').eq(6).hide();
                $('#section4 .gallery-list').eq(7).hide();
                                
                if(cols===4){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}).addClass('show');
                }
                else if(cols===3){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                }
                else if(cols===2){
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                  
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}).addClass('show');  
                }
                else {
                  $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                  $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
                  $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}).addClass('show');
                }                       
                break; 
          case 4:
                $('#section4 .gallery-list').eq(0).hide();
                $('#section4 .gallery-list').eq(1).hide();
                $('#section4 .gallery-list').eq(2).hide();
                $('#section4 .gallery-list').eq(4).hide();
                $('#section4 .gallery-list').eq(5).hide();
                $('#section4 .gallery-list').eq(6).hide();

                if(cols===4){
                $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show'); 
                }
                else if(cols===3){
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show'); 
                }
                else if(cols===2){
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show'); 
                }
                else {
                  $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                  $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show'); 
                }                 
                break; 
          case 5:
              $('#section4 .gallery-list').eq(0).hide();
              $('#section4 .gallery-list').eq(3).hide();
              $('#section4 .gallery-list').eq(4).hide();
              $('#section4 .gallery-list').eq(5).hide();
              $('#section4 .gallery-list').eq(7).hide();

              if(cols===4){
                $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
              }
              else if(cols===3){
                $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*0}).addClass('show');
              }
              else if(cols===2){
                $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}).addClass('show');
                
                $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
              }
              else {
                $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}).addClass('show');                    
                $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}).addClass('show');
                $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}).addClass('show');
              }          
              break; 
        }

        $('#section4 .gallery-list').addClass('zoom');
                      
        shows = $('#section4 .gallery-list.show').length;
        rows = Math.ceil(shows/cols);
        $('#section4 .gallery-wrap').stop().animate({height: imgH*rows }, 300);
      }

      $('#section4 .gallery-btn').each(function(index){
        $(this).on({
          click: function(e){
            e.preventDefault();
            idx = index; //클릭한 인덱스 매개변수 값을 전역변수
            mainGallery(idx);
            $('#section4 .gallery-btn').removeClass('on');
            $(this).addClass('on');
            $('#section4').removeClass('sec4Ani');
          }
        });
      });

    }    
    section5(){
      const svgObj = $('#section5 .ring-front circle');
      let svgArr = []; //원형 svg 배열
      let perSize = []; //1마디 4개
      let piece = []; //1마디 4개
      let per = [.9, .75, .9, .62];
      let second = 3;
      let sum = [0,0,0,0];
      let setId = [0,0,0,0]; //자동으로 알아서 표시되지만 정확한 표시를 위해 0작성
      let sec5Top = $('#section5').offset().top-$(window).height();
      let t = false; // 토글 toggle 한번은 false, 한번은 true

      //스크롤이벤트 = 패럴럭스
      $(window).scroll(function(){
        if(  $(window).scrollTop() === 0 ){           
          $('#section5').removeClass('sec5Ani');
          t=false;
        }        
        if(  $(window).scrollTop() >= sec5Top ){ 
          if(t===false){    
            t=true;        
            $('#section5').addClass('sec5Ani');
            //SVG 애니메이션 실행
            //함수 호출 실행
            svgAnimation();
          }
        }
      });

      //SVG 애니메이션
      // 1. SVG 원형 총(Total) 길이(Length)를 구한다(=가져오기 Get)  겟 토탈 렌스
      //getTotalLength(); svg 원형 객체의 총 길이를 픽셀 단위로 구한다
      //원형박스 선택자의 자식요소 circle 그래픽 디자인 요소
      function svgAnimation(){
        sum = [0,0,0,0]; //누적값 초기화 : 이거 안하면 무한반복 불가능
  
        $.each(svgObj, function(idx, obj){ //원형 4개를 반복처리
          
          //1. 총 길이
          // console.log( idx, obj, obj.getTotalLength() ); // 0 원형요소
          svgArr[idx] = obj.getTotalLength(); // 4개가 배열에 저장
        
          //2. 각 요소의 전체길이 대입 : 초기 설정
          // obj.style.strokeDasharray = svgArr[idx]; //순수자바스크립트
          // obj.style.strokeDashoffset = svgArr[idx];
  
          $(obj).css({ strokeDasharray: svgArr[idx] }); //제이쿼리
          $(obj).css({ strokeDashoffset: svgArr[idx] });
  
          //3. 각 요소의 퍼센트의 길이를 구한다
          perSize[idx] = svgArr[idx] * per[idx];
          // perSize[0] = svgArr[0] * per[0];
          // perSize[1] = svgArr[1] * per[1];
          // perSize[2] = svgArr[2] * per[2];
          // perSize[3] = svgArr[3] * per[3];
  
          //4. 각 요소의 토막(마디)의 길이를 구한다
          piece[idx] = (perSize[idx]/second)/100;
  
          //5. 마디를 카운트타이머 이용
          function sumfn(){
            sum[idx] += piece[idx];
            if(sum[idx] > perSize[idx]){
              clearInterval( setId[idx] );
            }
            else { //6. 애니메이션 구현
              $(obj).css({ strokeDashoffset: svgArr[idx]-sum[idx] }); // 퍼센트 길이만큼 빼주기 -> (1-0.9)
              $('#section5 .count-num').eq(idx).html( Math.ceil(sum[idx]/svgArr[idx]*100)+'%' ); // html(), text() 둘 다 사용가능 , 퍼센트 구하기 : 현재 누적값 / 전체길이
            }
          }
  
          //7. 타이머 설정
          setId[idx] = setInterval(sumfn, 10);
  
        });
      }

    }
    section6(){
      //패럴럭스
      let sec6Top = $('#section6').offset().top-$(window).height();
      let t = false;
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          t=false;
          $('#section6').removeClass('sec6Ani');
        }
        if($(window).scrollTop()>sec6Top){
          if(t===false){
            t=true;
            $('#section6').addClass('sec6Ani');
          }
        }
      });
    }
    section7(){
      let winH = $(window).height();  
      let sec7Top = $('#section7').offset().top-winH;  
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section7').removeClass('sec7Ani');
        }        
        if($(window).scrollTop()>=sec7Top){
          $('#section7').addClass('sec7Ani');
        }        
      });  
    }
    section8(){
      let winH = $(window).height();  
      let sec8Top = $('#section8').offset().top-winH;  
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section8').removeClass('sec8Ani');
        }        
        if($(window).scrollTop()>=sec8Top){
          $('#section8').addClass('sec8Ani');
        }        
      });   
    }
    section9(){
      let winH = $(window).height();  
      let sec9Top = $('#section9').offset().top-winH;  
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section9').removeClass('sec9Ani');
        }        
        if($(window).scrollTop()>=sec9Top){
          $('#section9').addClass('sec9Ani');
        }        
      });   
    }
    section10(){
      let winH = $(window).height();  
      let sec10Top = $('#section10').offset().top-winH;  
      $(window).scroll(function(){
        if($(window).scrollTop()===0){
          $('#section10').removeClass('sec10Ani');
        }        
        if($(window).scrollTop()>=sec10Top){
          $('#section10').addClass('sec10Ani');
        }        
      });  
    }
    footer(){
      
    }

    //퀵메뉴
    quick(){
      let quickTop = ($(window).height() - $('#quickBox').height())/2-300;
        //console.log( quickTop )

      $(window).scroll(function(){
        $('#quickBox').stop().animate({ top : quickTop+$(window).scrollTop() }, 500, 'easeOutQuint'); 
      });
    }    
    //goTop 메뉴
    goTop(){
      $(window).scroll(function(){
        if( $(window).scrollTop() > 100 ){
          $('#goTopBox').stop().fadeIn(1000);
        }
        else {
          $('#goTopBox').stop().fadeOut(1000);
        }
      });

      //스무스 스크롤링
      $('.gotop-btn').on({
        click: function(){
          $('html, body').stop().animate({ scrollTop : 0 }, 500);
        }
      });
    }

  }
  const newPofo = new Pofo();
  newPofo.init();

})(jQuery);