jQuery(document).ready(function($) {
	
//	var date_tester = document.createElement( 'input' );
//	date_tester.setAttribute( 'type', 'date' );
//	// if type is text then and only then should you call the fallback
//	if( date_tester.type === 'text' ){
//		$( '#date' ).datepicker({
//			dateFormat: 'dd-mm-yy'
//		});
//	}

	//window resize
	var currentWidth = 0;
	
	function espresso_resize_event_list() {
		var winWidth = $('#espresso-events-list-wrap-dv').width();
		var conWidth;
		if(winWidth < 544) {
			conWidth = 272;
			col = 1
		} else if(winWidth < 816) {
			conWidth = 544;
			col = 2;
		} else if(winWidth < 1088) {
			conWidth = 816;
			col = 3;
		} else {
			conWidth = 1088;
			col = 4;
		}
		//alert( 'conWidth = ' + conWidth + '\n' + 'currentWidth = ' + currentWidth );
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#espresso-events-list-dv').width(conWidth).fadeIn();
			$('#espresso-events-list-dv').BlocksIt({
				blockElement: '.espresso-event-list-event',
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
	
	$('.submit-this').on( 'click', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('form').submit();		
	});	
	


});