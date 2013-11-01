jQuery(document).ready(function($) {
	
	//window resize
	var currentWidth = 0;
	
	var eventSize = 'tiny';

	if ( eventWidth <= 120 ) {
		eventSize = 'tiny-event-list-img';
	} else if ( eventWidth <= 148 ) {
		eventSize = 'small-event-list-img';
	} else if ( eventWidth <= 190 ) {
		eventSize = 'med-event-list-img';
	} else if ( eventWidth <= 260 ) {
		eventSize = 'large-event-list-img';
	} else {
		eventSize = 'huge-event-list-img';
	} 
	var eventWidth = $('#grid-view-event-list-dv .espresso-event-list-event').first().outerWidth();
	$('#grid-view-event-list-dv .espresso-event-list-event').each( function() {
		$(this).find('.ee-event-img-dv').css({ 'width' : eventWidth, 'min-height' : eventWidth*.618 });
	});	
	eventWidth = eventWidth + 20;
	
	function espresso_resize_event_list() {
		var winWidth = $('#grid-view-event-list-dv').width();
		var conWidth;
		if(winWidth < (eventWidth*2)) {
			conWidth = eventWidth;
			col = 1;
		} else if(winWidth < (eventWidth*3)) {
			conWidth = eventWidth*2;
			col = 2;
		} else if(winWidth < (eventWidth*4)) {
			conWidth = eventWidth*3;
			col = 3;
		} else if(winWidth < (eventWidth*5)) {
			conWidth = eventWidth*4;
			col = 4;
		} else if(winWidth < (eventWidth*6)) {
			conWidth = eventWidth*5;
			col = 5;
		} else {
			conWidth = eventWidth*6;
			col = 6;
		}
		//alert( 'conWidth = ' + conWidth + '\n' + 'currentWidth = ' + currentWidth );
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#grid-view-event-list-dv #espresso-events-list-dv').width(conWidth).fadeIn();

			$('#grid-view-event-list-dv #espresso-events-list-dv').masonry({
				columnWidth: eventWidth,
				itemSelector: '.espresso-event-list-event',
				gutter: 10,
				isFitWidth: true
			});			

		}
		
	};

	$(window).resize(function() {
		espresso_resize_event_list();
	});

	espresso_resize_event_list();
	
	$('#espresso-events-list-filters-dv').on( 'click', '.submit-this', function(e){
		e.preventDefault();
		e.stopPropagation();
		$('#elf_default_view').val( $(this).attr('rel') );
		$(this).closest('form').submit();		
	});	
	


});