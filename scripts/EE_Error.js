jQuery(document).ready(function($) {

	function wheres_the_top() {
		// how far down the page the user has scrolled
		var st = $('html').scrollTop();
		// window height divided by 4
		var top_adjust = parseInt( $(window).height() ) / 4;
		// where message boxes will appear
		return ( st + top_adjust ) + 'px';
	}
	
	$('#espresso-notices').css({ 'top' : wheres_the_top() });
	$('.espresso-notices').slideDown();
	$('.espresso-notices.fade-away').delay(10000).slideUp();

	//close btn for notifications
	$('#espresso-notices').on( 'click', '.close-espresso-notice', function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().hide();
	});		


	var message = $('#ee-error-message');
	var target;
	
	if ( message.length ) {
		$('#ee-error-message').remove();
		if ( $('#content').size() ) {
			target = $('#content');
		} else if ( $('#screen-meta-links').size() ) {
			target = $('#screen-meta-links');
		} else if ( $('#wpbody-content').size() ) {
			target = $('#wpbody-content');
		}		
		
		$( target ).after( message );
		if(ee_settings.wp_debug !='1')//set from wp_localize_script in php
			$( '.ee-error-trace-dv').hide();
			
		$('body').on( 'click', '.display-ee-error-trace-lnk', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var traceTable = '#' + $(this).attr('rel');
			$( traceTable ).slideToggle();
		});
	}

	
});
