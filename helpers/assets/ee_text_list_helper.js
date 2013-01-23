jQuery(document).ready(function($) {
	$('li', '.ee-text-links').each( function() {
		if ( $(this).hasClass('ee-text-link-sep') ) return;
		if ( ! ( $(this).hasClass('item_display') ) ) {
			var metabox = $('a', this).attr('href').replace('#', '');
			$('#'+metabox).hide();
		}
	});

	$('.ee-text-links').on('click', 'li', function(e) {
		e.preventDefault();

		//first set all content as hidden and other text links as not active
		$('li', '.ee-text-links').each( function() {
			if ( $(this).hasClass('ee-text-link-sep') ) return;
			$(this).removeClass('item_display');
			var metabox = $('a', this).attr('href').replace('#', '');
			$('#'+metabox).hide();
		});

		$(this).addClass('item_display');
		//show new box
		var this_metabox = $('a', this).attr('href').replace('#', '');
		$('#'+this_metabox).show();
	});
});