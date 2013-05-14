jQuery(document).ready(function($) {
	
	var message = $('#message');
	var target;
	
	if ( message.length ) {
		$('#message').remove();
		if ( $('#content').size() ) {
			target = $('#content');
		} else if ( $('#screen-meta-links').size() ) {
			target = $('#screen-meta-links');
		} else if ( $('#wpbody-content').size() ) {
			target = $('#wpbody-content');
		}		
		
		$( target ).after( message );
		$( '.ee-error-trace-dv').hide();
			
		$('body').on( 'click', '.display-ee-error-trace-lnk', function(e) {
			e.preventDefault();
			var traceTable = '#' + $(this).attr('rel');
			$( traceTable ).slideToggle();
		});
	}
});