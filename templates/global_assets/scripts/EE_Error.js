jQuery(document).ready(function($) {

	var message = $('#ee-error-message');
	var target;

	if ( message.length ) {
		$('#ee-error-message').remove();
		if ( $('#espresso-notices').size() ) {
			target = $('#espresso-notices');
		} else if ( $('#screen-meta-links').size() ) {
			target = $('#screen-meta-links');
		} else if ( $('#wpbody-content').size() ) {
			target = $('#wpbody-content');
		} else {
			target = $('body');
		}

		$( target ).html( message ).css({ 'position' : 'relative', 'top' : 0, 'left' : 0 , 'margin' : '3em 1em 0 0' , 'z-index' : 5 });
		//set from wp_localize_script in php
		if( ee_settings.wp_debug !='1' ) {
			$( '.ee-error-trace-dv').hide();
		}

		$('body').on( 'click', '.display-ee-error-trace-lnk', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var traceTable = '#' + $(this).attr('rel') +'-dv';
			$( traceTable ).slideToggle();
		});

	}

});
