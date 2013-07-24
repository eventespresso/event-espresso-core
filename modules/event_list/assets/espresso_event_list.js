jQuery(document).ready(function($) {

	//window resize
	var currentWidth = 0;
	
	function espresso_resize_event_list() {
		var winWidth = $('#espresso-events-list-wrap-dv').width();
		var conWidth;
		if(winWidth < 540) {
			conWidth = 270;
			col = 1
		} else if(winWidth < 810) {
			conWidth = 540;
			col = 2;
		} else if(winWidth < 1080) {
			conWidth = 810;
			col = 3;
		} else {
			conWidth = 1080;
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