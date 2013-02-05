jQuery(document).ready(function($) {
	$('#edit_event_events_Messages_Hooks_metabox').on('click', 'a', function(e) {
		e.preventDefault();
		console.log(ajaxurl);
		$.post( ajaxurl, {
			action: 'switch_template',
			some_data : 'this is some data',
			page: 'events'
		},
		function( response ) {
			console.log(response);
		});

	});
});