jQuery(document).ready(function ($) {
    // collection of datetime selectors
    var $datetime_selectors = $('.ticket-selector-datetime-selector-slct');
    // reset all to default option
    $.each( $datetime_selectors, function () {
        $(this).val(0);
		var event_id = $( this ).data( 'tkt_slctr_evt' );
		var submit_button_id = '#ticket-selector-submit-' + event_id + '-btn';
		$(submit_button_id).addClass( 'ee-disabled-btn' );
	});
    // update ticket selector if datetime is chosen
    $datetime_selectors.on('change', function () {
        var event_id = $(this).data('tkt_slctr_evt');
        var ticket_selector_id = '#tkt-slctr-tbl-' + event_id;
        var submit_button_id = '#ticket-selector-submit-' + event_id + '-btn';
        var $ticket_selector = $(ticket_selector_id);
        if ( $ticket_selector.length ) {
            var selected_datetime = $(this).val();
            $ticket_selector.find('.tckt-slctr-tbl-tr').addClass('ee-hidden-ticket-tr');
            $ticket_selector.find('.ee-ticket-datetimes-' + selected_datetime).removeClass('ee-hidden-ticket-tr');
			$(submit_button_id).removeClass( 'ee-disabled-btn' );
			$('.ticket-selector-disabled-submit-btn-msg').stop().hide();
		}
    });

	$('.ticket-selector-submit-btn').on('click', function (e) {
		if( $( this ).hasClass( 'ee-disabled-btn' ) ) {
			e.preventDefault();
			e.stopPropagation();
			$(this).prev('.ticket-selector-disabled-submit-btn-msg').stop().fadeIn(100).delay(6000).fadeOut();
		}
	});

});