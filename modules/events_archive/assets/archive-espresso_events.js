jQuery(document).ready(function($) {
	
	$('#espresso-events-list-filters-dv').on( 'click', '.submit-this', function(e){
		e.preventDefault();
		e.stopPropagation();
		$('#elf_type').val( $(this).attr('rel') );
		$(this).closest('form').submit();		
	});


	if ( espresso_grid_event_lists !== undefined ) {
		//window resize
		var currentWidth = 0;	
		var eventWidth = $('.grid-event-list-dv').first().find('.espresso-event-list-event').first().outerWidth();
	//	console.log( JSON.stringify( 'eventWidth: ' + eventWidth, null, 4 ));
		
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
	//	console.log( JSON.stringify( 'eventSize: ' + eventSize, null, 4 ));

		
		$('.grid-event-list-dv .espresso-event-list-event').each( function() {
			$(this).find('.ee-event-img-dv').css({ 'width' : eventWidth, 'min-height' : eventWidth*.618 });
		});	
		eventWidth = eventWidth + 20;
		
		var winWidth = $('.grid-event-list-dv').width();
	//	console.log( JSON.stringify( 'winWidth: ' + winWidth, null, 4 ));
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
	//	console.log( JSON.stringify( 'conWidth: ' + conWidth, null, 4 ));
	//	console.log( JSON.stringify( 'results:' + 'winWidth = ' + winWidth + 'conWidth = ' + conWidth + 'eventWidth = ' + eventWidth, null, 4 ));
		

		$('.grid-event-list-dv .espresso-events-list-dv').each( function() {
			$(this).width(conWidth).fadeIn();
		});
		
		$( espresso_grid_event_lists ).each( function( index, grid_ID ) {
			var $container = $('#espresso-events-list-' + grid_ID + '-dv');		   
			$container.imagesLoaded( function(){
				$container.masonry({
					columnWidth: eventWidth,
					itemSelector: '#espresso-events-list-' + grid_ID + '-dv .espresso-event-list-event',
					gutter: 10,
					isFitWidth: true
				});
			});		
		});				
	}
	


	


});