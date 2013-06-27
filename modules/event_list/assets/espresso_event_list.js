jQuery(document).ready(function($) {
	
	//blocksit define
	$(window).load( function() {
		$('#espresso-events-list-dv').BlocksIt({
			blockElement: 'article',
			numOfCol: 3,
			offsetX: 10,
			offsetY: 10
		});
	});
	
	//window resize
	var currentWidth = 1100;
	$(window).resize(function() {
		var winWidth = $(window).width();
		var conWidth;
		if(winWidth < 660) {
			conWidth = 320;
			col = 1
		} else if(winWidth < 980) {
			conWidth = 640;
			col = 2;
		} else if(winWidth < 1300) {
			conWidth = 960;
			col = 3;
		} else {
			conWidth = 1280;
			col = 4;
		}
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#espresso-events-list-dv').width(conWidth);
			$('#espresso-events-list-dv').BlocksIt({
				blockElement: 'article',
				numOfCol: col,
				offsetX: 10,
				offsetY: 10
			});
		}
	});


});