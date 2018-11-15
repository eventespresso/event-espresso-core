jQuery(document).ready(function ($) {
    // collection of ALL datetime selectors for ALL Events on the page
    var $datetime_options = $('.datetime-selector-option'),
        $ticket_selector_submit_btn = $('.ticket-selector-submit-btn');
	// reset by unchecking everything
	$.each( $datetime_options, function() {
		$( this ).prop( 'checked', false );
	} );
    // add error notices to the DOM
    $ticket_selector_submit_btn.before(
        '<span class="ticket-selector-disabled-submit-btn-msg important-notice">'+ eei18n.please_select_date_filter_notice+'</span>'
    );
    // update ticket selector if datetime is chosen
    $('.checkbox-dropdown-selector').on(
        'click',
        '.datetime-selector-option',
        function () {
            var $datetime_selector_option = $(this);
            var event_id = $datetime_selector_option.data('tkt_slctr_evt');
            var $submit_button = $('#ticket-selector-submit-' + event_id + '-btn');
            // track how many ticket selector rows are active ? ie: being displayed
            var active_rows = 0;
            var datetimes = [];
            var $ticket_selector = $('#tkt-slctr-tbl-' + event_id);
            if (object_exists($ticket_selector, '$ticket_selector')) {
                // first let's put together an array of ALL checked datetime options for this event
                $datetime_options = $datetime_selector_option.parents('ul').find('.datetime-selector-option');
                if (object_exists($datetime_options, '$datetime_options')) {
                    // add each datetime options to our array of datetimes
                    $.each($datetime_options, function (index) {
                        // if checked, then display row and increment active_rows count
                        if ($(this).prop('checked')) {
                            datetimes.push('ee-ticket-datetimes-' + $(this).val());
                        }
                    });
                }
                // find all ticket rows for this event
                var $ticket_selector_rows = $ticket_selector.find('.tckt-slctr-tbl-tr');
                $.each($ticket_selector_rows, function () {
                    var $ticket_selector_row = $(this);
                    // get all of the specific datetime related classes assigned to this ticket row
                    var ticket_row_datetime_classes = $ticket_selector_row.attr('class').split(' ').filter(
                        function(element) {
                            return element.indexOf('ee-ticket-datetimes-') !== -1;
                        }
                    );
                    // because a ticket can have multiple datetimes,
                    // we need to compare ALL of the ticket's datetimes to see if it will be displayed
                    var display = false;
                    $.each(ticket_row_datetime_classes, function (index, element) {
                        if ($.inArray(element, datetimes) !== -1) {
                            display = true;
                        }
                    });
                    if (display) {
                        $ticket_selector_row.removeClass('ee-hidden-ticket-tr');
                        active_rows++;
                    } else {
						$ticket_selector_row.addClass( 'ee-hidden-ticket-tr' );
						var $qty_input = $ticket_selector_row.find(
							'.ticket-selector-tbl-qty-slct'
						);
						// set qty to zero for non-radio inputs
						if ( $qty_input.attr( 'type' ) !== 'radio' ) {
							$qty_input.val( 0 );
						}
                    }
                });
            }
            // enable or disable submit button based on active_rows count
            if (object_exists($submit_button, '$submit_button')) {
                if (active_rows > 0) {
                    $submit_button.removeClass('ee-disabled-btn');
                } else {
                    $submit_button.addClass('ee-disabled-btn');
                }
            }

            $('.ticket-selector-disabled-submit-btn-msg').stop().hide();
        }
    );

    $ticket_selector_submit_btn.on('click', function (e) {
		if( $( this ).hasClass( 'ee-disabled-btn' ) ) {
			e.preventDefault();
			e.stopPropagation();
			$(this).prev('.ticket-selector-disabled-submit-btn-msg').stop().fadeIn(100).delay(6000).fadeOut();
		}
	});

	var maxChecked = typeof eeDTS !== 'undefined' && eeDTS.maxChecked ?
		eeDTS.maxChecked :
		10;
	var counter = 0;
	var prevCounter = 0;
	var dtsEvent = 0;
	var thisEvent = 0;
	var prevEvent = 0;
	var noticeID = '';
	var $notice;
	$.each( $datetime_options, function() {
		// need to track previous state
		prevEvent = thisEvent;
		prevCounter = counter;
		thisEvent = $( this ).data( 'tkt_slctr_evt' );
		// reset counter when input changes, which is tracked by Event ID
		counter = thisEvent !== dtsEvent ? 1 : counter + 1;
		// new DTS for next Event?
		if ( thisEvent !== dtsEvent ) {
			// if the previous Event counter was less than the max checked
			if ( prevCounter > 1 && prevCounter <= maxChecked ) {
				// then hide the notice re: extra dates cuz there are none
				noticeID = '#datetime-selector-' + prevEvent;
				noticeID += '-date-time-filter-notice-pg';
				$notice = $( noticeID );
				if ( $notice.length ) {
					$notice.hide();
				}
			}
			dtsEvent = thisEvent;
		}
		if ( maxChecked > 0 && counter > maxChecked ) {
			return;
		}
		$( this ).click();
	} );

});
