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

		//focus on first input
		newTicket.find('input:visible').first().focus();
	});

	$('#event-and-ticket-form-content').on('focus', '.ee-datepicker', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var data = $(this).data();
		var start = data.context == 'start-dtt' || data.context == 'start-ticket' ? $(this, data.dateFieldContext ) : $(data.relatedField, data.dateFieldContext);
		var end = data.context == 'end-dtt' || data.context == 'end-ticket' ? $(this, data.dateFieldContext) : $(data.relatedField, data.dateFieldContext);
		var next = $(data.nextField, data.dateFieldContext);
		var doingstart = data.context == 'start-dtt' || data.context == 'start-ticket' ? true : false;
		dttPickerHelper.picker(start, end, next, doingstart);
	});
});