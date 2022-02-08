jQuery(document).ready(function($) {
	
	$('#postbox-container-2 .postbox').hide();
	var current_metabox = $('.item_display').attr('href');
	$(current_metabox).show();

	$('.ee-text-links').on('click', '.ee-text-link', function(e) {
		e.preventDefault();

		//first set all content as hidden and other text links as not active
		$('.ee-text-link').each( function() {
			$(this).removeClass('item_display');
			var metabox = $(this).attr('href');
			$(metabox).hide();
		});

		$(this).addClass('item_display');
		//show new box
		var this_metabox = $(this).attr('href');
		$(this_metabox).fadeIn();
	});
});