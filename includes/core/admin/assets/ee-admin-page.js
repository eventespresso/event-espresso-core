jQuery(document).ready(function($) {
	$(window).scroll(function() {
		var scrollTop = $(this).scrollTop();
		var offset = $('#event_editor_major_buttons_wrapper').offset();
		if(offset !== null) {
			if ( (scrollTop+25) > offset.top ) {
				$('#event-editor-floating-save-btns').removeClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').addClass('hidden');
			} else {
				$('#event-editor-floating-save-btns').addClass('hidden');
				$('#event_editor_major_buttons_wrapper .button-primary').removeClass('hidden');
			}
		}
	});
});