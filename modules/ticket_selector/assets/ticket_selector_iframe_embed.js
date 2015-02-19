/**
 * js for ticket selector when embedded in iframe.
 */
jQuery(document).ready(function($) {

	//when submit is clicked, verify that at least one ticket option has been selected before continuing.
	$(document).on('click', '.ticket-selector-submit-btn', function(e) {
		e.stopPropagation();

		//grab all values for selects
		var has_selection = 0;
		$('.ticket-selector-tbl-qty-slct').each( function(ind) {
			if ( $(this).val() > 0 ) {
				has_selection++;
			}
			//hang on there may be radios!
			if ( $(this).attr('type') == 'radio' && $(this).prop('checked' ) ) {
				has_selection++;
			}
		});

		if ( has_selection > 0 ) {
			return true;
		} else {
			e.preventDefault();
			alert( EEDTicketSelectorMsg.zeroSelected );
			return false;
		}
	});

});
