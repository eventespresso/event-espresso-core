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

	/*
	Tabs for Messages box on Event Editor Page
	 */
	$('.nav-tab-wrapper', '.ee-nav-tabs').on('click', '.nav-tab', function(e) {
		e.preventDefault();
		var content_id = $(this).attr('rel');
		//first set all content as hidden and other nav tabs as not active
		$('.ee-nav-tabs .nav-tab-content').hide();
		$('.ee-nav-tabs .nav-tab').removeClass('nav-tab-active');

		//set new active tab
		$(this).addClass('nav-tab-active');
		$('#'+content_id).show();
	});
});
