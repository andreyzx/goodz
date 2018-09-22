$(function(){
 	var $body, $window, $siebar, $footer, adminbarOffset, top = false,
 	    bottom = false, windowWidth, windowHeight, lastWindowPos = 0,
 	    topOffset = 0, bodyHeight, sidebarHeight, resizeTimer,
 	    secondary, button;

 	function scroll() {
        windowWidth = $window.width();
        // if there's no sidebar return
        if ( ! $sidebar.length ) return;

        // disable on responsive
        if ( 1024 >= windowWidth ) {
            top = bottom = false;
            $sidebar.removeAttr( 'style' );
            return;
        }

        sidebarHeight   = $sidebar.height();
        windowHeight    = $window.height();
        bodyHeight      = $body.height();
        mainHeight      = $main.height();
        windowPos       = $window.scrollTop();
		// console.log(mainHeight);
		// console.log(sidebarHeight);
		
		
		// если сайтбар больше контента слева, то выход
        if ( mainHeight < sidebarHeight + 30) {
            // $sidebar.attr( 'style', 'position: static;' );
            return false;
        } 

		// сайтбар больше окна просмотра
 		if ( sidebarHeight >= windowHeight ) {
			
			// скролтоп больше последней позиции
 			if ( windowPos > lastWindowPos ) {
 				if ( top ) {
 					top = false;
 					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top  : 0;
 					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
 				} else if ( ! bottom && windowPos + windowHeight > sidebarHeight ) {
 					bottom = true;
 					$sidebar.attr( 'style', 'position: fixed;  bottom: 0; top: auto; left: auto;' );
 				}
 			} else if ( windowPos < lastWindowPos ) {
 				if ( bottom ) {
 					bottom = false;
 					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top : 0;
 					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
 				} else if ( ! top && windowPos  < $sidebar.offset().top ) {
 					top = true;
 					$sidebar.attr( 'style', 'position: fixed;  top: 0; left: auto; bottom: auto; ' );
 				}
 			} else {
 				top = bottom = false;
 				topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top  : 0;
 				$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
 			}
 		} else {
     			$sidebar.attr( 'style', 'position: fixed; top: 0; left: auto; bottom: auto;' );
				
        }


 		lastWindowPos = windowPos;
 	}




 		$body          = $( document.body );
 		$main          = $( '#content' );
 		$window        = $( window );
 		$sidebar       = $( '#sidebar' );
        $footer        = $( '#colophon' );

		
 		$window
 			.on( 'scroll resize', scroll );
 		// $sidebar.on( 'click keydown', 'button', scroll );
 		// $sidebar.on( 'click keydown', 'button', debuggy );

 		scroll();

 		// for ( var i = 1; i < 6; i++ ) {
 			// setTimeout( scroll, 100 * i );
 		// }


 });



	// ф-ия для определения позиций постов
	function setPostPosition(){

		var percent = 50;
		var margin = 17;
		var minWidth = 650;
		var height0 = 0, height1 = 0;		
		
		var posts = $(".post");
		var mainPosts = $("#posts");
		
		if(mainPosts.width() < minWidth){
			posts.removeAttr("style");
			mainPosts.removeAttr("style");
			return;
		}
		
		posts.each(function( idx ){
			if(idx == 0 || height0 <= height1){
				$(this).attr( "style", "position:absolute; left:0; top:" + height0 + "px; width:48%;" );
				height0 += $(this).outerHeight() + margin;
			}
			else if(idx == 1 || height0 > height1){
				$(this).attr( "style", "position:absolute; left:" + percent + "%; top:" + height1 + "px; width:48%;" );
				height1 += $(this).outerHeight() + margin;
			}
		});
		mainPosts.css("min-height", Math.max(height0, height1));

	}	
	
	$( window ).on( 'resize', setPostPosition );
			
	setPostPosition();

// функция для футера
// function futerBottom(){
	// $('#sidebar footer')
// }

// функция для меню
function menuClick(){
	$('li.main-menu__ul-hover').on('click', function(e){
		$(this).children('ul.main-menu__ul').toggle(100);
		e.stopPropagation();
	});
}
menuClick();

