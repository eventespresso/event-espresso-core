jQuery(document).ready(function($) {
	
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
		} else {
			target = $('body');			
		}
		
		$( target ).append( message );
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
