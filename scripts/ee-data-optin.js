jQuery(document).ready(function($) {
	$('#espresso-data-collect-optin-container').on('click', '.data-optin-button', function() {
		var selection = $(this).val();
		var nonce = $('#data-optin-nonce').text();
		
		$.post(ajaxurl, {
			action: 'espresso_data_optin',
			nonce: nonce,
			selection: selection
		}, function(response) {
			return;
		});

		$('#espresso-data-collect-optin-container').slideUp();
	});
});
