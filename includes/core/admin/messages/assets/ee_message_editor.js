jQuery(document).ready(function($) {
	$('#mtp_extra_actions').on('click', '.reset-default-button', function(e) {
		var reset = confirm(eei18n.confirm_default_reset);
		if ( reset ) return true;
		e.preventDefault();
	});
});