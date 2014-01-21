jQuery(document).ready(function($) {
	$('.ee-create-button', '.event-tickets-container').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var newRow = parseInt($('#ticket-total-rows').val(), 10) + 1;

		//update totalticketrows
		$('#ticket-total-rows').val(newRow);

		//clone our skeleton and setup
		var newTicket = $('tbody', '#new-ticket-row-form').clone().html().replace(/TICKETNAMEATTR/g,'edit_tickets').replace(/TICKETNUM/g, newRow);

		//append to existing ticketRows
		newTicket = $(newTicket).appendTo('#all-ticket-rows');

		//show trash icon
		$('.trash-icon', newTicket ).show();

		//focus on first input
		newTicket.find('input:visible').first().focus();
	});

	$('#event-and-ticket-form-content').on('focusin', '.ee-datepicker', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var data = $(this).data();
		var start = data.context == 'start-dtt' || data.context == 'start-ticket' ? $(this, data.dateFieldContext ) : $(data.relatedField, data.dateFieldContext);
		var end = data.context == 'end-dtt' || data.context == 'end-ticket' ? $(this, data.dateFieldContext) : $(data.relatedField, data.dateFieldContext);
		var next = $(data.nextField, data.dateFieldContext);
		var doingstart = data.context == 'start-dtt' || data.context == 'start-ticket' ? true : false;
		dttPickerHelper.picker(start, end, next, doingstart);
	});


	$('.event-tickets-container').on('focusout', '.ee-datepicker', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var status = '';

		//we need to determine what status to show.
		var now = moment();
		var tktStart = moment($(this).parent().parent().find('.edit-ticket-TKT_start_date').val(), 'YYYY-MM-DD h:mm a');
		var tktEnd = moment($(this).parent().parent().find('.edit-ticket-TKT_end_date').val(), 'YYYY-MM-DD h:mm a');

		//now we have moment objects to do some calcs and determine what status we're setting.
		if ( now.isBefore(tktStart) ) {
			status = 'tkt-status-TKP';
		} else if ( now.isAfter(tktEnd) ) {
			status = 'tkt-status-TKE';
		} else if ( now.isAfter(tktStart) && now.isBefore(tktEnd) ) {
			status = 'tkt-status-TKO';
		} else {
			status = 'tkt-status-TKA';
		}

		//now we have status so let's set the pip
		$(this).parent().parent().find('.ee-tkt-status').removeClass().addClass('ee-tkt-status ' + status);

	});


	$('.add-new-ticket-table').on('click', '.trash-icon', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var this_row = $(this).parent().parent();
		this_row.remove();
	});
});