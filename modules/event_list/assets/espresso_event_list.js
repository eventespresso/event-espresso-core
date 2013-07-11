jQuery(document).ready(function($) {

	//window resize
	var currentWidth = 0;
	
	function espresso_resize_event_list() {
		var winWidth = $('#espresso-events-list-wrap-dv').width();
		var conWidth;
//		if(winWidth < 640) {
//			conWidth = 320;
//			col = 1
//		} else if(winWidth < 960) {
//			conWidth = 640;
//			col = 2;
//		} else if(winWidth < 1280) {
//			conWidth = 960;
//			col = 3;
//		} else {
//			conWidth = 1280;
//			col = 4;
//		}
		if(winWidth < 560) {
			conWidth = 280;
			col = 1
		} else if(winWidth < 840) {
			conWidth = 560;
			col = 2;
		} else if(winWidth < 1120) {
			conWidth = 840;
			col = 3;
		} else {
			conWidth = 1120;
			col = 4;
		}
		//alert( 'conWidth = ' + conWidth + '\n' + 'currentWidth = ' + currentWidth );
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#espresso-events-list-dv').width(conWidth).fadeIn();
			$('#espresso-events-list-dv').BlocksIt({
				blockElement: 'article',
				numOfCol: col,
				offsetX: 10,
				offsetY: 10
			}); 
		}
		
	};
	
	$(window).resize(function() {
		espresso_resize_event_list();
	});

	espresso_resize_event_list();

});